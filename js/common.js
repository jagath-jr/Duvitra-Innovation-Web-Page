// =============================================
// HEADER INITIALIZATION & ANIMATIONS
// =============================================

// Main function containing all header animations and interactions
function initializeHeaderAnimations() {
  // --- 1. Element Selection ---
  const header = document.querySelector('.header-container');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.navbar a');
  const logo = document.querySelector(".navbar-logo");

  // Return early if essential elements don't exist
  if (!header || !navToggle || !navMenu || navLinks.length === 0 || !logo) {
    console.warn('One or more header elements not found - skipping header animations');
    return;
  }

  // --- 2. GSAP Page Load Animation ---
  const pageLoadTl = gsap.timeline({ defaults: { ease: "power3.out" } });
  
  pageLoadTl
    .from(header, { 
      y: -100, 
      opacity: 0, 
      duration: 1.2 
    })
    .from(logo, { 
      opacity: 0, 
      scale: 0.5, 
      duration: 0.6 
    }, "-=0.6")
    .from(navLinks, { 
      y: 20, 
      opacity: 0, 
      stagger: 0.1, 
      duration: 0.8 
    }, "-=0.5");

  // --- 3. Mobile Menu Toggle & Animation ---
  const menuTl = gsap.timeline({
    paused: true,
    reversed: true,
    defaults: { duration: 0.5, ease: "power2.inOut" }
  });

  // Mobile menu animation
  menuTl
    .to(navMenu, { 
      transform: 'translateY(0)',
      visibility: 'visible'
    })
    .fromTo(navLinks, 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, stagger: 0.1 }, 
    "-=0.3");

  // Function to close mobile menu
  const closeMenu = () => {
    if (navMenu.classList.contains('active')) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      menuTl.reverse().then(() => {
        // Ensure menu is hidden after animation
        if (menuTl.reversed()) {
          navMenu.style.visibility = 'hidden';
        }
      });
    }
  };

  // Toggle mobile menu
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    if (menuTl.reversed()) {
      navMenu.style.visibility = 'visible';
      menuTl.play();
    } else {
      menuTl.reverse().then(() => {
        if (menuTl.reversed()) {
          navMenu.style.visibility = 'hidden';
        }
      });
    }
  });

  // --- 4. Enhanced Scroll Behavior ---
  let lastScrollY = window.scrollY;
  const headerHeight = header.offsetHeight;
  const scrollDelta = 10; // Pixels to scroll before triggering hide/show
  let isScrollingDown = false;
  let scrollTimeout;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // Clear any existing timeout
    clearTimeout(scrollTimeout);

    // Determine scroll direction
    isScrollingDown = currentScrollY > lastScrollY;

    // Only trigger if scroll exceeds delta
    if (Math.abs(currentScrollY - lastScrollY) > scrollDelta) {
      if (isScrollingDown && currentScrollY > headerHeight) {
        // Scrolling Down: Hide header
        gsap.to(header, { 
          y: '-100%', 
          duration: 0.4, 
          ease: 'power2.out'
        });
        closeMenu(); // Close menu on scroll down
      } else {
        // Scrolling Up: Show header
        gsap.to(header, { 
          y: '0%', 
          duration: 0.4, 
          ease: 'power2.out'
        });
      }
    }

    lastScrollY = currentScrollY;

    // Set timeout to handle scroll end
    scrollTimeout = setTimeout(() => {
      if (!isScrollingDown && currentScrollY <= headerHeight) {
        gsap.to(header, {
          y: '0%',
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    }, 100);
  };

  // Throttled scroll event
  window.addEventListener('scroll', () => {
    requestAnimationFrame(handleScroll);
  });

  // --- 5. Close Menu on Interactions ---
  // Close when clicking on links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Only close if it's a same-page link
      if (link.getAttribute('href').startsWith('#')) {
        closeMenu();
      }
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !navToggle.contains(e.target)) {
      closeMenu();
    }
  });

  // Close when window is resized (if mobile menu is open)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });
}

// =============================================
// DYNAMIC HEADER LOADING WITH PATH RESOLUTION
// =============================================

async function loadHeader() {
  try {
    // Determine correct path based on current location
    let headerPath = 'header.html';
    
    // Check if we're in a subdirectory (like /services/)
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    if (pathSegments.length > 1) {
      // We're in a subdirectory, need to look one level up
      headerPath = '../header.html';
    }

    const response = await fetch(headerPath);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const html = await response.text();
    const headerContainer = document.getElementById('common-header');
    
    if (!headerContainer) {
      console.warn('Header container not found');
      return;
    }
    
    headerContainer.innerHTML = html;
    
    // Initialize animations after a small delay to ensure DOM is ready
    setTimeout(() => {
      initializeHeaderAnimations();
    }, 50);
    
  } catch (err) {
    console.error('Error loading header:', err);
    // Fallback content
    const headerContainer = document.getElementById('common-header');
    if (headerContainer) {
      headerContainer.innerHTML = `
        <div class="header-fallback">
          <a href="/../index.html" class="logo">Your Logo</a>
          <nav>
            <a href="/../index.html">Home</a>
            <a href="/services.html">Services</a>
            <a href="/../about.html">About</a>
            <a href="/../contact.html">Contact</a>
          </nav>
        </div>
      `;
    }
  }
}

