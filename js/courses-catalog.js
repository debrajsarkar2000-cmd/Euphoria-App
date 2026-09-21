// Euphoria Live Classes - Courses Catalog Engine

document.addEventListener('DOMContentLoaded', () => {
  const courses = window.EUPHORIA_COURSES || [];
  
  // State
  let activeCategory = 'all';
  let activePriceFilter = 'all';
  let activeSort = 'popular';
  let searchQuery = '';
  let cart = JSON.parse(localStorage.getItem('euphoria_cart')) || [];

  // DOM Elements
  const grid = document.getElementById('catalog-courses-grid');
  const countEl = document.getElementById('displayed-count');
  const noResultsEl = document.getElementById('no-results');
  const searchInput = document.getElementById('catalog-search-input');
  const priceFilter = document.getElementById('price-filter');
  const sortSelect = document.getElementById('sort-select');
  const pills = document.querySelectorAll('.cat-pill');
  const resetBtn = document.getElementById('reset-filters');
  const clearSearchBtn = document.getElementById('clear-search-btn');

  // Cart elements
  const cartBtn = document.getElementById('cart-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartBackdrop = document.getElementById('cart-backdrop');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartCountEl = document.getElementById('cart-count');
  const drawerCartCount = document.getElementById('drawer-cart-count');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartEmptyEl = document.getElementById('cart-empty');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const checkoutBtn = document.getElementById('checkout-btn');

  // Modal elements
  const modal = document.getElementById('course-modal');
  const modalBody = document.getElementById('course-modal-body');
  const closeModalBtn = document.getElementById('close-course-modal');

  // Initialize category counts
  function updateCategoryCounts() {
    const counts = { all: courses.length, Cakes: 0, Baking: 0, Chocolates: 0, Cookies: 0, Sweets: 0, 'Breads & Snacks': 0 };
    courses.forEach(c => {
      if (counts[c.category] !== undefined) counts[c.category]++;
    });
    
    document.getElementById('count-all')?.replaceChildren(document.createTextNode(counts.all));
    document.getElementById('count-cakes')?.replaceChildren(document.createTextNode(counts.Cakes || 0));
    document.getElementById('count-baking')?.replaceChildren(document.createTextNode(counts.Baking || 0));
    document.getElementById('count-chocolates')?.replaceChildren(document.createTextNode(counts.Chocolates || 0));
    document.getElementById('count-cookies')?.replaceChildren(document.createTextNode(counts.Cookies || 0));
    document.getElementById('count-sweets')?.replaceChildren(document.createTextNode(counts.Sweets || 0));
    document.getElementById('count-breads')?.replaceChildren(document.createTextNode(counts['Breads & Snacks'] || 0));
  }

  // Filter & Sort Logic
  function getFilteredCourses() {
    return courses.filter(c => {
      // Category match
      const matchesCat = (activeCategory === 'all') || (c.category === activeCategory);

      // Price filter
      let matchesPrice = true;
      if (activePriceFilter === 'under-399') matchesPrice = c.price < 399;
      else if (activePriceFilter === '399-499') matchesPrice = (c.price >= 399 && c.price <= 499);
      else if (activePriceFilter === 'above-500') matchesPrice = c.price > 499;

      // Search query
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      );

      return matchesCat && matchesPrice && matchesSearch;
    }).sort((a, b) => {
      if (activeSort === 'rating') return b.rating - a.rating;
      if (activeSort === 'price-asc') return a.price - b.price;
      if (activeSort === 'price-desc') return b.price - a.price;
      // Default: Popular (by reviews)
      return (b.reviewsCount || 0) - (a.reviewsCount || 0);
    });
  }

  // Render Courses Cards
  function renderGrid() {
    const list = getFilteredCourses();
    countEl.textContent = list.length;

    // Toggle reset filters button visibility
    const isFiltered = activeCategory !== 'all' || activePriceFilter !== 'all' || searchQuery !== '';
    resetBtn.classList.toggle('hidden', !isFiltered);

    if (list.length === 0) {
      grid.innerHTML = '';
      noResultsEl.classList.remove('hidden');
      return;
    }

    noResultsEl.classList.add('hidden');
    grid.innerHTML = list.map(c => {
      const discount = Math.round(((c.originalPrice - c.price) / c.originalPrice) * 100);
      return `
        <div class="bg-white rounded-2xl border border-gray-100 shadow-soft shadow-card-hover overflow-hidden flex flex-col group transition-all" data-course-id="${c.id}">
          
          <!-- Course Image & Badges -->
          <div class="relative overflow-hidden aspect-[16/10] bg-gray-100">
            <img 
              src="${c.image}" 
              alt="${c.title}" 
              loading="lazy"
              class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              onerror="this.src='assets/images/course-chocolate.png'"
            />
            
            <div class="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
              <span class="badge-veg" title="100% Vegetarian / Eggless"></span>
              <span class="bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                ${c.category}
              </span>
              ${c.badge ? `<span class="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">${c.badge}</span>` : ''}
            </div>

            <div class="absolute bottom-2 right-2 bg-white/95 backdrop-blur-sm text-emerald-700 text-[11px] font-bold px-2 py-0.5 rounded shadow-sm">
              Save ${discount}%
            </div>
          </div>

          <!-- Course Body -->
          <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-2 text-xs text-amber-500 font-semibold mb-1">
                <span class="flex items-center">⭐ ${c.rating}</span>
                <span class="text-gray-400 font-normal">(${c.studentsCount} students)</span>
              </div>

              <h3 class="font-bold text-gray-900 text-sm sm:text-base leading-snug group-hover:text-euphoria-red transition-colors line-clamp-2">
                <a href="course-detail.html?id=${c.id}">
                  ${c.title}
                </a>
              </h3>

              <p class="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                ${c.shortDescription}
              </p>
            </div>

            <!-- Price & Actions -->
            <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
              <div>
                <div class="flex items-baseline gap-1.5">
                  <span class="text-lg font-bold text-gray-900">₹${c.price}</span>
                  <span class="text-xs text-gray-400 line-through">₹${c.originalPrice}</span>
                </div>
                <div class="text-[10px] text-emerald-600 font-medium">Lifetime Access + PDF</div>
              </div>

              <div class="flex items-center gap-1.5">
                <button 
                  class="preview-course-btn p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                  data-id="${c.id}"
                  title="Quick View Syllabus"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                </button>

                <button 
                  class="add-to-cart-btn px-3 py-2 bg-euphoria-red text-white text-xs font-bold rounded-lg shadow hover:bg-euphoria-redHover transition-colors flex items-center gap-1"
                  data-id="${c.id}"
                >
                  <span>Enroll</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      `;
    }).join('');

    bindGridCardEvents();
  }

  // Bind Clicks on Dynamic Cards
  function bindGridCardEvents() {
    // Quick Preview
    document.querySelectorAll('.preview-course-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const course = courses.find(item => item.id === id);
        if (course) openCoursePreview(course);
      });
    });

    // Add to Cart
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const course = courses.find(item => item.id === id);
        if (course) addToCart(course);
      });
    });
  }

  // Open Preview Modal
  function openCoursePreview(course) {
    const modulesHtml = course.modules.map((m, i) => `
      <li class="flex items-start gap-2 text-xs text-gray-700 py-1">
        <span class="w-5 h-5 rounded-full bg-red-100 text-euphoria-red font-bold text-[10px] flex items-center justify-center shrink-0">
          ${i + 1}
        </span>
        <span class="mt-0.5">${m}</span>
      </li>
    `).join('');

    modalBody.innerHTML = `
      <div class="flex flex-col sm:flex-row gap-6">
        <div class="sm:w-1/2">
          <div class="rounded-xl overflow-hidden shadow-md aspect-[16/10] bg-gray-100">
            <img src="${course.image}" alt="${course.title}" class="w-full h-full object-cover" onerror="this.src='assets/images/course-chocolate.png'" />
          </div>
          <div class="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-100 text-xs">
            <div class="font-bold text-amber-900 mb-1 flex items-center gap-1.5">
              <span>🛡️ Content Security & Inclusions</span>
            </div>
            <ul class="space-y-1 text-amber-800 text-[11px]">
              <li>✓ Secure DRM-protected high-definition video lessons</li>
              <li>✓ Watermarked recipe formulation PDF</li>
              <li>✓ Verified ISO Certificate upon completion</li>
              <li>✓ Dedicated WhatsApp doubt resolution support</li>
            </ul>
          </div>
        </div>

        <div class="sm:w-1/2 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="badge-veg"></span>
              <span class="text-xs font-semibold text-euphoria-red uppercase tracking-wider">${course.category}</span>
              <span class="text-xs text-gray-400">• ⭐ ${course.rating} (${course.studentsCount})</span>
            </div>

            <h2 class="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
              ${course.title}
            </h2>

            <p class="text-xs text-gray-600 mt-2 leading-relaxed">
              ${course.shortDescription}
            </p>

            <div class="mt-4">
              <h4 class="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Curriculum Outline</h4>
              <ul class="space-y-1 max-h-48 overflow-y-auto pr-1">
                ${modulesHtml}
              </ul>
            </div>
          </div>

          <div class="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
            <div>
              <div class="text-xl font-extrabold text-gray-900">₹${course.price}</div>
              <div class="text-xs text-gray-400 line-through">₹${course.originalPrice}</div>
            </div>

            <div class="flex gap-2">
              <a href="course-detail.html?id=${course.id}" class="px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                Full Details
              </a>
              <button class="modal-enroll-btn px-5 py-2.5 bg-euphoria-red text-white text-xs font-bold rounded-xl shadow-lg hover:bg-euphoria-redHover transition-colors flex items-center gap-1.5" data-id="${course.id}">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    modalBody.querySelector('.modal-enroll-btn').addEventListener('click', () => {
      addToCart(course);
      closeModal();
    });

    modal.classList.remove('hidden');
  }

  function closeModal() {
    modal.classList.add('hidden');
  }

  closeModalBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Filter Events
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => {
        p.classList.remove('active', 'bg-euphoria-red', 'text-white');
        p.classList.add('bg-gray-100', 'text-gray-700');
      });
      pill.classList.add('active', 'bg-euphoria-red', 'text-white');
      pill.classList.remove('bg-gray-100', 'text-gray-700');
      activeCategory = pill.dataset.cat;
      renderGrid();
    });
  });

  priceFilter?.addEventListener('change', (e) => {
    activePriceFilter = e.target.value;
    renderGrid();
  });

  sortSelect?.addEventListener('change', (e) => {
    activeSort = e.target.value;
    renderGrid();
  });

  searchInput?.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderGrid();
  });

  resetBtn?.addEventListener('click', resetAllFilters);
  clearSearchBtn?.addEventListener('click', resetAllFilters);

  function resetAllFilters() {
    activeCategory = 'all';
    activePriceFilter = 'all';
    searchQuery = '';
    if (searchInput) searchInput.value = '';
    if (priceFilter) priceFilter.value = 'all';
    pills.forEach(p => {
      const isAll = p.dataset.cat === 'all';
      p.classList.toggle('active', isAll);
      p.classList.toggle('bg-euphoria-red', isAll);
      p.classList.toggle('text-white', isAll);
      p.classList.toggle('bg-gray-100', !isAll);
      p.classList.toggle('text-gray-700', !isAll);
    });
    renderGrid();
  }

  // Cart Functions
  function saveCart() {
    localStorage.setItem('euphoria_cart', JSON.stringify(cart));
    updateCartUI();
  }

  function addToCart(course) {
    const existing = cart.find(item => item.id === course.id);
    if (!existing) {
      cart.push({
        id: course.id,
        title: course.title,
        price: course.price,
        originalPrice: course.originalPrice,
        image: course.image,
        category: course.category
      });
      saveCart();
      showToast(`Added "${course.title.slice(0, 24)}..." to cart!`);
    } else {
      showToast('Course already in your cart.');
    }
    openCartDrawer();
  }

  function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
  }

  function updateCartUI() {
    const count = cart.length;
    if (cartCountEl) cartCountEl.textContent = count;
    if (drawerCartCount) drawerCartCount.textContent = count;

    if (count === 0) {
      if (cartEmptyEl) cartEmptyEl.classList.remove('hidden');
      if (cartItemsContainer) cartItemsContainer.innerHTML = '';
      if (cartSubtotalEl) cartSubtotalEl.textContent = '₹0';
      return;
    }

    if (cartEmptyEl) cartEmptyEl.classList.add('hidden');
    const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
    if (cartSubtotalEl) cartSubtotalEl.textContent = `₹${subtotal}`;

    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = cart.map(item => `
        <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
          <img src="${item.image}" alt="${item.title}" class="w-14 h-14 rounded-lg object-cover bg-white" onerror="this.src='assets/images/course-chocolate.png'" />
          <div class="flex-1 min-w-0">
            <h4 class="text-xs font-bold text-gray-900 truncate">${item.title}</h4>
            <div class="text-[11px] text-gray-500">${item.category}</div>
            <div class="text-xs font-bold text-euphoria-red mt-1">₹${item.price}</div>
          </div>
          <button class="remove-cart-item text-gray-400 hover:text-red-500 p-1.5 transition-colors" data-id="${item.id}">
            ✕
          </button>
        </div>
      `).join('');

      cartItemsContainer.querySelectorAll('.remove-cart-item').forEach(btn => {
        btn.addEventListener('click', () => removeFromCart(btn.dataset.id));
      });
    }
  }

  function openCartDrawer() {
    if (cartDrawer && cartBackdrop) {
      cartDrawer.classList.remove('translate-x-full');
      cartBackdrop.classList.remove('opacity-0', 'pointer-events-none');
    }
  }

  function closeCartDrawer() {
    if (cartDrawer && cartBackdrop) {
      cartDrawer.classList.add('translate-x-full');
      cartBackdrop.classList.add('opacity-0', 'pointer-events-none');
    }
  }

  cartBtn?.addEventListener('click', openCartDrawer);
  closeCartBtn?.addEventListener('click', closeCartDrawer);
  cartBackdrop?.addEventListener('click', closeCartDrawer);

  checkoutBtn?.addEventListener('click', () => {
    if (cart.length === 0) {
      showToast('Your cart is empty!');
      return;
    }
    // Forward to student portal with simulated active enrollment
    showToast('Redirecting to Student Portal...');
    setTimeout(() => {
      window.location.href = 'learn.html';
    }, 1000);
  });

  function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    if (toast && toastMsg) {
      toastMsg.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    }
  }

  // Initial load
  updateCategoryCounts();
  updateCartUI();
  renderGrid();
});
