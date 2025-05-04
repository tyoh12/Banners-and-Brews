// Theme toggling functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        // Check for saved theme preference or use device preference
        const savedTheme = localStorage.getItem('theme') || 
            (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
        
        // Apply the saved theme
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Add toggle event listener
        themeToggle.addEventListener('click', function() {
            // Toggle between dark and light
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Update theme
            document.documentElement.setAttribute('data-theme', newTheme);
            
            // Save preference
            localStorage.setItem('theme', newTheme);
            
            // Add animation for smooth transition
            document.body.classList.add('theme-transition');
            setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, 1000);
        });
    }
    
    // Add animation to theme icon
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(45deg)';
        });
        
        themeIcon.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0deg)';
        });
    }
});