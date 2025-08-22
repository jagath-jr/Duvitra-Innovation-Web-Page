// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    // Add a click event listener to each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the filter value from the data-filter attribute
            const filterValue = button.getAttribute('data-filter');

            // --- Step 1: Update the active state on buttons ---
            // Remove 'active' class from the currently active button
            document.querySelector('.filter-btn.active').classList.remove('active');
            // Add 'active' class to the clicked button
            button.classList.add('active');

            // --- Step 2: Filter the portfolio cards ---
            portfolioCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                // If the filter is 'all' or the card's category matches the filter
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'block'; // Show the card
                } else {
                    card.style.display = 'none'; // Hide the card
                }
            });
        });
    });
});