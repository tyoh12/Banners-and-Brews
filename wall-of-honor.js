document.addEventListener('DOMContentLoaded', function() {
    // Year selection functionality
    const yearButtons = document.querySelectorAll('.year-btn');
    const resultSections = document.querySelectorAll('.tournament-results');
    
    yearButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Skip if button is disabled or already active
            if (this.disabled || this.classList.contains('active')) return;
            
            // Update active button
            yearButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding results section
            const yearToShow = this.getAttribute('data-year');
            resultSections.forEach(section => {
                if (section.id === `results-${yearToShow}`) {
                    section.style.display = 'block';
                    
                    // Add entrance animation
                    section.classList.add('fade-in');
                    setTimeout(() => {
                        section.classList.remove('fade-in');
                    }, 1000);
                } else {
                    section.style.display = 'none';
                }
            });
            
            // Scroll to results
            document.getElementById(`results-${yearToShow}`).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    // Accordion functionality for game results
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        
        header.addEventListener('click', function() {
            // Toggle active class
            this.classList.toggle('active');
            
            // Toggle content visibility
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
    
    // Open the first accordion by default
    if (accordionItems.length > 0) {
        const firstHeader = accordionItems[0].querySelector('.accordion-header');
        const firstContent = accordionItems[0].querySelector('.accordion-content');
        
        firstHeader.classList.add('active');
        firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
    }
    
    // Add hover effects to tables
    const tableCells = document.querySelectorAll('.game-table td, .rankings-table td');
    
    tableCells.forEach(cell => {
        cell.addEventListener('mouseenter', function() {
            const row = this.parentElement;
            row.classList.add('highlight-row');
        });
        
        cell.addEventListener('mouseleave', function() {
            const row = this.parentElement;
            row.classList.remove('highlight-row');
        });
    });
    
    // Add animation to the special mentions
    const mentionItems = document.querySelectorAll('.mentions-list li');
    
    mentionItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Add hover effects to navigation
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});