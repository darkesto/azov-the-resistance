// Sound system using Web Audio API
class SoundSystem {
    constructor() {
        this.initialized = false;
        this.sounds = {};
    }

    init() {
        if (this.initialized) return;

        try {
            // Create audio objects for each sound
            this.sounds = {
                shoot: new Audio('sounds/gun-blast-F.wav'),
                enemyShoot: new Audio('sounds/gun-blast-A.wav'),
                powerUp: new Audio('sounds/power-up.wav'),
                hit: new Audio('sounds/hit.wav'),
                explosion: new Audio('sounds/bomb-explosion.wav'),
                tankDestroyed: new Audio('sounds/big-explosion.wav'),
                enemyDeath1: new Audio('sounds/shout-17.wav'),
                enemyDeath2: new Audio('sounds/shout-18.wav'),
                enemyDeath3: new Audio('sounds/shout-26.wav'),
                gameOver: new Audio('sounds/game-over.wav')
            };

            // Set volume for all sounds
            Object.values(this.sounds).forEach(sound => {
                sound.volume = 0.5;
            });

            this.initialized = true;
            console.log('Sound system initialized successfully');
        } catch (error) {
            console.error('Failed to initialize sound system:', error);
            this.initialized = false;
        }
    }

    playSound(type) {
        if (!this.initialized) this.init();
        if (this.sounds[type]) {
            try {
                // Clone the audio to allow overlapping sounds
                const sound = this.sounds[type].cloneNode();
                sound.volume = this.sounds[type].volume;
                sound.play();
                console.log(`Playing sound: ${type}`);
            } catch (error) {
                console.error(`Error playing sound ${type}:`, error);
            }
        } else {
            console.warn(`Sound not found: ${type}`);
        }
    }
}

// Create global sound system
const soundSystem = new SoundSystem();

// Initialize on first user interaction
document.addEventListener('click', () => {
    console.log('First click detected, initializing sound system...');
    try {
        soundSystem.init();
    } catch (error) {
        console.error('Failed to initialize sound system on click:', error);
    }
}, { once: true });

// Export for game.js
window.soundSystem = soundSystem; 