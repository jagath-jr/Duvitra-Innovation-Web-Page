// Counter animation function
        function animateCounter(element, endValue, duration) {
            let startTime = null;
            const startValue = 0;
            
            function animate(timestamp) {
                if (!startTime) startTime = timestamp;
                const progress = timestamp - startTime;
                
                // Calculate the current count based on time elapsed
                const progressFraction = Math.min(progress / duration, 1);
                const currentValue = Math.floor(progressFraction * endValue);
                
                // Update the element text (keep the + sign)
                element.textContent = currentValue + '+';
                
                // Continue the animation until the duration is reached
                if (progress < duration) {
                    requestAnimationFrame(animate);
                }
            }
            
            requestAnimationFrame(animate);
        }

        // Intersection Observer to trigger animation when section is visible
        function setupCounters() {
            const statsSection = document.getElementById('statsSection');
            const counters = document.querySelectorAll('.stat-number');
            let countersAnimated = false;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !countersAnimated) {
                        countersAnimated = true;
                        
                        counters.forEach(counter => {
                            const endValue = parseInt(counter.getAttribute('data-end'));
                            const duration = parseInt(counter.getAttribute('data-duration'));
                            animateCounter(counter, endValue, duration);
                        });
                    }
                });
            }, { threshold: 0.5 }); // Trigger when 50% of section is visible
            
            observer.observe(statsSection);
        }

        // Initialize when page loads
        window.addEventListener('DOMContentLoaded', setupCounters);



document.addEventListener('DOMContentLoaded', () => {
    // Example: Log a message to the console when the page is loaded.
    console.log('Page loaded and script is running.');

    // You could add animations to the offering items on scroll, for example.
});



// =====================================================================
// script.js
// For this specific logo slider component, all the animation and
// interactivity is handled purely by CSS. This JavaScript file is
// included to follow the project structure you requested.
//
// You could use this file for more advanced features in the future,
// such as:
//  - Dynamically loading logos from an API.
//  - Pausing the slider when the browser tab is not visible using
//    the Page Visibility API.
//  - Adjusting animation speed based on user interaction.
// =====================================================================

// Optimized version with performance enhancements
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.logo-slider-2025');
    const slideTrack = document.querySelector('.logos-slide-2025');
    
    // Clone logos for infinite effect (alternative to HTML duplication)
    if (!slideTrack.querySelector('[data-cloned]')) {
        const logos = slideTrack.innerHTML;
        slideTrack.innerHTML = logos + logos;
        slideTrack.querySelectorAll('img').forEach((img, index) => {
            if (index >= 8) img.setAttribute('data-cloned', 'true');
        });
    }
    
    // Pause animation when tab is not visible
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            slideTrack.style.animationPlayState = 'paused';
        } else {
            slideTrack.style.animationPlayState = 'running';
        }
    });
    
    // Force hardware acceleration for smoother animation
    slideTrack.style.transform = 'translateZ(0)';
});

// This file is ready for any custom JavaScript.
// For example, you could add animations that trigger on scroll,
// or interactive elements for the service boxes.

document.addEventListener('DOMContentLoaded', () => {
    // Your future JavaScript code goes here.
    console.log("Main content script loaded.");
});



// script.js

// This script is ready for any future interactivity you might want to add.
// For example, you could add logic for a filter, a popup modal with more
// product details, or animations that trigger on scroll.

document.addEventListener('DOMContentLoaded', () => {
    console.log("Products section loaded. JS is ready.");

    // Example: Add a click listener to each card
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').innerText;
            // In a real application, you might open a modal or navigate to a product page.
            // For now, we'll just log to the console.
            console.log(`You clicked on the ${title} card.`);
        });
    });
});




// This file is ready for any future JavaScript interactivity.
// For example, you could add:
// - A slider for the testimonials on mobile.
// - "Read more" functionality for longer reviews.
// - Animations on scroll.

document.addEventListener('DOMContentLoaded', () => {
    console.log('Testimonials page loaded and ready.');
});
