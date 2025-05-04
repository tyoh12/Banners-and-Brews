// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu immediately
    initializeMobileMenu();
    
    function initializeMobileMenu() {
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        const navMenu = document.querySelector('.nav-menu');
        const menuOverlay = document.querySelector('.menu-overlay');
        
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
            if (!link.closest('.theme-toggle-container')) { // Skip the theme toggle
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
        
        // Prevent theme toggle from closing the menu
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', function(e) {
                // Stop event from closing the menu
                e.stopPropagation();
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
            }
        });
        
        // Manually check for mobile view on load
        if (window.innerWidth <= 768) {
            // Make sure hamburger menu appears
            if (hamburgerMenu) {
                hamburgerMenu.style.display = 'flex';
            }
        }
    }
});