/**
 * Euphoria Live Classes - Secure DRM & Video Watermark Engine
 * Protects video lessons with dynamic moving student watermarks,
 * anti-screen capture measures, DevTools detection, and progress tracking.
 */

class EuphoriaSecurePlayer {
  constructor(options = {}) {
    this.container = options.container || document.getElementById('secure-video-container');
    this.video = options.video || document.getElementById('lms-video-player');
    this.student = options.student || {
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
      id: 'ELC-89214',
      ip: '103.211.54.12'
    };
    this.watermarkEl = null;
    this.watermarkInterval = null;
    this.isEnrolled = true;
    
    this.init();
  }

  init() {
    if (!this.container) return;

    // 1. Create and mount dynamic watermark
    this.createWatermark();

    // 2. Start dynamic floating movement
    this.startWatermarkMovement();

    // 3. Security guards (prevent right click, key shortcuts, inspect)
    this.bindSecurityGuards();

    // 4. Track video playback and progress
    this.bindPlaybackEvents();
  }

  createWatermark() {
    // Remove existing watermark if any
    const existing = this.container.querySelector('.secure-watermark');
    if (existing) existing.remove();

    this.watermarkEl = document.createElement('div');
    this.watermarkEl.className = 'secure-watermark secure-watermark-pulse';
    this.watermarkEl.id = 'dynamic-drm-watermark';
    
    // Stamp student information
    this.updateWatermarkText();
    
    this.container.appendChild(this.watermarkEl);
    this.repositionWatermark();
  }

  updateWatermarkText() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.watermarkEl.innerHTML = `
      <div class="flex items-center gap-1.5 opacity-90">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
        <span>${this.student.name}</span>
        <span class="opacity-60">•</span>
        <span>${this.student.phone}</span>
        <span class="opacity-60">•</span>
        <span class="text-[11px] font-mono opacity-80">${this.student.id}</span>
      </div>
    `;
  }

  repositionWatermark() {
    if (!this.watermarkEl || !this.container) return;
    
    const containerWidth = this.container.clientWidth;
    const containerHeight = this.container.clientHeight;
    const wmWidth = this.watermarkEl.offsetWidth || 240;
    const wmHeight = this.watermarkEl.offsetHeight || 30;

    // Calculate safe bounds (keeping within 10% to 80% to avoid edge clipping)
    const maxX = Math.max(10, containerWidth - wmWidth - 20);
    const maxY = Math.max(10, containerHeight - wmHeight - 50);

    // Random coordinates inside container
    const randomX = Math.floor(Math.random() * (maxX - 20)) + 15;
    const randomY = Math.floor(Math.random() * (maxY - 20)) + 15;

    this.watermarkEl.style.left = `${randomX}px`;
    this.watermarkEl.style.top = `${randomY}px`;
    
    // Periodically update time string
    this.updateWatermarkText();
  }

  startWatermarkMovement() {
    // Move every 5 seconds to unpredictable positions across the video
    if (this.watermarkInterval) clearInterval(this.watermarkInterval);
    this.watermarkInterval = setInterval(() => {
      this.repositionWatermark();
    }, 5000);
  }

  bindSecurityGuards() {
    // Prevent right-click context menu on video player & notes
    this.container.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.showSecurityToast('Protected Content: Right-click is disabled to protect proprietary recipes.');
      return false;
    });

    // Block common screenshot and inspection shortcut keys
    window.addEventListener('keydown', (e) => {
      // F12 or Ctrl+Shift+I or Ctrl+Shift+J or Ctrl+U (View Source)
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'C' || e.key === 'c' || e.key === 'J' || e.key === 'j')) ||
        (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S' || e.key === 'p' || e.key === 'P'))
      ) {
        e.preventDefault();
        e.stopPropagation();
        this.showSecurityToast('Content Protection Active: Keyboard shortcut blocked.');
        return false;
      }
      
      // PrintScreen key notification
      if (e.key === 'PrintScreen') {
        this.showSecurityToast('Notice: Screen captures of live course materials violate terms of use.');
      }
    });
  }

  bindPlaybackEvents() {
    if (!this.video) return;

    // Save progress on timeupdate
    this.video.addEventListener('timeupdate', () => {
      const activeLesson = document.querySelector('.lesson-item.active');
      if (activeLesson) {
        const lessonId = activeLesson.dataset.lessonId || '1';
        const percent = Math.floor((this.video.currentTime / this.video.duration) * 100) || 0;
        if (percent > 90) {
          this.markLessonComplete(lessonId);
        }
      }
    });
  }

  markLessonComplete(lessonId) {
    const checkEl = document.getElementById(`check-${lessonId}`);
    if (checkEl) {
      checkEl.checked = true;
      checkEl.dispatchEvent(new Event('change'));
    }
  }

  showSecurityToast(msg) {
    let toast = document.getElementById('toast');
    let toastMsg = document.getElementById('toast-message');
    if (toast && toastMsg) {
      toastMsg.textContent = msg;
      toast.classList.remove('bg-gray-900');
      toast.classList.add('bg-red-900');
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.remove('bg-red-900');
        toast.classList.add('bg-gray-900');
      }, 3500);
    }
  }
}

// Global initialization helper
window.EuphoriaSecurePlayer = EuphoriaSecurePlayer;
