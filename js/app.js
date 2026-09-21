// Euphoria Live Classes - Core Application Logic

document.addEventListener('DOMContentLoaded', () => {
  // Course Catalog Data matching the original screenshot
  const courses = [
    {
      id: 'course-1',
      title: 'Professional Chocolate Making',
      category: 'Chocolate',
      rating: 4.9,
      students: '2.5K+ students',
      originalPrice: 999,
      price: 349,
      badge: 'Bestseller',
      image: 'assets/images/course-chocolate.png',
      description: 'Master the art of handcrafted chocolates, tempering techniques, luscious fillings, bonbons, and commercial packaging.',
      modules: ['Chocolate Science & Tempering', 'Gourmet Truffles & Bonbons', 'Flavor Infusions & Fillings', 'Packaging, Shelf Life & Pricing']
    },
    {
      id: 'course-2',
      title: 'Cookies Making Online Class (Veg)',
      category: 'Baking',
      rating: 4.8,
      students: '1.8K+ students',
      originalPrice: 799,
      price: 299,
      badge: null,
      image: 'assets/images/course-cookies.png',
      description: 'Learn foolproof 100% vegetarian cookie recipes with perfect crunchy texture, chewy centers, and cafe-style presentation.',
      modules: ['Choco Chip Classics', 'Stuffed & Center-Filled Cookies', 'Eggless Baking Science', 'Batch Baking for Orders']
    },
    {
      id: 'course-3',
      title: 'Brownies & Blondies Masterclass',
      category: 'Baking',
      rating: 4.9,
      students: '2K+ students',
      originalPrice: 899,
      price: 349,
      badge: null,
      image: 'assets/images/course-brownies.png',
      description: 'Fudgy, crinkle-top brownies and buttery blondies made easy. Perfect for gift boxes and dessert buffets.',
      modules: ['Classic Fudgy Brownie', 'Salted Caramel Blondie', 'Crinkle Top Mastery', 'Costing & Home Business Guide']
    },
    {
      id: 'course-4',
      title: 'Cupcakes – A to Z',
      category: 'Baking',
      rating: 4.8,
      students: '1.2K+ students',
      originalPrice: 799,
      price: 399,
      badge: null,
      image: 'assets/images/course-cupcakes.png',
      description: 'Everything you need to bake light, fluffy cupcakes with stable piping buttercreams and stunning bakery decorations.',
      modules: ['Fluffy Sponge Techniques', 'Silky Buttercream & Ganache', 'Piping Nozzle Masterclass', 'Storage & Party Orders']
    },
    {
      id: 'course-5',
      title: 'Halwai Style Sweet Making',
      category: 'Cooking',
      rating: 4.9,
      students: '1.5K+ students',
      originalPrice: 999,
      price: 449,
      badge: null,
      image: 'assets/images/course-halwai.png',
      description: 'Traditional authentic Halwai secrets for melt-in-the-mouth Gulab Jamuns, Rasgulla, Kaju Katli, and festive mithais.',
      modules: ['Mawa & Chhena Secrets', 'Sugar Syrup Consistencies', 'Traditional Mithai Recipes', 'Commercial Batch Secrets']
    }
  ];

  // State
  let cart = JSON.parse(localStorage.getItem('euphoria_cart')) || [];
  let currentTestimonialIndex = 0;

  // Selectors
  const cartBtn = document.getElementById('cart-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartBackdrop = document.getElementById('cart-backdrop');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartCountBadge = document.getElementById('cart-count');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartEmptyState = document.getElementById('cart-empty');
  const cartFooter = document.getElementById('cart-footer');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const checkoutBtn = document.getElementById('checkout-btn');

  const searchInput = document.getElementById('search-input');
  const searchDropdown = document.getElementById('search-dropdown');

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMobileMenuBtn = document.getElementById('close-mobile-menu');

  const coursesContainer = document.getElementById('courses-grid');
  const courseModal = document.getElementById('course-modal');
  const courseModalContent = document.getElementById('course-modal-body');
  const closeCourseModalBtn = document.getElementById('close-course-modal');

  const storiesModal = document.getElementById('stories-modal');
  const openStoriesBtn = document.getElementById('open-stories-btn');
  const closeStoriesBtn = document.getElementById('close-stories-btn');

  const newsletterForm = document.getElementById('newsletter-form');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  // --- Cart Functions ---
  function updateCartUI() {
    cartCountBadge.textContent = cart.length;
    localStorage.setItem('euphoria_cart', JSON.stringify(cart));

    if (cart.length === 0) {
      cartEmptyState.classList.remove('hidden');
      cartItemsContainer.innerHTML = '';
      cartFooter.classList.add('hidden');
    } else {
      cartEmptyState.classList.add('hidden');
      cartFooter.classList.remove('hidden');

      let subtotal = 0;
      cartItemsContainer.innerHTML = cart.map((item, idx) => {
        subtotal += item.price;
        return `
          <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-orange-200 transition-all">
            <img src="${item.image}" alt="${item.title}" class="w-16 h-14 object-cover rounded-lg shadow-sm" />
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-semibold text-gray-900 truncate">${item.title}</h4>
              <p class="text-xs text-gray-500">₹${item.price} <span class="line-through text-gray-400">₹${item.originalPrice}</span></p>
            </div>
            <button class="remove-cart-item text-gray-400 hover:text-red-500 p-1.5 transition-colors" data-index="${idx}" title="Remove course">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
          </div>
        `;
      }).join('');

      cartSubtotalEl.textContent = `₹${subtotal}`;

      // Attach remove handlers
      document.querySelectorAll('.remove-cart-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(btn.getAttribute('data-index'));
          cart.splice(idx, 1);
          updateCartUI();
          showToast('Course removed from cart');
        });
      });
    }
  }

  function openCart() {
    cartDrawer.classList.remove('translate-x-full');
    cartBackdrop.classList.remove('opacity-0', 'pointer-events-none');
    document.body.classList.add('overflow-hidden');
  }

  function closeCart() {
    cartDrawer.classList.add('translate-x-full');
    cartBackdrop.classList.add('opacity-0', 'pointer-events-none');
    document.body.classList.remove('overflow-hidden');
  }

  function addToCart(course) {
    const exists = cart.some(item => item.id === course.id);
    if (exists) {
      showToast('Course is already in your cart!');
    } else {
      cart.push(course);
      updateCartUI();
      showToast(`Added "${course.title}" to cart!`);
      openCart();
    }
  }

  cartBtn.addEventListener('click', openCart);
  closeCartBtn.addEventListener('click', closeCart);
  cartBackdrop.addEventListener('click', closeCart);

  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    showToast('Redirecting to secure payment checkout...');
    setTimeout(() => {
      window.location.href = 'checkout.html';
    }, 500);
  });

  // --- Render Courses ---
  function renderCourses(filteredCourses = courses) {
    if (filteredCourses.length === 0) {
      coursesContainer.innerHTML = `
        <div class="col-span-full py-12 text-center text-gray-500">
          <p class="text-lg font-medium">No courses found matching your criteria.</p>
          <button id="reset-filter-btn" class="mt-4 px-5 py-2 bg-orange-600 text-white rounded-xl text-sm font-medium hover:bg-orange-700">View All Courses</button>
        </div>
      `;
      document.getElementById('reset-filter-btn')?.addEventListener('click', () => {
        renderCourses(courses);
      });
      return;
    }

    coursesContainer.innerHTML = filteredCourses.map(course => `
      <div class="bg-white rounded-2xl overflow-hidden shadow-soft border border-gray-100 flex flex-col justify-between shadow-card-hover group">
        <div class="relative overflow-hidden bg-gray-50">
          ${course.badge ? `<span class="absolute top-2.5 left-2.5 bg-emerald-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md z-10 tracking-wide">${course.badge}</span>` : ''}
          <img src="${course.image}" alt="${course.title}" class="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        
        <div class="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="font-bold text-[#0c203b] text-base leading-snug line-clamp-2 mb-2 group-hover:text-red-600 transition-colors">${course.title}</h3>
            <div class="flex items-center gap-1.5 text-xs text-gray-600 mb-3">
              <span class="text-amber-500 font-bold flex items-center gap-0.5">
                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                ${course.rating}
              </span>
              <span class="text-gray-400">(${course.students})</span>
            </div>
          </div>
          
          <div>
            <div class="flex items-baseline gap-2 mb-3">
              <span class="text-xs text-gray-400 line-through font-medium">₹${course.originalPrice}</span>
              <span class="text-xl font-extrabold text-red-600">₹${course.price}</span>
            </div>
            
            <div class="grid grid-cols-2 gap-2">
              <button class="view-course-btn w-full py-2 bg-[#d34a30] hover:bg-[#ba3c24] text-white text-xs font-bold rounded-lg transition-colors text-center shadow-sm" data-id="${course.id}">
                View Course
              </button>
              <button class="quick-add-btn w-full py-2 bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-bold rounded-lg transition-colors text-center border border-orange-200" data-id="${course.id}">
                + Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Attach listeners
    document.querySelectorAll('.view-course-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const courseId = btn.getAttribute('data-id');
        const course = courses.find(c => c.id === courseId);
        openCourseModal(course);
      });
    });

    document.querySelectorAll('.quick-add-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const courseId = btn.getAttribute('data-id');
        const course = courses.find(c => c.id === courseId);
        addToCart(course);
      });
    });
  }

  // --- Course Details Modal ---
  function openCourseModal(course) {
    courseModalContent.innerHTML = `
      <div class="flex flex-col md:flex-row gap-6">
        <div class="md:w-1/2">
          <div class="rounded-xl overflow-hidden shadow-md mb-4 bg-gray-100">
            <img src="${course.image}" alt="${course.title}" class="w-full h-56 object-cover" />
          </div>
          <div class="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs text-gray-500 line-through">Original: ₹${course.originalPrice}</span>
              <span class="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">Save ${Math.round((1 - course.price/course.originalPrice)*100)}%</span>
            </div>
            <div class="flex items-baseline gap-2 mb-4">
              <span class="text-3xl font-extrabold text-red-600">₹${course.price}</span>
              <span class="text-xs text-gray-600 font-medium">/ One-time fee (Lifetime access)</span>
            </div>
            <button id="modal-enroll-btn" class="w-full py-3 bg-[#d34a30] hover:bg-[#ba3c24] text-white font-bold rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2">
              <span>Enroll Now & Get Instant Access</span>
              <span>→</span>
            </button>
          </div>
        </div>

        <div class="md:w-1/2 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="bg-blue-100 text-blue-800 text-[11px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">${course.category}</span>
              <span class="text-xs text-amber-500 font-bold flex items-center gap-1">★ ${course.rating} (${course.students})</span>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-3">${course.title}</h2>
            <p class="text-sm text-gray-600 leading-relaxed mb-4">${course.description}</p>

            <h4 class="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">What you will learn:</h4>
            <ul class="space-y-2 mb-6">
              ${course.modules.map(mod => `
                <li class="flex items-start gap-2 text-xs text-gray-700">
                  <svg class="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  <span>${mod}</span>
                </li>
              `).join('')}
            </ul>

            <div class="grid grid-cols-2 gap-2 text-[11px] text-gray-600 border-t border-gray-100 pt-3">
              <div class="flex items-center gap-1.5">
                <svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>HD Pre-recorded videos</span>
              </div>
              <div class="flex items-center gap-1.5">
                <svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                <span>Downloadable recipe PDF</span>
              </div>
              <div class="flex items-center gap-1.5">
                <svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>Certificate of completion</span>
              </div>
              <div class="flex items-center gap-1.5">
                <svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                <span>Doubt-clearing support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    courseModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');

    document.getElementById('modal-enroll-btn')?.addEventListener('click', () => {
      addToCart(course);
      closeCourseModal();
    });
  }

  function closeCourseModal() {
    courseModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  closeCourseModalBtn?.addEventListener('click', closeCourseModal);
  courseModal?.addEventListener('click', (e) => {
    if (e.target === courseModal) closeCourseModal();
  });

  // --- Price Tier Filtering ---
  document.querySelectorAll('.price-tier-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const priceTarget = parseInt(btn.getAttribute('data-price'));
      const filtered = courses.filter(c => c.price === priceTarget || c.price <= priceTarget);
      
      // Smooth scroll to course section
      document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' });
      
      showToast(`Showing courses up to ₹${priceTarget}/-`);
      renderCourses(filtered);
    });
  });

  // --- Live Search ---
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (!query) {
      searchDropdown.classList.add('hidden');
      renderCourses(courses);
      return;
    }

    const matches = courses.filter(c => 
      c.title.toLowerCase().includes(query) || 
      c.category.toLowerCase().includes(query) ||
      c.description.toLowerCase().includes(query)
    );

    if (matches.length > 0) {
      searchDropdown.innerHTML = matches.map(c => `
        <div class="search-result-item flex items-center gap-3 p-2.5 hover:bg-orange-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors" data-id="${c.id}">
          <img src="${c.image}" alt="${c.title}" class="w-10 h-8 object-cover rounded shadow-sm" />
          <div class="flex-1 min-w-0">
            <div class="text-xs font-semibold text-gray-900 truncate">${c.title}</div>
            <div class="text-[11px] text-red-600 font-bold">₹${c.price} <span class="text-gray-400 line-through font-normal">₹${c.originalPrice}</span></div>
          </div>
        </div>
      `).join('');
      searchDropdown.classList.remove('hidden');

      document.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
          const id = item.getAttribute('data-id');
          const course = courses.find(c => c.id === id);
          searchInput.value = course.title;
          searchDropdown.classList.add('hidden');
          openCourseModal(course);
        });
      });
    } else {
      searchDropdown.innerHTML = `<div class="p-3 text-xs text-gray-500 text-center">No courses found matching "${query}"</div>`;
      searchDropdown.classList.remove('hidden');
    }

    renderCourses(matches);
  });

  // Close search dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
      searchDropdown.classList.add('hidden');
    }
  });

  // --- Category Nav Filters ---
  document.querySelectorAll('.nav-filter-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = link.getAttribute('data-category');
      
      document.querySelectorAll('.nav-filter-link').forEach(l => {
        l.classList.remove('text-blue-600', 'border-b-2', 'border-blue-600', 'font-semibold');
        l.classList.add('text-gray-700');
      });
      link.classList.add('text-blue-600', 'border-b-2', 'border-blue-600', 'font-semibold');
      link.classList.remove('text-gray-700');

      if (cat === 'all' || cat === 'home') {
        renderCourses(courses);
      } else {
        const filtered = courses.filter(c => c.category.toLowerCase() === cat.toLowerCase());
        renderCourses(filtered);
      }

      document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-header').forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const icon = header.querySelector('.faq-icon');
      const isOpen = content.classList.contains('open');

      // Close all other faqs
      document.querySelectorAll('.faq-content').forEach(c => c.classList.remove('open'));
      document.querySelectorAll('.faq-icon').forEach(i => i.textContent = '+');

      if (!isOpen) {
        content.classList.add('open');
        icon.textContent = '−';
      }
    });
  });

  // --- Testimonial Slider Controls ---
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const prevReviewBtn = document.getElementById('prev-review-btn');
  const nextReviewBtn = document.getElementById('next-review-btn');

  function showTestimonial(index) {
    testimonialCards.forEach((card, idx) => {
      if (idx === index) {
        card.classList.remove('hidden');
        card.classList.add('opacity-100');
      } else {
        card.classList.add('hidden');
        card.classList.remove('opacity-100');
      }
    });
  }

  // On mobile screen only show 1 at a time, on desktop show all 3
  function checkResponsiveTestimonials() {
    if (window.innerWidth < 768) {
      showTestimonial(currentTestimonialIndex);
    } else {
      testimonialCards.forEach(card => card.classList.remove('hidden'));
    }
  }

  window.addEventListener('resize', checkResponsiveTestimonials);
  checkResponsiveTestimonials();

  prevReviewBtn?.addEventListener('click', () => {
    currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(currentTestimonialIndex);
  });

  nextReviewBtn?.addEventListener('click', () => {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialCards.length;
    showTestimonial(currentTestimonialIndex);
  });

  // --- Mobile Menu ---
  mobileMenuBtn?.addEventListener('click', () => {
    mobileMenu.classList.remove('-translate-x-full');
    document.body.classList.add('overflow-hidden');
  });

  closeMobileMenuBtn?.addEventListener('click', () => {
    mobileMenu.classList.add('-translate-x-full');
    document.body.classList.remove('overflow-hidden');
  });

  // --- Student Stories Modal ---
  openStoriesBtn?.addEventListener('click', () => {
    storiesModal?.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  });

  closeStoriesBtn?.addEventListener('click', () => {
    storiesModal?.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  });

  storiesModal?.addEventListener('click', (e) => {
    if (e.target === storiesModal) {
      storiesModal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
  });

  // --- Newsletter Form ---
  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    if (emailInput && emailInput.value) {
      showToast(`Welcome! You've been subscribed with ${emailInput.value}`);
      emailInput.value = '';
    }
  });

  // --- Toast Notification ---
  function showToast(msg) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // Initialize
  renderCourses();
  updateCartUI();
});
