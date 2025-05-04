// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Don't initialize mobile menu functionality until theme.js has run
    // This ensures theme toggle is fully initialized before we add mobile functionality
    setTimeout(initializeMobileMenu, 100);
    
    function initializeMobileMenu() {
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        const navMenu = document.querySelector('.nav-menu');
        const menuOverlay = document.querySelector('.menu-overlay');
        const themeToggle = document.getElementById('themeToggle');
        
        // Save the original position of the theme toggle container
        const themeToggleContainer = document.querySelector('.theme-toggle-container');
        const originalParent = themeToggleContainer ? themeToggleContainer.parentNode : null;
        
        // Toggle mobile menu when hamburger is clicked
        if (hamburgerMenu) {
            hamburgerMenu.addEventListener('click', function() {
                this.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                if (menuOverlay) {
                    menuOverlay.classList.toggle('active');
                }
                
                // Prevent scrolling when menu is open
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });
        }
        
        // Close menu when overlay is clicked
        if (menuOverlay) {
            menuOverlay.addEventListener('click', function() {
                if (hamburgerMenu) hamburgerMenu.classList.remove('active');
                if (navMenu) navMenu.classList.remove('active');
                this.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // Close menu when a nav link is clicked
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            if (link.parentNode !== themeToggleContainer) { // Skip the theme toggle
                link.addEventListener('click', function() {
                    if (hamburgerMenu) hamburgerMenu.classList.remove('active');
                    if (navMenu) navMenu.classList.remove('active');
                    
                    if (menuOverlay) {
                        menuOverlay.classList.remove('active');
                    }
                    
                    document.body.style.overflow = '';
                });
            }
        });
        
        // Ensure theme toggle still works in mobile menu
        if (themeToggle) {
            // Make sure any existing click events still work by not overriding them
            // Just ensure the menu stays open when theme is toggled
            const originalClickEvent = themeToggle.onclick;
            
            themeToggle.addEventListener('click', function(e) {
                // Stop event from closing the menu
                e.stopPropagation();
                
                // Menu should stay open when toggling the theme
                // Don't do anything with the menu here
            });
        }
        
        // Handle window resize - reset mobile menu if window is resized to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
                if (hamburgerMenu) hamburgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
                
                if (menuOverlay) {
                    menuOverlay.classList.remove('active');
                }
                
                document.body.style.overflow = '';
                
                // Ensure theme toggle is in the right place when switching back to desktop
                if (originalParent && themeToggleContainer && window.innerWidth > 768) {
                    originalParent.appendChild(themeToggleContainer);
                }
            }
        });
    }
});