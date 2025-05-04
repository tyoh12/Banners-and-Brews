// Theme toggling functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        // Check for saved theme preference or use device preference
        const savedTheme = localStorage.getItem('theme') || 
            (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
        
        // Apply the saved theme
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Update icon visibility based on current theme
        updateThemeIcons(savedTheme);
        
        // Add toggle event listener
        themeToggle.addEventListener('click', function(e) {
            // Stop event propagation to prevent mobile menu from closing
            e.stopPropagation();
            
            // Toggle between dark and light
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Update theme
            document.documentElement.setAttribute('data-theme', newTheme);
            
            // Update icon visibility
            updateThemeIcons(newTheme);
            
            // Save preference
            localStorage.setItem('theme', newTheme);
            
            // Add animation for smooth transition
            document.body.classList.add('theme-transition');
            setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, 1000);
        });
    }
    
    // Function to correctly update icon visibility based on theme
    function updateThemeIcons(theme) {
        const darkIcon = document.querySelector('.dark-icon');
        const lightIcon = document.querySelector('.light-icon');
        
        if (darkIcon && lightIcon) {
            if (theme === 'dark') {
                // In dark mode, show the sun (to switch to light)
                darkIcon.style.cssText = 'opacity: 1;';
                lightIcon.style.cssText = 'opacity: 0;';
            } else {
                // In light mode, show the moon (to switch to dark)
                darkIcon.style.cssText = 'opacity: 0;';
                lightIcon.style.cssText = 'opacity: 1;';
            }
        }
    }
    
    // Add animation to theme icon
    const themeIcons = document.querySelectorAll('.theme-icon');
    themeIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(45deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Make theme toggle available globally for other scripts
    window.themeToggleInit = {
        updateThemeIcons: updateThemeIcons
    };
});