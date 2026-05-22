document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================================================
  // 1. SCROLL EFFECT ON HEADER
  // ==========================================================================
  const header = document.querySelector('.l-header');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('l-header--scrolled');
    } else {
      header.classList.remove('l-header--scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  // Trigger initially in case of refresh or page reload midway
  handleScroll();

  // ==========================================================================
  // 2. MOBILE HAMBURGER MENU & SCROLL LOCK
  // ==========================================================================
  const hamburger = document.querySelector('.l-header__hamburger');
  const mobileNav = document.querySelector('.p-mobile-nav');
  
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isActive = hamburger.classList.toggle('is-active');
      mobileNav.classList.toggle('is-active', isActive);
      
      // Toggle scroll-lock on body
      if (isActive) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close mobile nav when clicking a link
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('is-active');
        mobileNav.classList.remove('is-active');
        document.body.style.overflow = '';
      });
    });
  }

  // ==========================================================================
  // 3. DYNAMIC HERO SLIDER
  // ==========================================================================
  const heroSlides = document.querySelectorAll('.p-hero__slide');
  if (heroSlides.length > 0) {
    let currentSlide = 0;
    const slideInterval = 6000; // 6 seconds

    const nextSlide = () => {
      // Remove active class from current slide
      heroSlides[currentSlide].classList.remove('is-active');
      
      // Go to next slide (loop back to start if at the end)
      currentSlide = (currentSlide + 1) % heroSlides.length;
      
      // Add active class to new slide
      heroSlides[currentSlide].classList.add('is-active');
    };

    // Auto rotate slides
    setInterval(nextSlide, slideInterval);
  }

  // ==========================================================================
  // 4. INTERACTIVE TAB SYSTEM (Tab buttons toggle content containers)
  // ==========================================================================
  
  // Generic tab handler function
  const setupTabs = (tabContainerSelector, tabBtnSelector, contentSelector) => {
    const tabContainers = document.querySelectorAll(tabContainerSelector);
    
    tabContainers.forEach(container => {
      const tabs = container.querySelectorAll(tabBtnSelector);
      
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const targetId = tab.dataset.tab;
          
          // Remove active class from all sibling tab buttons in this container
          tabs.forEach(t => t.classList.remove('is-active'));
          
          // Add active class to clicked tab
          tab.classList.add('is-active');
          
          // Find all corresponding tab content panels related to this block
          const contentWrapper = container.nextElementSibling;
          if (contentWrapper) {
            const contents = contentWrapper.querySelectorAll(contentSelector);
            contents.forEach(content => {
              if (content.id === targetId) {
                content.classList.add('is-active');
              } else {
                content.classList.remove('is-active');
              }
            });
          }
        });
      });
    });
  };

  // Setup tabs for News list and Store detailed contents
  setupTabs('.p-tabs', '.p-tabs__btn', '.p-news-grid');
  setupTabs('.p-sub-tabs', '.p-sub-tabs__btn', '.p-tab-content');

  // Interactive News switching for index.html tab panels
  const newsTabBtns = document.querySelectorAll('.js-news-tab-btn');
  const newsGrids = document.querySelectorAll('.js-news-grid');

  if (newsTabBtns.length > 0 && newsGrids.length > 0) {
    newsTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.tab;

        // Toggle button states
        newsTabBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        // Show/Hide grids based on category
        newsGrids.forEach(grid => {
          if (category === 'all') {
            grid.style.display = 'grid';
          } else if (grid.dataset.category === category) {
            grid.style.display = 'grid';
          } else {
            grid.style.display = 'none';
          }
        });
      });
    });
  }

  // ==========================================================================
  // 5. INTERSECTION OBSERVER FOR SCROLL ANIMATIONS (Fade-up / Fade-in)
  // ==========================================================================
  const animatedElements = document.querySelectorAll('.u-fade-up, .u-fade-in');
  
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null, // use viewport
      rootMargin: '0px 0px -10% 0px', // trigger slightly before entering the screen
      threshold: 0.15 // trigger when 15% is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Once animated, we don't need to observe it again
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach(el => {
      observer.observe(el);
    });
  } else {
    // Fallback if IntersectionObserver is not supported
    animatedElements.forEach(el => {
      el.classList.add('is-visible');
    });
  }

  // ==========================================================================
  // 6. DETAILED TIMETABLE TABS IN BRANCH STORES (Dynamic Branch Interaction)
  // ==========================================================================
  const timetableTabs = document.querySelectorAll('.js-timetable-tab');
  const timetableTables = document.querySelectorAll('.js-timetable-table');

  if (timetableTabs.length > 0 && timetableTables.length > 0) {
    timetableTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetClass = tab.dataset.tab;
        
        timetableTabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');

        timetableTables.forEach(table => {
          if (table.classList.contains(targetClass)) {
            table.classList.add('is-active');
            table.style.display = 'table';
          } else {
            table.classList.remove('is-active');
            table.style.display = 'none';
          }
        });
      });
    });
  }
});
