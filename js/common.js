// Updated JavaScript for scroll behavior
let lastScroll = 0;
const header = document.querySelector('.header-container');
const mobileMenu = document.querySelector('.navbar');
const headerHeight = header.offsetHeight;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= headerHeight) {
    // At top of page, always show header
    header.classList.remove('hide');
    return;
  }
  
  if (currentScroll > lastScroll) {
    // Scrolling down
    header.classList.add('hide');
    if (window.innerWidth <= 820) { // Only for mobile
      mobileMenu.classList.add('hide-on-scroll');
    }
  } else {
    // Scrolling up
    header.classList.remove('hide');
    if (window.innerWidth <= 820) { // Only for mobile
      mobileMenu.classList.remove('hide-on-scroll');
    }
  }
  
  lastScroll = currentScroll;
});

// Mobile menu toggle
const navMenu = document.querySelector('.navbar');
const navToggle = document.getElementById('nav-toggle');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // When mobile menu is open, prevent hiding on scroll
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('hide-on-scroll');
    }
  });
}

// Close mobile menu when clicking a link (optional)
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 820) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });
});