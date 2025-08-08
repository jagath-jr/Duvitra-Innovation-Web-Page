/* === Show or Hide Mobile Menu === */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    // Toggles the 'active' class on the menu to show/hide it
    navMenu.classList.toggle('active');

    // Toggles the 'active' class on the button to animate the icon
    navToggle.classList.toggle('active');
  });
}