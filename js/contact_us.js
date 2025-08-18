document.addEventListener('DOMContentLoaded', function() {
    // Get all tab buttons and tab content elements
    const tabButtons = document.querySelectorAll('.tab-btn-unique');
    const tabContents = document.querySelectorAll('.tab-content-unique');

    // Add click event listener to each tab button
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the target tab content ID from the data-tab attribute
            const targetTab = button.getAttribute('data-tab');

            // Remove 'active' class from all tab buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add 'active' class to the clicked button
            button.classList.add('active');

            // Add 'active' class to the corresponding tab content
            document.getElementById(targetTab).classList.add('active');
        });
    });


    
});
