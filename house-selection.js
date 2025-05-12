// Add debug logs to verify script loading
console.log("🏠 House Selection script loaded!");

// House Selection functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log("🏠 DOM Content Loaded event fired in house-selection.js");
    
    // Make sure navigation is working properly
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    console.log("Current page:", currentPage);
    
    // Remove all active classes first - with null checks
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Set active class for house selection - with null checks
    if (currentPage.includes('house-selection.html')) {
        const navElement = document.getElementById('navHouseSelection');
        console.log("Navigation element found:", navElement ? true : false);
        if (navElement) {
            navElement.classList.add('active');
        }
    }
    
    // Ensure theme toggle is working
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', savedTheme);
    console.log("Theme set to:", savedTheme);
    
    // Make sure the theme icons are properly set
    if (window.themeToggleInit && typeof window.themeToggleInit.updateThemeIcons === 'function') {
        window.themeToggleInit.updateThemeIcons(savedTheme);
        console.log("Theme icons updated successfully");
    } else {
        console.log("Warning: themeToggleInit not available:", window.themeToggleInit);
    }
    
    // House names array (same as in script.js)
    const houses = [
        "Rat", "Worm", "Toad", "Newt", "Beetle", "Weasel", "Slug", "Bat", 
        "Lion", "Wolf", "Stag", "Bear", "Boar", "Owl", "Eagle", "Panther", 
        "Dragon", "Griffin", "Hydra", "Kraken", "Pegasus", "Jackalope", 
        "Minotaur", "Phoenix"
    ];
    
    // House descriptions with thematic flavor
    const houseDescriptions = {
        "Rat": "Swift and cunning, House Rat warriors employ stealth and agility to outmaneuver their foes.",
        "Worm": "Though humble in appearance, House Worm's persistence and adaptability make them formidable opponents.",
        "Toad": "Amphibious and resilient, House Toad warriors are deceptively powerful and quick to action.",
        "Newt": "Regenerative and nimble, House Newt excels in recovery and swift tactical adjustments.",
        "Beetle": "Protected by natural armor, House Beetle's steadfast endurance outlasts all opposition.",
        "Weasel": "Quick-witted and relentless, House Weasel warriors are known for their cunning strategies.",
        "Slug": "Slow but methodical, House Slug leaves a trail of victory through patience and determination.",
        "Bat": "Masters of the darkness, House Bat uses heightened senses to navigate where others falter.",
        "Lion": "Majestic and powerful, House Lion leads with courage and commands respect in battle.",
        "Wolf": "Pack-minded and loyal, House Wolf's strength comes from coordination and teamwork.",
        "Stag": "Proud and noble, House Stag stands tall with dignity and unwavering resolve.",
        "Bear": "Mighty and imposing, House Bear's raw strength crushes opposition with overwhelming force.",
        "Boar": "Fierce and unyielding, House Boar charges forward with unstoppable determination.",
        "Owl": "Wise and observant, House Owl's tactical insight provides the edge in any contest.",
        "Eagle": "Sharp-eyed and precise, House Eagle strikes with deadly accuracy from advantageous positions.",
        "Panther": "Sleek and powerful, House Panther combines grace with lethal efficiency.",
        "Dragon": "Ancient and feared, House Dragon harnesses primordial power to dominate all challenges.",
        "Griffin": "Majestic hybrid, House Griffin unites the best qualities of eagle and lion in perfect harmony.",
        "Hydra": "Resilient and multi-faceted, House Hydra grows stronger with each challenge faced.",
        "Kraken": "Mysterious and all-encompassing, House Kraken's reach extends to all corners of the battlefield.",
        "Pegasus": "Swift and ethereal, House Pegasus transcends normal boundaries with grace and speed.",
        "Jackalope": "Elusive and mythical, House Jackalope combines unlikely traits into surprising strength.",
        "Minotaur": "Powerful and imposing, House Minotaur's raw strength is matched only by its strategic mind.",
        "Phoenix": "Eternally reborn, House Phoenix rises from defeat with renewed vigor and unstoppable spirit."
    };
    
    // House crests (image paths)
    const houseCrests = {
        "Rat": "images/rat.jpeg",
        "Worm": "images/worm.jpeg",
        "Toad": "images/toad.jpeg",
        "Newt": "images/newt.jpeg",
        "Beetle": "images/beetle.jpeg",
        "Weasel": "images/weasel.jpeg",
        "Slug": "images/slug.jpeg",
        "Bat": "images/bat.jpeg",
        "Lion": "images/Lion.jpg",
        "Wolf": "images/wolf1.jpg",
        "Stag": "images/Stag1.jpg",
        "Bear": "images/Bear1.jpg",
        "Boar": "images/Boar1.jpg",
        "Owl": "images/Owl2.jpg",
        "Eagle": "images/Eagle2.jpg",
        "Panther": "images/panther2.jpg",
        "Dragon": "images/dragon5.jpg",
        "Griffin": "images/griffin.jpg",
        "Hydra": "images/hydra.jpg",
        "Kraken": "images/kraken.jpg",
        "Pegasus": "images/pegasus.jpg",
        "Jackalope": "images/jkrabbit.jpg",
        "Minotaur": "images/minotaur.jpg",
        "Phoenix": "images/phoenix.jpg"
    };
    
    // Get DOM elements
    const drawButton = document.getElementById('drawHouseBtn');
    const houseName = document.getElementById('houseName');
    const houseCrest = document.getElementById('houseCrest');
    const houseDescription = document.getElementById('houseDescription');
    
    // Log elements to verify they're found
    console.log("Draw button found:", drawButton ? true : false);
    console.log("House name element found:", houseName ? true : false);
    console.log("House crest element found:", houseCrest ? true : false);
    console.log("House description element found:", houseDescription ? true : false);
    
    // Add event listener to the draw button
    if (drawButton) {
        console.log("Adding click event listener to draw button");
        drawButton.addEventListener('click', function() {
            console.log("Draw button clicked!");
            
            // Add button click animation
            this.classList.add('clicking');
            setTimeout(() => {
                this.classList.remove('clicking');
            }, 300);
            
            // Start the selection animation
            selectHouse();
        });
    } else {
        console.error("Draw button not found in the DOM!");
    }
    
    // Function to select a random house with animation
    function selectHouse() {
        console.log("selectHouse function called");
        
        // Check if all required elements exist
        if (!drawButton || !houseName || !houseCrest || !houseDescription) {
            console.error("Missing required DOM elements for house selection!");
            return;
        }
        
        // Disable the button during animation
        drawButton.disabled = true;
        
        // Start with rapid shuffling animation
        let shuffleCount = 0;
        const maxShuffles = 20;
        console.log("Starting shuffle animation with", maxShuffles, "iterations");
        
        // Create image element if it doesn't exist yet
        let crestImg = houseCrest.querySelector('img');
        if (!crestImg) {
            crestImg = document.createElement('img');
            houseCrest.innerHTML = '';
            houseCrest.appendChild(crestImg);
            crestImg.alt = 'House Crest';
            crestImg.style.opacity = '0.8';
        }
        
        const shuffleInterval = setInterval(() => {
            // Pick a random house for the animation
            const randomIndex = Math.floor(Math.random() * houses.length);
            const randomHouse = houses[randomIndex];
            
            // Update display during animation
            houseName.textContent = randomHouse;
            crestImg.src = houseCrests[randomHouse] || 'images/house-selection.jpg';
            
            // Speed up and then slow down the animation
            shuffleCount++;
            
            // End the shuffling animation
            if (shuffleCount >= maxShuffles) {
                console.log("Shuffle animation complete");
                clearInterval(shuffleInterval);
                
                // Select the final house
                const finalHouse = drawRandomHouse();
                console.log("Selected final house:", finalHouse);
                
                // Add dramatic pause before revealing final result
                setTimeout(() => {
                    // Reveal the final house with fanfare
                    revealFinalHouse(finalHouse);
                }, 500);
            }
        }, 100);
    }
    
    // Function to randomly select a house
    function drawRandomHouse() {
        const randomIndex = Math.floor(Math.random() * houses.length);
        return houses[randomIndex];
    }
    
    // Function to reveal the final selected house
    function revealFinalHouse(house) {
        console.log("Revealing final house:", house);
        
        // Check if all required elements exist
        if (!houseName || !houseCrest || !houseDescription) {
            console.error("Missing required DOM elements for revealing house!");
            return;
        }
        
        // Add dramatic reveal animation
        houseName.style.transform = "scale(0.8)";
        houseCrest.style.transform = "scale(0.8)";
        
        // Add a background flash effect to the selection box
        const selectionBox = document.querySelector('.selection-box');
        if (selectionBox) {
            selectionBox.style.boxShadow = "0 0 30px var(--text-heading)";
        }
        
        setTimeout(() => {
            // Update with final house information
            houseName.textContent = "House " + house;
            
            // Create or update image element for house crest
            let crestImg = houseCrest.querySelector('img');
            if (!crestImg) {
                // If no image exists yet, create one
                crestImg = document.createElement('img');
                houseCrest.innerHTML = '';
                houseCrest.appendChild(crestImg);
            }
            
            // Set the image source
            crestImg.src = houseCrests[house] || 'images/house-selection.jpg';
            crestImg.alt = 'House ' + house + ' Crest';
            
            houseDescription.textContent = houseDescriptions[house] || 
                "A noble house with a storied history and unique strengths.";
            
            console.log("Updated DOM with house information");
            
            // Add reveal animation
            houseName.style.transform = "scale(1.2)";
            houseCrest.style.transform = "scale(1.2)";
            houseName.classList.add('revealed');
            
            // Return selection box to normal
            setTimeout(() => {
                if (selectionBox) {
                    selectionBox.style.boxShadow = "";
                }
            }, 1000);
            
            setTimeout(() => {
                houseName.style.transform = "scale(1)";
                houseCrest.style.transform = "scale(1)";
                
                // Re-enable the button
                drawButton.disabled = false;
                drawButton.textContent = "Draw Again!";
                console.log("Draw button re-enabled");
            }, 300);
        }, 200);
    }
    
    // Add CSS for the button click animation and house selection effects
    const style = document.createElement('style');
    style.textContent = `
        .clicking {
            transform: scale(0.95) !important;
        }
        
        #houseCrest, #houseName {
            transition: transform 0.3s ease;
        }
        
        .selected-house-display {
            transition: all 0.5s ease;
        }
        
        #houseCrest {
            display: inline-block;
            margin-bottom: 1rem;
            animation: pulse 3s infinite ease-in-out;
        }
        
        #houseCrest img {
            width: 180px;
            height: 180px;
            object-fit: cover;
            border-radius: 50%;
            border: 3px solid var(--text-heading);
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        #houseName {
            position: relative;
        }
        
        #houseName::after {
            content: "";
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 2px;
            background-color: var(--text-heading);
            transition: width 0.5s ease;
        }
        
        #houseName.revealed::after {
            width: 80%;
        }
    `;
    
    document.head.appendChild(style);
    console.log("Added custom styles to head");
    
    // Add fallback if house-selection.html doesn't contain the expected elements
    if (!drawButton || !houseName || !houseCrest || !houseDescription) {
        console.error("Critical elements missing from house-selection.html!");
        
        // Try to add a warning to the page
        const container = document.querySelector('.container');
        if (container) {
            const warning = document.createElement('div');
            warning.style.cssText = "background-color: #f44336; color: white; padding: 15px; margin: 20px 0; border-radius: 5px;";
            warning.innerHTML = "<strong>Warning:</strong> House selection functionality could not initialize properly. Please check the console for more information.";
            container.prepend(warning);
            console.log("Added warning message to the page");
        }
    }
});

// Add fallback to handle errors
window.addEventListener('error', function(event) {
    console.error("Caught error:", event.message);
    
    // Try to add a warning to the page
    const container = document.querySelector('.container');
    if (container) {
        const warning = document.createElement('div');
        warning.style.cssText = "background-color: #f44336; color: white; padding: 15px; margin: 20px 0; border-radius: 5px;";
        warning.innerHTML = "<strong>Error:</strong> " + event.message;
        container.prepend(warning);
    }
});