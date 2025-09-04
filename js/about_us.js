// This file is for any interactivity on the page.
// For now, it is empty as the current design section does not require it.

document.addEventListener('DOMContentLoaded', () => {

    /**
     * Animates a number counting from a start value to an end value.
     * @param {HTMLElement} element - The HTML element whose text will be updated.
     * @param {number} start - The starting number.
     * @param {number} end - The final number.
     * @param {number} duration - The duration of the animation in milliseconds.
     * @param {string} finalText - The original text to display at the end (e.g., "10+", "70+").
     */
    const animateNumber = (element, start, end, duration, finalText) => {
        let startTime = null;

        // The function that runs on each animation frame
        const step = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);

            // Display the current value during animation
            element.innerText = currentValue;

            // If the animation is not complete, request the next frame
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // Once complete, set the final text to include any original characters like '+'
                element.innerText = finalText;
            }
        };

        // Start the animation
        window.requestAnimationFrame(step);
    };

    // Select all the feature cards to be animated
    const featureCards = document.querySelectorAll('.feature-card-fa01');

    // Configuration for the Intersection Observer
    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.2 // trigger when 20% of the element is visible for better effect
    };

    // Callback function to execute when a card enters the viewport
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // If the element is intersecting (visible)
            if (entry.isIntersecting) {
                // Add the 'visible' class to trigger the CSS transition for the card
                entry.target.classList.add('visible-fa01');

                // --- Number Animation Logic ---
                const statElement = entry.target.querySelector('.feature-stat-fa01');
                if (statElement) {
                    const finalText = statElement.innerText;
                    // Extracts the integer from the text (e.g., 40 from "40+")
                    const targetNumber = parseInt(finalText, 10);

                    if (!isNaN(targetNumber)) {
                        // Start the number increment animation
                        animateNumber(statElement, 0, targetNumber, 1000, finalText);
                    }
                }
                
                // Stop observing the element after the animation has been triggered
                observer.unobserve(entry.target);
            }
        });
    };

    // Create a new Intersection Observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Tell the observer to watch each of the feature cards
    featureCards.forEach(card => {
        observer.observe(card);
    });

});



/**
 * =====================================================================
 * Intersection Observer for Fade-in Animation on Scroll
 * =====================================================================
 * This script adds a 'is-visible' class to elements with the class
 * 'wcu-feature-card' when they enter the viewport.
 */

document.addEventListener("DOMContentLoaded", function() {

    // Select all the elements you want to animate
    const featureCards = document.querySelectorAll('.wcu-feature-card');

    // Set up the Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the element is in the viewport
            if (entry.isIntersecting) {
                // Add the animation class
                entry.target.classList.add('is-visible');
                // Optional: Stop observing the element after it has become visible
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Observe each feature card
    featureCards.forEach(card => {
        observer.observe(card);
    });
});