// Start loading the header when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Only proceed if GSAP is available
  if (typeof gsap !== 'undefined') {
    loadHeader();
  } else {
    console.error('GSAP not loaded - header animations disabled');
    // Load header without animations
    loadHeader();
  }
});

/*----------------- Footer Animation & Dynamic Loading ------------*/

// Wait for DOM and GSAP to be ready
document.addEventListener("DOMContentLoaded", () => {
    // Early return if GSAP isn't available
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.error('GSAP or ScrollTrigger not available');
        return;
    }

    const footerContainer = document.getElementById('common-footer');
    if (!footerContainer) {
        console.warn('Footer container element not found');
        return;
    }

    // Load footer dynamically with path resolution
    const loadFooter = async () => {
        try {
            // Determine correct path based on current location
            const isServicesPage = window.location.pathname.includes('/services/');
            const footerPath = isServicesPage ? '../footer.html' : 'footer.html';
            
            console.log('Attempting to load footer from:', footerPath);
            
            const response = await fetch(footerPath);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const html = await response.text();
            footerContainer.innerHTML = html;

        } catch (err) {
            console.error('Error loading footer, using fallback:', err);
            // Fallback content if fetch fails
            const isServicesPage = window.location.pathname.includes('/services/');
            const basePath = isServicesPage ? '../' : './';

            footerContainer.innerHTML = `
                <div class="footer-fallback" style="text-align: center; padding: 20px;">
                    <h4>QUICK LINKS</h4>
                    <p><a href="${basePath}index.html">Home</a> | <a href="${basePath}services/services.html">Services</a></p>
                    <h4>CONTACT US</h4>
                    <p>123 Tech Street, Thiruvananthapuram</p>
                    <p class="copyright">© ${new Date().getFullYear()} Duvitra. All rights reserved.</p>
                </div>
            `;
        } finally {
            // This runs after either try or catch, ensuring animations always initialize
            initializeFooterAnimations();
        }
    };

    // Initialize animations after footer content is in the DOM
    const initializeFooterAnimations = () => {
        const select = selector => document.querySelector(selector);
        
        const siteFooter = select('.site-footer');
        if (!siteFooter) {
            console.warn("'.site-footer' not found, skipping animations.");
            return;
        }

        const backgroundText = select('.footer-background-text');
        const footerColumns = gsap.utils.toArray('.footer-column');
        const footerLogo = select('.footer-logo');
        const socialIconsContainer = select('.social-icons');
        const socialIcons = gsap.utils.toArray('.social-icons a');

        // --- 1. Fade In Background Text ---
        if (backgroundText) {
            gsap.fromTo(backgroundText,
                { opacity: 0, y: 50 },
                {
                    opacity: 0.2, y: 0, duration: 2, ease: "power2.out",
                    scrollTrigger: {
                        trigger: siteFooter,
                        start: "top 80%",
                        scrub: 0.5, // Scrub is good for this background effect
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        // --- 2. Slide In Footer Columns (FIXED) ---
        footerColumns.forEach((column, index) => {
            const direction = index % 2 === 0 ? -50 : 50;
            gsap.fromTo(column,
                { x: direction, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 0.8, ease: "power2.out",
                    scrollTrigger: {
                        trigger: column,
                        start: "top 90%",
                        toggleActions: "play none none none" // No scrub!
                    }
                }
            );
        });

        // --- 3. Scale Up Footer Logo ---
        if (footerLogo) {
            gsap.fromTo(footerLogo,
                { scale: 0.5, opacity: 0 },
                {
                    scale: 1, opacity: 1, duration: 1.6, ease: "elastic.out(1, 0.75)",
                    scrollTrigger: {
                        trigger: footerLogo,
                        start: "top 90%",
                        toggleActions: "play none none none"
                    }
                }
            );
        }

        // --- 4. Staggered Fade In for Social Icons ---
        if (socialIconsContainer && socialIcons.length) {
            gsap.fromTo(socialIcons,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
                    scrollTrigger: {
                        trigger: socialIconsContainer,
                        start: "top 90%",
                        toggleActions: "play none none none"
                    }
                }
            );
        }
    };

    // Start the entire process
    loadFooter();
});