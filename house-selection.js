// House data with names, crests, and descriptions
const houseData = {
    "Rat": { crest: "🐀", description: "Cunning and resourceful, the House of Rat thrives in shadows and cleverness." },
    "Worm": { crest: "🪱", description: "Silent and persistent, House Worm shows strength through transformation." },
    "Toad": { crest: "🐸", description: "Patient and wise, House Toad strikes swiftly when the moment is right." },
    "Newt": { crest: "🦎", description: "Adaptable and regenerative, House Newt overcomes all through resilience." },
    "Beetle": { crest: "🪲", description: "Armored and tenacious, House Beetle endures through strength and patience." },
    "Weasel": { crest: "🦦", description: "Quick and strategic, House Weasel outmaneuvers foes with wit and speed." },
    "Slug": { crest: "🐌", description: "Slow and steady, House Slug leaves a lasting mark on the world." },
    "Bat": { crest: "🦇", description: "Nocturnal and perceptive, House Bat sees truth where others see darkness." },
    "Lion": { crest: "🦁", description: "Brave and noble, House Lion leads with courage and fierce determination." },
    "Wolf": { crest: "🐺", description: "Loyal and cunning, House Wolf hunts in packs and never abandons its own." },
    "Stag": { crest: "🦌", description: "Proud and graceful, House Stag stands tall with majesty and wisdom." },
    "Bear": { crest: "🐻", description: "Mighty and protective, House Bear guards its domain with unwavering strength." },
    "Boar": { crest: "🐗", description: "Fierce and tenacious, House Boar charges fearlessly into any challenge." },
    "Owl": { crest: "🦉", description: "Wise and watchful, House Owl observes all and judges with perfect clarity." },
    "Eagle": { crest: "🦅", description: "Soaring and majestic, House Eagle achieves greatness through vision and power." },
    "Panther": { crest: "🐆", description: "Stealthy and powerful, House Panther strikes with precision and grace." },
    "Dragon": { crest: "🐉", description: "Legendary and formidable, House Dragon commands respect through ancient might." },
    "Griffin": { crest: "🦁", description: "Mythical and regal, House Griffin combines the best of earth and sky." },
    "Hydra": { crest: "🐍", description: "Resilient and regenerative, House Hydra grows stronger with each challenge." },
    "Kraken": { crest: "🦑", description: "Mysterious and powerful, House Kraken rules the depths with ancient wisdom." },
    "Pegasus": { crest: "🦄", description: "Ethereal and swift, House Pegasus transcends earthly bounds with grace." },
    "Jackalope": { crest: "🐰", description: "Mythical and elusive, House Jackalope thrives through legend and lore." },
    "Minotaur": { crest: "🐂", description: "Powerful and enigmatic, House Minotaur guards ancient secrets and strength." },
    "Phoenix": { crest: "🔥", description: "Immortal and radiant, House Phoenix rises anew from every challenge." }
};

document.addEventListener('DOMContentLoaded', function() {
    const drawButton = document.getElementById('drawHouseBtn');
    const houseCrest = document.getElementById('houseCrest');
    const houseName = document.getElementById('houseName');
    const houseDescription = document.getElementById('houseDescription');

    // Draw house button click handler
    drawButton.addEventListener('click', function() {
        // Disable button during animation
        drawButton.disabled = true;
        drawButton.textContent = 'Consulting the Fates...';
        
        // Add spinning animation
        houseCrest.style.transform = 'rotate(0deg)';
        houseCrest.style.transition = 'transform 2s ease-in-out';
        
        setTimeout(() => {
            houseCrest.style.transform = 'rotate(1440deg)'; // 4 full rotations
        }, 50);
        
        // Wait for animation to complete
        setTimeout(() => {
            // Get all house names
            const houses = Object.keys(houseData);
            
            // Randomly select a house
            const randomIndex = Math.floor(Math.random() * houses.length);
            const selectedHouse = houses[randomIndex];
            const selectedData = houseData[selectedHouse];
            
            // Update display
            houseCrest.textContent = selectedData.crest;
            houseName.textContent = `House ${selectedHouse}`;
            houseDescription.textContent = selectedData.description;
            
            // Reset button
            drawButton.disabled = false;
            drawButton.textContent = 'Draw Another House';
            
            // Add victory animation
            houseCrest.style.transform = 'scale(1)';
            houseCrest.style.transition = 'transform 0.5s ease';
            setTimeout(() => {
                houseCrest.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    houseCrest.style.transform = 'scale(1)';
                }, 300);
            }, 100);
        }, 2000);
    });
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