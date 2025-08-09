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

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const siteFooter = document.querySelector('.site-footer');

  const footerColumns = gsap.utils.toArray('.footer-column');
  const footerLogo = document.querySelector('.footer-logo');
  const socialIcons = document.querySelectorAll('.social-icons a');

  // --- 1. Fade In Background Text ---
  gsap.fromTo(backgroundText,
    { opacity: 0, y: 50 },
    {
      opacity: 0.2,
      y: 0,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: siteFooter,
        start: "top 80%", // Start animation when the top of the footer is 80% in view
        end: "bottom +=200", // End 200px after the bottom of the footer
        scrub: 0.5, // Smoothly link animation to scroll
      },
    }
  );

  // --- 2. Slide In Footer Columns ---
  footerColumns.forEach((column, index) => {
    const direction = index % 2 === 0 ? -50 : 50; // Alternate slide direction
    gsap.fromTo(column,
      { x: direction, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: column,
          start: "top 90%",
          end: "bottom +=100",
          toggleActions: "play none none reverse", // Animate in on enter, out on leave
        },
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
          trigger: footerLogo,
          start: "top 90%",
          end: "bottom +=50",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  // --- 4. Staggered Fade In for Social Icons ---
  gsap.fromTo(socialIcons,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 2,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: document.querySelector('.social-icons'), // Trigger on the parent container
        start: "top 90%",
        end: "bottom +=50",
        toggleActions: "play none none reverse",
      },
    }
  );
});