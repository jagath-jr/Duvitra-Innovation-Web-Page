document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Element Selection ---
  const header = document.querySelector('.header-container');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.navbar a');
  const logo = document.querySelector(".navbar-logo");

  // --- 2. GSAP Page Load Animation ---
  const pageLoadTl = gsap.timeline({ defaults: { ease: "power3.out" } });
  pageLoadTl.from(header, { y: -100, opacity: 0, duration: 1.2 })
    .from(logo, { opacity: 0, scale: 0.5, duration: 0.6 }, "-=0.6")
    .from(navLinks, { y: 20, opacity: 0, stagger: 0.1, duration: 0.8 }, "-=0.5");

  // --- 3. Mobile Menu Toggle & Animation ---
  const menuTl = gsap.timeline({
    paused: true,
    reversed: true,
    defaults: { duration: 0.5, ease: "power2.inOut" }
  });

  menuTl.to(navMenu, { transform: 'translateY(0)' })
    .fromTo(navLinks, { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1 }, "-=0.3");

  const closeMenu = () => {
    if (navMenu.classList.contains('active')) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      menuTl.reverse();
    }
  };

  navToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents click from bubbling up to the document
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    menuTl.reversed() ? menuTl.play() : menuTl.reverse();
  });

  // --- 4. Enhanced Scroll Behavior ---
  let lastScrollY = window.scrollY;
  const headerHeight = header.offsetHeight;
  const scrollDelta = 10; // Pixels to scroll before triggering hide/show

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Do nothing if scroll is less than the delta
    if (Math.abs(currentScrollY - lastScrollY) <= scrollDelta) return;

    if (currentScrollY > lastScrollY && currentScrollY > headerHeight) {
      // Scrolling Down: Hide header & close mobile menu if open
      gsap.to(header, { y: '-100%', duration: 0.4, ease: 'power2.out' });
      closeMenu(); // Automatically close menu on scroll down
    } else {
      // Scrolling Up or at the top: Show header
      gsap.to(header, { y: '0%', duration: 0.4, ease: 'power2.out' });
    }

    lastScrollY = currentScrollY;
  });

  // --- 5. Close Menu on Link Click & Outside Click ---
  // On link click
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // On clicking outside the menu
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && !navMenu.contains(e.target)) {
      closeMenu();
    }
  });
});




/*----------------- Footer Animation & Dynamic Loading ------------*/

// Wait for DOM and GSAP to be ready
document.addEventListener("DOMContentLoaded", () => {
  // Early return if GSAP isn't available
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger not available');
    return;
  }

  // Load footer dynamically with path resolution
  const loadFooter = async () => {
    try {
      // Determine correct path based on current location
      const footerPath = window.location.pathname.includes('/services/') 
        ? '../footer.html' 
        : 'footer.html';
      
      console.log('Attempting to load footer from:', footerPath);
      
      const response = await fetch(footerPath);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const html = await response.text();
      const footerContainer = document.getElementById('common-footer');
      
      if (!footerContainer) {
        console.warn('Footer container not found');
        return;
      }
      
      footerContainer.innerHTML = html;
      initializeFooterAnimations();
    } catch (err) {
      console.error('Error loading footer:', err);
      // Fallback content
      const footerContainer = document.getElementById('common-footer');
      if (footerContainer) {
        footerContainer.innerHTML = `
          <div class="footer-fallback">
            <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        `;
      }
    }
  };

  // Initialize animations after footer is loaded
  const initializeFooterAnimations = () => {
    const select = selector => document.querySelector(selector);
    const selectAll = selector => document.querySelectorAll(selector);
    
    const siteFooter = select('.site-footer');
    if (!siteFooter) return;

    const backgroundText = select('.footer-background-text');
    const footerColumns = gsap.utils.toArray('.footer-column');
    const footerLogo = select('.footer-logo');
    const socialIconsContainer = select('.social-icons');
    const socialIcons = selectAll('.social-icons a');

    // Common animation settings
    const scrollTriggerDefaults = {
      scrub: 0.5,
      toggleActions: "play none none reverse"
    };

    // --- 1. Fade In Background Text ---
    if (backgroundText) {
      gsap.fromTo(backgroundText,
        { opacity: 0, y: 50 },
        {
          opacity: 0.2,
          y: 0,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            ...scrollTriggerDefaults,
            trigger: siteFooter,
            start: "top 80%",
            end: "bottom +=200"
          }
        }
      );
    }

    // --- 2. Slide In Footer Columns ---
    footerColumns.forEach((column, index) => {
      const direction = index % 2 === 0 ? -50 : 50;
      gsap.fromTo(column,
        { x: direction, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            ...scrollTriggerDefaults,
            trigger: column,
            start: "top 90%",
            end: "bottom +=100"
          }
        }
      );
    });

    // --- 3. Scale Up Footer Logo ---
    if (footerLogo) {
      gsap.fromTo(footerLogo,
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.6,
          ease: "elastic.out(1, 0.75)",
          scrollTrigger: {
            ...scrollTriggerDefaults,
            trigger: footerLogo,
            start: "top 90%",
            end: "bottom +=50"
          }
        }
      );
    }

    // --- 4. Staggered Fade In for Social Icons ---
    if (socialIconsContainer && socialIcons.length) {
      gsap.fromTo(socialIcons,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            ...scrollTriggerDefaults,
            trigger: socialIconsContainer,
            start: "top 90%",
            end: "bottom +=50"
          }
        }
      );
    }
  };

  // Start the process
  loadFooter();
});