/**
 * Euphoria Live Classes - Secure Document & Recipe PDF Reader
 * Renders proprietary formulation cards and recipe booklets inside a secure
 * sandboxed container with diagonal student watermarking, preventing
 * unauthorized downloading, printing, and sharing.
 */

class EuphoriaSecureDocViewer {
  constructor(options = {}) {
    this.container = options.container || document.getElementById('secure-pdf-viewer-container');
    this.student = options.student || {
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
      id: 'ELC-89214'
    };
    this.currentDoc = options.doc || null;
    this.init();
  }

  init() {
    if (!this.container) return;
    this.renderSampleRecipeCard();
    this.bindDocSecurity();
  }

  renderDoc(title, pages = []) {
    if (!this.container) return;
    this.container.innerHTML = '';

    // Document header toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'flex items-center justify-between px-4 py-3 bg-gray-900 text-white border-b border-gray-800 rounded-t-xl';
    toolbar.innerHTML = `
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5 text-euphoria-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <span class="text-xs sm:text-sm font-semibold truncate">${title}</span>
        <span class="bg-red-500/20 text-red-400 text-[10px] px-2 py-0.5 rounded-full border border-red-500/30">DRM Protected</span>
      </div>
      <div class="flex items-center gap-3 text-xs text-gray-400">
        <span class="hidden sm:inline">Licensed to: <strong class="text-gray-200">${this.student.name}</strong></span>
        <button id="doc-fullscreen-btn" class="p-1 hover:text-white transition-colors" title="Toggle Fullscreen">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
        </button>
      </div>
    `;
    this.container.appendChild(toolbar);

    // Document Pages Container
    const pagesContainer = document.createElement('div');
    pagesContainer.className = 'relative p-4 sm:p-6 bg-gray-100 overflow-y-auto max-h-[600px] flex flex-col gap-6 rounded-b-xl select-none';
    
    pages.forEach((pageData, index) => {
      const pageEl = document.createElement('div');
      pageEl.className = 'relative bg-white shadow-md rounded-lg p-6 sm:p-8 min-h-[480px] border border-gray-200 secure-pdf-container';
      
      // Diagonal Watermark
      const watermarkEl = document.createElement('div');
      watermarkEl.className = 'diagonal-watermark';
      watermarkEl.innerHTML = `
        <div class="diagonal-watermark-text">
          LICENSED TO: ${this.student.name.toUpperCase()} (${this.student.phone}) • EUPHORIA LIVE CLASSES • DO NOT DISTRIBUTE
        </div>
      `;
      pageEl.appendChild(watermarkEl);

      // Page Content
      const contentEl = document.createElement('div');
      contentEl.className = 'relative z-0';
      contentEl.innerHTML = pageData;
      pageEl.appendChild(contentEl);

      // Page Number Badge
      const pageNum = document.createElement('div');
      pageNum.className = 'absolute bottom-3 right-4 text-[11px] text-gray-400 font-mono';
      pageNum.textContent = `Page ${index + 1} of ${pages.length}`;
      pageEl.appendChild(pageNum);

      pagesContainer.appendChild(pageEl);
    });

    this.container.appendChild(pagesContainer);
  }

  renderSampleRecipeCard() {
    this.renderDoc('Formula & Recipe Booklet: Commercial Chocolate & Cookies (Eggless)', [
      `
      <div class="border-b border-gray-100 pb-4 mb-5">
        <div class="text-xs uppercase tracking-widest text-euphoria-red font-bold">Euphoria Live Classes • Recipe Formula #104</div>
        <h2 class="text-xl font-bold text-gray-900 mt-1">Crinkle-Top Belgium Fudge Brownies (100% Veg)</h2>
        <p class="text-xs text-gray-500 mt-0.5">Commercial Batch Size: 16 Square Slices | Baking Temp: 175°C (347°F)</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-gray-700">
        <div class="bg-amber-50/50 p-4 rounded-lg border border-amber-100">
          <h3 class="font-bold text-gray-900 mb-2.5 flex items-center gap-1.5 text-sm">
            <span class="w-2 h-2 rounded-full bg-euphoria-red"></span> Precision Ingredients (Grams)
          </h3>
          <ul class="space-y-1.5">
            <li>• Dark Couverture Chocolate (55%): <strong>200g</strong></li>
            <li>• Unsalted Butter (Amul / Bakery): <strong>100g</strong></li>
            <li>• Condensed Milk (Standardized): <strong>200g</strong></li>
            <li>• Castor Sugar (Fine Granulated): <strong>60g</strong></li>
            <li>• All-Purpose Flour (Maida): <strong>90g</strong></li>
            <li>• High-Fat Dutch Cocoa Powder: <strong>30g</strong></li>
            <li>• Baking Powder: <strong>1/2 tsp (2.5g)</strong></li>
            <li>• Hot Milk (for emulsion): <strong>40ml</strong></li>
          </ul>
        </div>

        <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 class="font-bold text-gray-900 mb-2.5 text-sm flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-euphoria-navy"></span> Chef's Secret Technique
          </h3>
          <p class="text-gray-600 leading-relaxed">
            The crinkle-top in eggless brownies is achieved by completely dissolving castor sugar into melted hot butter and condensed milk. Whisk continuously for 3 minutes until a glossy pale skin forms before folding in the sifted flour and cocoa.
          </p>
          <div class="mt-3 p-2.5 bg-white rounded border border-gray-200 text-[11px] text-gray-600">
            <strong>Commercial Shelf Life:</strong> 7 Days ambient (airtight tin), 21 Days refrigerated at 4°C.
          </div>
        </div>
      </div>

      <div class="mt-6 text-xs text-gray-700">
        <h3 class="font-bold text-gray-900 mb-2 text-sm">Step-by-Step Commercial Method</h3>
        <ol class="list-decimal pl-4 space-y-1.5 leading-relaxed text-gray-600">
          <li>Melt dark couverture chocolate and unsalted butter using double boiler method or microwave in 30-sec pulses.</li>
          <li>In a separate mixing bowl, whisk condensed milk, warm milk, and castor sugar until smooth.</li>
          <li>Combine chocolate emulsion into liquid base. Sift dry ingredients (maida + cocoa + baking powder) and gently fold.</li>
          <li>Line an 8x8 inch square baking tin with parchment paper. Pour batter and tap twice.</li>
          <li>Bake at 175°C in preheated oven for 26–28 minutes until edges set and center is slightly fudgy.</li>
        </ol>
      </div>
      `
    ]);
  }

  bindDocSecurity() {
    if (!this.container) return;

    this.container.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });

    const fsBtn = document.getElementById('doc-fullscreen-btn');
    if (fsBtn) {
      fsBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          this.container.requestFullscreen?.().catch(() => {});
        } else {
          document.exitFullscreen?.().catch(() => {});
        }
      });
    }
  }
}

window.EuphoriaSecureDocViewer = EuphoriaSecureDocViewer;
