// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu immediately
    initializeMobileMenu();
    
    function initializeMobileMenu() {
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        const navMenu = document.querySelector('.nav-menu');
        const menuOverlay = document.querySelector('.menu-overlay');
        const themeToggleContainer = document.querySelector('.theme-toggle-container');
        
        // Toggle mobile menu when hamburger is clicked
        if (hamburgerMenu) {
            hamburgerMenu.addEventListener('click', function() {
                this.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                if (menuOverlay) {
                    menuOverlay.classList.toggle('active');
                }
                
                // Move theme toggle to the top of the menu when it opens on mobile
                if (window.innerWidth <= 768) {
                    if (navMenu.classList.contains('active') && themeToggleContainer) {
                        // Move the toggle to the top of the menu
                        navMenu.prepend(themeToggleContainer);
                    }
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
            
            // Move theme toggle to original position when in desktop mode
            if (window.innerWidth > 768) {
                const liItem = themeToggleContainer.parentElement;
                if (liItem.tagName !== 'LI') {
                    // Find the last li in the menu
                    const lastLi = navMenu.querySelector('li:last-child');
                    if (lastLi && !lastLi.contains(themeToggleContainer)) {
                        lastLi.appendChild(themeToggleContainer);
                    }
                }
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