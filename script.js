// House names array
const houses = [
    "Rat", "Worm", "Toad", "Newt", "Beetle", "Weasel", "Slug", "Bat", 
    "Lion", "Wolf", "Stag", "Bear", "Boar", "Owl", "Eagle", "Panther", 
    "Dragon", "Griffin", "Hydra", "Kraken", "Pegasus", "Jackalope", 
    "Minotaur", "Phoenix"
];

// 2024 Champions Data (update with actual names)
const champions2024 = {
    gold: {
        name: "Bjorn Ironforge",
        house: "House Bear",
        crest: "🐻",
        title: "Grand Champion of the Realm"
    },
    silver: {
        name: "Sasha Moonwhisper",
        house: "House Wolf",
        crest: "🐺",
        title: "High Contender and Defender"
    },
    bronze: {
        name: "Tormund Stormclaw",
        house: "House Eagle",
        crest: "🦅",
        title: "Honorable Warrior"
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to house cards
    const houseCards = document.querySelectorAll('.house-card');
    
    houseCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add animation effect when clicked
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    // Populate Hall of Honor with 2024 champions
    updateHallOfHonor();
    
    // Add smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add dramatic scroll animations
    addScrollAnimations();
});

// Function to update Hall of Honor with champion data
function updateHallOfHonor() {
    const champions = document.querySelectorAll('.champion');
    const types = ['gold', 'silver', 'bronze'];
    
    champions.forEach((champion, index) => {
        const type = types[index];
        const data = champions2024[type];
        
        if (data) {
            const crest = champion.querySelector('.crest');
            const title = champion.querySelector('h3');
            const house = champion.querySelector('h4');
            const name = champion.querySelector('p');
            
            if (crest) crest.textContent = data.crest;
            if (title) title.textContent = data.title;
            if (house) house.textContent = data.house;
            if (name) name.textContent = data.name + " - MMXXIV";
        }
    });
}

// Function to add scroll animations
function addScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });
    
    // Add special animation for champion cards
    document.querySelectorAll('.champion').forEach((champion, index) => {
        champion.style.opacity = '0';
        champion.style.transform = 'scale(0.9)';
        champion.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;
        observer.observe(champion);
    });
}

// Function to randomly select a house
function drawRandomHouse() {
    const randomIndex = Math.floor(Math.random() * houses.length);
    return houses[randomIndex];
}

// Console message
console.log("⚔️ By Royal Decree - Banners and Brews Tournament Loading ⚔️");