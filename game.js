const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 1000;
canvas.height = 800;

// Add this near the top of the file with other global variables
const backgroundImage = new Image();
backgroundImage.src = 'ua.svg';

// Ukraine regions data
const ukraineRegions = {
    volyn: {
        name: 'Volyn',
        waves: 4,
        isInDanger: false,
        isLiberated: false,
        neighbors: ['rivne', 'lviv'],
        gridX: 1,
        gridY: 0,
        terrain: 'woodlands',
        waterType: 'shallow'
    },
    rivne: {
        name: 'Rivne',
        waves: 4,
        isInDanger: false,
        isLiberated: false,
        neighbors: ['volyn', 'zhytomyr', 'khmelnytskyi', 'ternopil', 'lviv'],
        gridX: 2,
        gridY: 0,
        terrain: 'woodlands',
        waterType: 'shallow'
    },
    zhytomyr: {
        name: 'Zhytomyr',
        waves: 4,
        isInDanger: false,
        isLiberated: false,
        neighbors: ['rivne', 'kyiv', 'khmelnytskyi'],
        gridX: 3,
        gridY: 0,
        terrain: 'woodlands',
        waterType: 'none'
    },
    kyiv: {
        name: 'Kyiv',
        waves: 7,
        isInDanger: false,
        isLiberated: false,
        neighbors: ['zhytomyr', 'chernihiv', 'poltava', 'cherkasy'],
        gridX: 4,
        gridY: 0,
        terrain: 'urban',
        waterType: 'deep'
    },
    chernihiv: {
        name: 'Chernihiv',
        waves: 6,
        isInDanger: true,
        isLiberated: false,
        neighbors: ['kyiv', 'sumy'],
        gridX: 5,
        gridY: 0,
        terrain: 'woodlands',
        waterType: 'shallow'
    },
    lviv: {
        name: 'Lviv',
        waves: 5,
        isInDanger: false,
        isLiberated: false,
        neighbors: ['volyn', 'rivne', 'ternopil', 'ivano_frankivsk', 'zakarpattia'],
        gridX: 1,
        gridY: 1,
        terrain: 'rocky',
        waterType: 'none'
    },
    ternopil: {
        name: 'Ternopil',
        waves: 5,
        isInDanger: false,
        isLiberated: false,
        neighbors: ['lviv', 'khmelnytskyi', 'ivano_frankivsk'],
        gridX: 2,
        gridY: 1,
        terrain: 'woodlands',
        waterType: 'shallow'
    },
    khmelnytskyi: {
        name: 'Khmelnytskyi',
        waves: 5,
        isInDanger: false,
        isLiberated: false,
        neighbors: ['ternopil', 'zhytomyr', 'vinnytsia'],
        gridX: 3,
        gridY: 1,
        terrain: 'woodlands',
        waterType: 'shallow'
    },
    vinnytsia: {
        name: 'Vinnytsia',
        waves: 5,
        isInDanger: false,
        isLiberated: false,
        neighbors: ['khmelnytskyi', 'kropyvnytskyi', 'cherkasy'],
        gridX: 4,
        gridY: 1,
        terrain: 'woodlands',
        waterType: 'shallow'
    },
    sumy: {
        name: 'Sumy',
        waves: 5,
        isInDanger: true,
        isLiberated: false,
        neighbors: ['chernihiv', 'poltava', 'kharkiv'],
        gridX: 5,
        gridY: 1,
        terrain: 'woodlands',
        waterType: 'shallow'
    },
    zakarpattia: {
        name: 'Zakarpattia',
        waves: 5,
        isInDanger: false,
        isLiberated: false,
        neighbors: ['lviv', 'ivano_frankivsk'],
        gridX: 0,
        gridY: 1,
        terrain: 'rocky',
        waterType: 'none'
    },
    ivano_frankivsk: {
        name: 'Ivano-Frankivsk',
        waves: 6,
        isInDanger: false,
        isLiberated: false,
        neighbors: ['lviv', 'ternopil', 'chernivtsi', 'zakarpattia'],
        gridX: 1,
        gridY: 2,
        terrain: 'rocky',
        waterType: 'none'
    },
    chernivtsi: {
        name: 'Chernivtsi',
        waves: 4,
        isInDanger: false,
        isLiberated: false,
        neighbors: ['ivano_frankivsk'],
        gridX: 2,
        gridY: 2,
        terrain: 'rocky',
        waterType: 'none'
    },
    kropyvnytskyi: {
        name: 'Kropyvnytskyi',
        waves: 5,
        isInDanger: false,
        isLiberated: false,
        neighbors: ['vinnytsia', 'dnipropetrovsk', 'mykolaiv', 'cherkasy'],
        gridX: 3,
        gridY: 2,
        terrain: 'frontline',
        waterType: 'none'
    },
    cherkasy: {
        name: 'Cherkasy',
        waves: 5,
        isInDanger: false,
        isLiberated: false,
        neighbors: ['kyiv', 'vinnytsia', 'kropyvnytskyi', 'poltava'],
        gridX: 4,
        gridY: 2,
        terrain: 'woodlands',
        waterType: 'shallow'
    },
    poltava: {
        name: 'Poltava',
        waves: 6,
        isInDanger: false,
        isLiberated: false,
        neighbors: ['kyiv', 'sumy', 'kharkiv', 'dnipropetrovsk', 'cherkasy'],
        gridX: 5,
        gridY: 2,
        terrain: 'frontline',
        waterType: 'deep'
    },
    kharkiv: {
        name: 'Kharkiv',
        waves: 7,
        isInDanger: true,
        isLiberated: false,
        neighbors: ['sumy', 'poltava', 'luhansk', 'donetsk'],
        gridX: 6,
        gridY: 2,
        terrain: 'urban',
        waterType: 'none'
    },
    odesa: {
        name: 'Odesa',
        waves: 6,
        isInDanger: false,
        isLiberated: false,
        neighbors: ['mykolaiv'],
        gridX: 1,
        gridY: 3,
        terrain: 'frontline',
        waterType: 'deep'
    },
    mykolaiv: {
        name: 'Mykolaiv',
        waves: 6,
        isInDanger: false,
        isLiberated: false,
        neighbors: ['kherson', 'odesa', 'kropyvnytskyi'],
        gridX: 2,
        gridY: 3,
        terrain: 'urban',
        waterType: 'deep'
    },
    dnipropetrovsk: {
        name: 'Dnipropetrovsk',
        waves: 6,
        isInDanger: false,
        isLiberated: false,
        neighbors: ['kropyvnytskyi', 'poltava', 'zaporizhzhia'],
        gridX: 3,
        gridY: 3,
        terrain: 'frontline',
        waterType: 'deep'
    },
    zaporizhzhia: {
        name: 'Zaporizhzhia',
        waves: 7,
        isInDanger: false,
        isLiberated: false,
        neighbors: ['dnipropetrovsk', 'donetsk', 'kherson'],
        gridX: 4,
        gridY: 3,
        terrain: 'frontline',
        waterType: 'deep'
    },
    kherson: {
        name: 'Kherson',
        waves: 7,
        isInDanger: true,
        isLiberated: false,
        neighbors: ['mykolaiv', 'crimea', 'zaporizhzhia'],
        gridX: 5,
        gridY: 3,
        terrain: 'frontline',
        waterType: 'deep'
    },
    donetsk: {
        name: 'Donetsk',
        waves: 9,
        isInDanger: true,
        isLiberated: false,
        neighbors: ['kharkiv', 'luhansk', 'zaporizhzhia'],
        gridX: 6,
        gridY: 3,
        terrain: 'frontline',
        waterType: 'shallow'
    },
    crimea: {
        name: 'Crimea',
        waves: 10,
        isInDanger: true,
        isLiberated: false,
        neighbors: ['kherson'],
        gridX: 4,
        gridY: 4,
        terrain: 'rocky',
        waterType: 'deep'
    },
    luhansk: {
        name: 'Luhansk',
        waves: 8,
        isInDanger: true,
        isLiberated: false,
        neighbors: ['kharkiv', 'donetsk'],
        gridX: 7,
        gridY: 3,
        terrain: 'frontline',
        waterType: 'shallow'
    }
};


// Game state
let gameState = {
    score: 0,
    wave: 1,
    enemies: [],
    bullets: [],
    enemyBullets: [],
    grenades: [],
    explosions: [],
    powerUps: [],
    gameOver: false,
    lastEnemySpawn: 0,
    enemySpawnInterval: 2000,
    lastShot: 0,
    lastGrenadeThrow: 0,
    shootCooldown: 250,
    grenadeCooldown: 1000,
    waveTimer: 0,
    waveDuration: 20000, // 20 seconds per wave
    regionHealth: 100,
    gameMode: 'menu', // 'menu', 'regionSelect', 'playing', 'settings', 'store', 'gameOver'
    selectedOption: 0,
    menuOptions: ['Start Game', 'Settings', 'Store', 'Support', 'Exit'],
    selectedRegion: null,
    waveCount: 5,
    selectedRegionIndex: 0,
    gameOverSoundPlayed: false,
    wavePaused: false,
    pauseDuration: 0,
    // Add ally soldiers
    allies: [
        {
            x: canvas.width * 0.15,
            y: canvas.height * 0.85,
            width: 16,
            height: 48,
            health: 50,
            lastShot: 0,
            shootCooldown: 4000,
            shootChance: 0.01, // Add random shooting chance
            color: '#4a9eff',
            isAlive: true,
            direction: 1,
            lastDirectionChange: 0,
            directionChangeInterval: 2000 + Math.random() * 3000,
            // Add animation properties
            runFrame: 0,
            runAnimationTimer: 0,
            recoilOffset: 0
        },
        {
            x: canvas.width * 0.6,
            y: canvas.height * 0.80,
            width: 16,
            height: 48,
            health: 50,
            lastShot: 0,
            shootCooldown: 2800,
            shootChance: 0.01, // Add random shooting chance
            color: '#4a9eff',
            isAlive: true,
            direction: 1,
            lastDirectionChange: 0,
            directionChangeInterval: 2000 + Math.random() * 3000,
            // Add animation properties
            runFrame: 0,
            runAnimationTimer: 0,
            recoilOffset: 0
        },
        {
            x: canvas.width * 0.85,
            y: canvas.height * 0.82,
            width: 16,
            height: 48,
            health: 50,
            lastShot: 0,
            shootCooldown: 3500,
            shootChance: 0.01, // Add random shooting chance
            color: '#4a9eff',
            isAlive: true,
            direction: 1,
            lastDirectionChange: 0,
            directionChangeInterval: 2000 + Math.random() * 3000,
            // Add animation properties
            runFrame: 0,
            runAnimationTimer: 0,
            recoilOffset: 0
        }
    ]
};

// Player properties
const player = {
    x: canvas.width / 4,
    y: canvas.height / 2,
    width: 16, // Reduced from 24
    height: 48,
    speed: 2.1,
    isMoving: false,
    direction: 1, // 1 for right, -1 for left
    runFrame: 0,
    runAnimationTimer: 0,
    color: '#4a9eff',
    health: 100,
    maxHealth: 100,
    damage: 10,
    grenades: 3,
    powerUps: {
        rapidFire: 0,
        shield: 0,
        doubleDamage: 0
    },
    // Keep only recoil animation
    recoilOffset: 0,
    recoilTimer: 0
};

// Enemy types
const enemyTypes = {
    normal: {
        width: 16,
        height: 48,
        speed: 1,
        color: '#ff4a4a',
        health: 20,
        damage: 20,
        points: 10,
        shootChance: 0.01,
        shootCooldown: 200
    },
    drone: {
        width: 24,
        height: 24,
        speed: 2,
        color: '#7c7c7c',
        health: 5,
        damage: 30,
        points: 15,
        shootChance: 0.01,
        shootCooldown: 2000,
        bladeRotation: 0,
        grenadeSpeed: 2,
        grenadeRadius: 30,
        grenadeColor: '#00ff00' // Added green color for drone grenades
    },
    tank: {
        width: 84, // Increased from 64
        height: 104,
        speed: 0.3,
        color: '#006400',
        health: 100,
        damage: 100,
        points: 25,
        shootChance: 0.005,
        shootCooldown: 1500,
        grenadeSpeed: 3,
        grenadeRadius: 40,
        grenadeColor: '#808080'
    }
};

// Power-up types
const powerUpTypes = {
    grenade: {
        width: 30,
        height: 30,
        color: '#44ff44',
        effect: () => {
            player.grenades++;
            playSound('powerUp');
        }
    },
    healthKit: {
        width: 30,
        height: 30,
        color: '#ff0000',
        effect: () => {
            player.health = Math.min(player.health + 50, player.maxHealth);
            playSound('powerUp');
        }
    },
    rapidFire: {
        width: 30,
        height: 30,
        color: '#ffff00',
        effect: () => {
            player.powerUps.rapidFire = 600;
            playSound('powerUp');
        }
    }
};

// Bullet properties
const bulletProps = {
    width: 8,
    height: 4,
    speed: 10,
    color: '#fff'
};

// Grenade properties
const grenadeProps = {
    width: 8,
    height: 8,
    speed: 3,
    color: '#00ff00',
    explosionRadius: 50,
    explosionDamage: 50,
    maxCharges: 3
};

// Enemy bullet properties
const enemyBulletProps = {
    width: 4,
    height: 8,
    speed: 5,
    color: '#ff0000'
};

// Input handling
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    Space: false,
    KeyG: false
};

document.addEventListener('keydown', (e) => {
    if (e.code in keys) {
        keys[e.code] = true;
    }

    // Menu navigation
    if (gameState.gameMode === 'menu') {
        if (e.code === 'ArrowUp') {
            gameState.selectedOption = (gameState.selectedOption - 1 + gameState.menuOptions.length) % gameState.menuOptions.length;
        } else if (e.code === 'ArrowDown') {
            gameState.selectedOption = (gameState.selectedOption + 1) % gameState.menuOptions.length;
        } else if (e.code === 'Enter') {
            handleMenuSelection();
        }
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code in keys) {
        keys[e.code] = false;
    }
});

// Draw running legs animation
function drawPlayerLegs(x, y, frame) {
    ctx.save();
    ctx.fillStyle = '#4a9eff';

    if (frame === 0) {
        ctx.fillRect(x + 4, y + 48, 3, 16); // Reduced width from 4 to 3
        ctx.fillRect(x + 9, y + 48, 3, 16); // Adjusted position and width
    } else if (frame === 1) {
        ctx.fillRect(x + 2, y + 48, 3, 16); // Reduced width from 4 to 3
        ctx.fillRect(x + 11, y + 48, 3, 16); // Adjusted position and width
    } else if (frame === 2) {
        ctx.fillRect(x + 6, y + 48, 3, 16); // Adjusted position and width
        ctx.fillRect(x + 7, y + 48, 3, 16); // Adjusted position and width
    }

    ctx.restore();
}

// Draw player with health bar
function drawPlayer() {
    ctx.save();

    // Draw player health bar above player
    const healthBarWidth = 40;
    const healthBarHeight = 5;
    const healthBarY = player.y - 10;

    // Health bar background
    ctx.fillStyle = '#000';
    ctx.fillRect(player.x - (healthBarWidth - player.width) / 2, healthBarY, healthBarWidth, healthBarHeight);

    // Health bar fill
    const healthPercentage = player.health / player.maxHealth;
    ctx.fillStyle = healthPercentage > 0.3 ? '#00ff00' : '#ff0000';
    ctx.fillRect(player.x - (healthBarWidth - player.width) / 2, healthBarY, healthBarWidth * healthPercentage, healthBarHeight);

    // Draw body
    ctx.save();
    ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
    ctx.fillStyle = player.color;
    ctx.fillRect(-player.width / 2, -player.height / 2 + 16, player.width, player.height - 16);

    // Draw uniform details - constrained within body width
    ctx.fillStyle = '#3a7ed6'; // Slightly darker blue for details
    // Chest pockets
    ctx.fillRect(-player.width / 2 + 2, -player.height / 2 + 20, 4, 4);
    ctx.fillRect(player.width / 2 - 6, -player.height / 2 + 20, 4, 4);
    // Belt
    ctx.fillRect(-player.width / 2, -player.height / 2 + 28, player.width, 1);
    // Shoulder straps
    ctx.fillRect(-player.width / 2 + 1, -player.height / 2 + 16, 1, 4);
    ctx.fillRect(player.width / 2 - 2, -player.height / 2 + 16, 1, 4);

    ctx.restore();

    // Draw head with recoil effect and helmet
    const headX = player.x + player.width / 2 + (player.recoilOffset * player.direction);
    const headY = player.y + 12;
    const headRadius = 8;

    // Draw bottom half (skin color)
    ctx.beginPath();
    ctx.fillStyle = '#FFD1B3'; // Skin tone
    ctx.arc(headX, headY, headRadius, 0, Math.PI);
    ctx.fill();

    // Draw top half (helmet - player color)
    ctx.beginPath();
    ctx.fillStyle = player.color;
    ctx.arc(headX, headY, headRadius, Math.PI, Math.PI * 2);
    ctx.fill();

    // Draw helmet line
    ctx.beginPath();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.moveTo(headX - headRadius, headY);
    ctx.lineTo(headX + headRadius, headY);
    ctx.stroke();

    // Draw arms with dynamic movement
    ctx.strokeStyle = '#1a4e9f';
    ctx.lineWidth = 6;

    const shoulderY = player.y + 24;
    const shoulderX = player.x + (player.direction > 0 ? player.width - 4 : 4);
    const rifleY = shoulderY;
    const rifleX = player.x + (player.direction > 0 ? player.width : 0) + (player.recoilOffset * player.direction);

    // Draw back arm with adjusted elbow position only during shooting
    ctx.beginPath();
    ctx.moveTo(shoulderX, shoulderY);
    const backElbowX = shoulderX + (player.direction > 0 ? (player.recoilOffset > 0 ? -2 : -8) : (player.recoilOffset > 0 ? 2 : 8));
    const backElbowY = shoulderY + (player.recoilOffset > 0 ? 4 : 12);
    ctx.lineTo(backElbowX, backElbowY);
    ctx.lineTo(rifleX - (player.direction > 0 ? 4 : -4), rifleY + 2);
    ctx.stroke();

    // Draw front arm with adjusted elbow position only during shooting
    ctx.beginPath();
    ctx.moveTo(shoulderX, shoulderY);
    const frontElbowX = shoulderX + (player.direction > 0 ? (player.recoilOffset > 0 ? 6 : 12) : (player.recoilOffset > 0 ? -6 : -12));
    const frontElbowY = shoulderY + (player.recoilOffset > 0 ? 2 : 8);
    ctx.lineTo(frontElbowX, frontElbowY);
    ctx.lineTo(rifleX + (player.direction > 0 ? 16 : -16), rifleY);
    ctx.stroke();

    // Draw rifle with recoil effect
    ctx.save();
    ctx.translate(rifleX, rifleY);
    ctx.rotate(player.direction > 0 ? 0 : Math.PI);

    // AK-47 body
    ctx.fillStyle = '#8B4513'; // Wood color for furniture
    ctx.fillRect(-4, -2, 8, 8); // Stock base
    ctx.fillRect(-8, -1, 4, 6); // Stock back

    // Main receiver
    ctx.fillStyle = '#444';
    ctx.fillRect(0, -2, 32, 4);

    // Gas tube
    ctx.fillStyle = '#333';
    ctx.fillRect(16, -4, 20, 2);

    // Front sight and muzzle brake
    ctx.fillRect(36, -2, 4, 4);
    ctx.fillRect(40, -3, 6, 2);
    ctx.fillRect(40, 1, 6, 2);

    // Handguard
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(8, -3, 16, 2);
    ctx.fillRect(8, 1, 16, 2);

    ctx.restore();

    // Draw curved magazine separately (after restoring context)
    ctx.save();
    ctx.translate(rifleX + (player.direction > 0 ? 12 : -12), rifleY);
    ctx.beginPath();
    ctx.fillStyle = '#666';
    if (player.direction > 0) {
        ctx.moveTo(0, 2);
        ctx.quadraticCurveTo(4, 8, 8, 12);
        ctx.lineTo(12, 12);
        ctx.quadraticCurveTo(8, 6, 4, 2);
    } else {
        ctx.moveTo(0, 2);
        ctx.quadraticCurveTo(-4, 8, -8, 12);
        ctx.lineTo(-12, 12);
        ctx.quadraticCurveTo(-8, 6, -4, 2);
    }
    ctx.fill();
    ctx.restore();

    // Draw legs with animation
    drawPlayerLegs(player.x, player.y, player.runFrame);

    // Update animation timers
    if (player.isMoving) {
        player.runAnimationTimer++;
        if (player.runAnimationTimer > 5) {
            player.runFrame = (player.runFrame + 1) % 3;
            player.runAnimationTimer = 0;
        }
    } else {
        player.runFrame = 0;
    }

    // Update recoil effect
    if (player.recoilOffset > 0) {
        player.recoilOffset -= 0.5;
    }

    ctx.restore();
}

// Draw enemy legs
function drawEnemyLegs(x, y, frame, type) {
    ctx.save();
    ctx.fillStyle = '#ff4a4a';

    if (type === 'tank') {
        // Tank tracks - unchanged
        ctx.fillRect(x + 8, y + 48, 48, 8);
        ctx.fillRect(x + 8, y + 56, 48, 8);
    } else if (type === 'drone') {
        // No legs for drones
        ctx.restore();
        return;
    } else {
        // Normal enemy legs (same as player)
        if (frame === 0) {
            ctx.fillRect(x + 4, y + 48, 3, 16); // Reduced width from 4 to 3
            ctx.fillRect(x + 9, y + 48, 3, 16); // Adjusted position and width
        } else if (frame === 1) {
            ctx.fillRect(x + 2, y + 48, 3, 16); // Reduced width from 4 to 3
            ctx.fillRect(x + 11, y + 48, 3, 16); // Adjusted position and width
        } else if (frame === 2) {
            ctx.fillRect(x + 6, y + 48, 3, 16); // Adjusted position and width
            ctx.fillRect(x + 7, y + 48, 3, 16); // Adjusted position and width
        }
    }

    ctx.restore();
}

// Draw enemy rifle
function drawEnemyRifle(x, y, direction, type) {
    ctx.save();
    ctx.fillStyle = '#666';

    if (type === 'tank') {
        // Tank cannon - unchanged
        ctx.fillRect(x + (direction > 0 ? 48 : 0), y + 24, 32, 8);
        ctx.fillRect(x + (direction > 0 ? 80 : -16), y + 26, 16, 4);
    } else if (type === 'drone') {
        // No rifle for drones
        ctx.restore();
        return;
    } else {
        // AK-47 for normal enemies
        const rifleX = x + (direction > 0 ? 24 : 2);
        const rifleY = y + 20;

        ctx.save();
        ctx.translate(rifleX, rifleY);
        ctx.rotate(direction > 0 ? 0 : Math.PI);

        // AK-47 body
        ctx.fillStyle = '#8B4513'; // Wood color for furniture
        ctx.fillRect(-4, -2, 8, 8); // Stock base
        ctx.fillRect(-8, -1, 4, 6); // Stock back

        // Main receiver
        ctx.fillStyle = '#444';
        ctx.fillRect(0, -2, 32, 4);

        // Gas tube
        ctx.fillStyle = '#333';
        ctx.fillRect(16, -4, 20, 2);

        // Front sight and muzzle brake
        ctx.fillRect(36, -2, 4, 4);
        ctx.fillRect(40, -3, 6, 2);
        ctx.fillRect(40, 1, 6, 2);

        // Handguard
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(8, -3, 16, 2);
        ctx.fillRect(8, 1, 16, 2);

        ctx.restore();

        // Draw curved magazine separately
        ctx.save();
        ctx.translate(rifleX + (direction > 0 ? 12 : -12), rifleY);
        ctx.beginPath();
        ctx.fillStyle = '#666';
        if (direction > 0) {
            ctx.moveTo(0, 2);
            ctx.quadraticCurveTo(4, 8, 8, 12);
            ctx.lineTo(12, 12);
            ctx.quadraticCurveTo(8, 6, 4, 2);
        } else {
            ctx.moveTo(0, 2);
            ctx.quadraticCurveTo(-4, 8, -8, 12);
            ctx.lineTo(-12, 12);
            ctx.quadraticCurveTo(-8, 6, -4, 2);
        }
        ctx.fill();
        ctx.restore();
    }

    ctx.restore();
}

// Draw enemies
function drawEnemies() {
    ctx.save();
    gameState.enemies.forEach(enemy => {
        if (enemy.type === 'drone') {
            const centerX = enemy.x + enemy.width / 2;
            const centerY = enemy.y + enemy.height / 2;

            // Draw drone shadow
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            ctx.beginPath();
            ctx.ellipse(centerX + 2, centerY + 2, enemy.width / 2, enemy.height / 4, 0, 0, Math.PI * 2);
            ctx.fill();

            // Draw main body (Shahed-style shape)
            ctx.beginPath();
            ctx.fillStyle = enemy.color;
            // Draw elongated body
            ctx.moveTo(centerX, enemy.y);
            ctx.lineTo(centerX - enemy.width / 2, centerY);
            ctx.lineTo(centerX, enemy.y + enemy.height);
            ctx.lineTo(centerX + enemy.width / 2, centerY);
            ctx.closePath();
            ctx.fill();

            // Draw wings
            ctx.fillStyle = enemy.color;
            // Left wing
            ctx.beginPath();
            ctx.moveTo(centerX - enemy.width / 2, centerY);
            ctx.lineTo(centerX - enemy.width * 1.2, centerY - enemy.height / 4);
            ctx.lineTo(centerX - enemy.width * 1.2, centerY + enemy.height / 4);
            ctx.closePath();
            ctx.fill();
            // Right wing
            ctx.beginPath();
            ctx.moveTo(centerX + enemy.width / 2, centerY);
            ctx.lineTo(centerX + enemy.width * 1.2, centerY - enemy.height / 4);
            ctx.lineTo(centerX + enemy.width * 1.2, centerY + enemy.height / 4);
            ctx.closePath();
            ctx.fill();

            // Draw body details
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 1;
            // Draw panel lines
            ctx.beginPath();
            ctx.moveTo(centerX - enemy.width / 3, enemy.y + enemy.height / 3);
            ctx.lineTo(centerX + enemy.width / 3, enemy.y + enemy.height / 3);
            ctx.moveTo(centerX - enemy.width / 3, enemy.y + enemy.height * 2 / 3);
            ctx.lineTo(centerX + enemy.width / 3, enemy.y + enemy.height * 2 / 3);
            ctx.stroke();

            // Draw propellers (2 on each wing)
            ctx.save();
            // Left wing propellers
            ctx.translate(centerX - enemy.width * 1.2, centerY - enemy.height / 4);
            drawPropeller(enemy.bladeRotation);
            ctx.translate(0, enemy.height / 2);
            drawPropeller(enemy.bladeRotation);
            ctx.restore();

            ctx.save();
            // Right wing propellers
            ctx.translate(centerX + enemy.width * 1.2, centerY - enemy.height / 4);
            drawPropeller(enemy.bladeRotation);
            ctx.translate(0, enemy.height / 2);
            drawPropeller(enemy.bladeRotation);
            ctx.restore();

            // Draw sensor/camera
            ctx.fillStyle = '#00ff00';
            ctx.beginPath();
            ctx.arc(centerX, enemy.y + enemy.height / 4, 2, 0, Math.PI * 2);
            ctx.fill();

            // Draw health bar
            const healthPercent = enemy.health / enemyTypes[enemy.type].health;
            const barWidth = enemy.width;
            const barHeight = 4;

            ctx.fillStyle = '#333';
            ctx.fillRect(enemy.x, enemy.y - 8, barWidth, barHeight);

            ctx.fillStyle = '#ff0000';
            ctx.fillRect(enemy.x, enemy.y - 8, barWidth * healthPercent, barHeight);
        } else if (enemy.type === 'tank') {
            // Draw tank body
            ctx.fillStyle = enemy.color;
            ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

            // Draw tank tracks
            ctx.fillStyle = '#444';
            ctx.fillRect(enemy.x + 10, enemy.y + enemy.height - 8, enemy.width - 20, 8);
            ctx.fillRect(enemy.x + 10, enemy.y + enemy.height - 16, enemy.width - 20, 8);

            // Draw tank turret with recoil
            ctx.fillStyle = '#004d00';
            ctx.beginPath();
            ctx.arc(
                enemy.x + enemy.width / 2,
                enemy.y + enemy.height / 2,
                20,
                0,
                Math.PI * 2
            );
            ctx.fill();

            // Draw tank cannon with recoil
            ctx.save();
            ctx.translate(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
            ctx.rotate(Math.PI / 2); // Point down
            ctx.translate(0, enemy.recoilOffset); // Apply recoil offset

            // Cannon body
            ctx.fillStyle = '#666';
            ctx.fillRect(0, -4, 40, 8);

            // Cannon barrel
            ctx.fillRect(40, -3, 30, 6);

            // Cannon muzzle
            ctx.fillRect(70, -2, 10, 4);

            // Cannon details
            ctx.fillStyle = '#888';
            ctx.fillRect(10, -5, 4, 10);
            ctx.fillRect(20, -5, 4, 10);
            ctx.fillRect(30, -5, 4, 10); // Added one more detail for longer tank

            ctx.restore();

            // Draw health bar
            const healthPercent = enemy.health / enemyTypes[enemy.type].health;
            const barWidth = enemy.width;
            const barHeight = 4;

            ctx.fillStyle = '#333';
            ctx.fillRect(enemy.x, enemy.y - 8, barWidth, barHeight);

            ctx.fillStyle = '#ff0000';
            ctx.fillRect(enemy.x, enemy.y - 8, barWidth * healthPercent, barHeight);
        } else {
            // Draw body
            ctx.fillStyle = enemy.color;
            ctx.fillRect(enemy.x, enemy.y + 16, enemy.width, enemy.height - 16);

            // Draw uniform details - constrained within body width
            ctx.fillStyle = '#cc3939'; // Darker red for details
            // Chest pockets
            ctx.fillRect(enemy.x + 2, enemy.y + 20, 4, 4);
            ctx.fillRect(enemy.x + enemy.width - 6, enemy.y + 20, 4, 4);
            // Belt
            ctx.fillRect(enemy.x, enemy.y + 28, enemy.width, 1);
            // Shoulder straps
            ctx.fillRect(enemy.x + 1, enemy.y + 16, 1, 4);
            ctx.fillRect(enemy.x + enemy.width - 2, enemy.y + 16, 1, 4);

            // Draw head with recoil effect and helmet
            const headX = enemy.x + enemy.width / 2 + (enemy.recoilOffset * enemy.direction);
            const headY = enemy.y + 12;
            const headRadius = 8;

            // Draw bottom half (skin color)
            ctx.beginPath();
            ctx.fillStyle = '#FFD1B3'; // Skin tone
            ctx.arc(headX, headY, headRadius, 0, Math.PI);
            ctx.fill();

            // Draw top half (helmet - enemy color)
            ctx.beginPath();
            ctx.fillStyle = enemy.color;
            ctx.arc(headX, headY, headRadius, Math.PI, Math.PI * 2);
            ctx.fill();

            // Draw helmet line
            ctx.beginPath();
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 1;
            ctx.moveTo(headX - headRadius, headY);
            ctx.lineTo(headX + headRadius, headY);
            ctx.stroke();

            // Draw arms with darker red color and thicker lines
            ctx.strokeStyle = '#9f1a1a';
            ctx.lineWidth = 6;

            // Calculate arm positions based on rifle position with recoil
            const shoulderY = enemy.y + 24;
            const shoulderX = enemy.x + (enemy.direction > 0 ? enemy.width - 4 : 4);
            const rifleY = shoulderY;
            const rifleX = enemy.x + (enemy.direction > 0 ? enemy.width : 0) + (enemy.recoilOffset * enemy.direction);

            // Draw back arm with adjusted elbow position only during shooting
            ctx.beginPath();
            ctx.moveTo(shoulderX, shoulderY);
            const backElbowX = shoulderX + (enemy.direction > 0 ? (enemy.recoilOffset > 0 ? -2 : -8) : (enemy.recoilOffset > 0 ? 2 : 8));
            const backElbowY = shoulderY + (enemy.recoilOffset > 0 ? 4 : 12);
            ctx.lineTo(backElbowX, backElbowY);
            ctx.lineTo(rifleX - (enemy.direction > 0 ? 4 : -4), rifleY + 2);
            ctx.stroke();

            // Draw front arm with adjusted elbow position only during shooting
            ctx.beginPath();
            ctx.moveTo(shoulderX, shoulderY);
            const frontElbowX = shoulderX + (enemy.direction > 0 ? (enemy.recoilOffset > 0 ? 6 : 12) : (enemy.recoilOffset > 0 ? -6 : -12));
            const frontElbowY = shoulderY + (enemy.recoilOffset > 0 ? 2 : 8);
            ctx.lineTo(frontElbowX, frontElbowY);
            ctx.lineTo(rifleX + (enemy.direction > 0 ? 16 : -16), rifleY);
            ctx.stroke();

            // Draw rifle with recoil effect
            ctx.save();
            ctx.translate(rifleX, rifleY);
            ctx.rotate(enemy.direction > 0 ? 0 : Math.PI);

            // Rifle body
            ctx.fillStyle = '#666';
            ctx.fillRect(0, -2, 24, 4);

            // Rifle barrel
            ctx.fillRect(24, -1, 16, 2);

            // Rifle stock
            ctx.fillRect(-4, -2, 4, 8);

            // Rifle scope
            ctx.fillStyle = '#888';
            ctx.fillRect(8, -4, 4, 8);

            ctx.restore();

            // Draw legs with animation
            drawEnemyLegs(enemy.x, enemy.y, enemy.runFrame, enemy.type);

            // Draw health bar
            const healthPercent = enemy.health / enemyTypes[enemy.type].health;
            const barWidth = enemy.width;
            const barHeight = 4;

            ctx.fillStyle = '#333';
            ctx.fillRect(enemy.x, enemy.y - 8, barWidth, barHeight);

            ctx.fillStyle = '#ff0000';
            ctx.fillRect(enemy.x, enemy.y - 8, barWidth * healthPercent, barHeight);

            // Update running animation with slower speed
            enemy.runAnimationTimer++;
            if (enemy.runAnimationTimer > 15) {
                enemy.runFrame = (enemy.runFrame + 1) % 3;
                enemy.runAnimationTimer = 0;
            }
        }
    });
    ctx.restore();
}

// Helper function to draw a single propeller
function drawPropeller(rotation) {
    ctx.save();
    ctx.rotate(rotation);

    // Draw four blades with improved design
    ctx.fillStyle = '#666';
    for (let i = 0; i < 4; i++) {
        ctx.save();
        ctx.rotate(i * Math.PI / 2);

        // Draw blade with tapered shape
        ctx.beginPath();
        ctx.moveTo(-1, -8);
        ctx.lineTo(1, -8);
        ctx.lineTo(1.5, 8);
        ctx.lineTo(-1.5, 8);
        ctx.closePath();
        ctx.fill();

        // Draw blade tip
        ctx.fillStyle = '#888';
        ctx.beginPath();
        ctx.moveTo(-1, -8);
        ctx.lineTo(1, -8);
        ctx.lineTo(0, -10);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    // Draw center hub
    ctx.fillStyle = '#444';
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fill();

    // Draw hub details
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, 0, 2, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
}

// Draw bullets
function drawBullets() {
    ctx.save();
    ctx.fillStyle = bulletProps.color;

    gameState.bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });

    ctx.restore();
}

// Draw power-ups
function drawPowerUps() {
    const flashingAlpha = 0.3 + Math.sin(Date.now() * 0.01) * 0.2; // Flashing effect

    gameState.powerUps.forEach(powerUp => {
        ctx.save();

        // Draw flashing circle
        ctx.beginPath();
        ctx.arc(powerUp.x + powerUp.width / 2, powerUp.y + powerUp.height / 2, 20, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${flashingAlpha})`;
        ctx.fill();

        // Draw power-up specific icon
        switch (powerUp.type) {
            case 'grenade':
                // Draw grenade body
                ctx.fillStyle = '#44ff44';
                ctx.beginPath();
                ctx.arc(powerUp.x + powerUp.width / 2, powerUp.y + powerUp.height / 2, 12, 0, Math.PI * 2);
                ctx.fill();
                // Draw grenade details
                ctx.strokeStyle = '#228822';
                ctx.lineWidth = 2;
                ctx.stroke();
                // Draw fuse
                ctx.beginPath();
                ctx.moveTo(powerUp.x + powerUp.width / 2, powerUp.y + powerUp.height / 2 - 12);
                ctx.lineTo(powerUp.x + powerUp.width / 2 + 6, powerUp.y + powerUp.height / 2 - 18);
                ctx.stroke();
                break;

            case 'healthKit':
                // Draw medic kit background
                ctx.fillStyle = '#fff';
                ctx.fillRect(powerUp.x + 5, powerUp.y + 5, powerUp.width - 10, powerUp.height - 10);
                // Draw red cross with border
                ctx.fillStyle = '#ff0000';
                // Horizontal bar
                ctx.fillRect(powerUp.x + 8, powerUp.y + powerUp.height / 2 - 3, powerUp.width - 16, 6);
                // Vertical bar
                ctx.fillRect(powerUp.x + powerUp.width / 2 - 3, powerUp.y + 8, 6, powerUp.height - 16);
                // Add border
                ctx.strokeStyle = '#aa0000';
                ctx.lineWidth = 1;
                ctx.strokeRect(powerUp.x + 5, powerUp.y + 5, powerUp.width - 10, powerUp.height - 10);
                break;

            case 'rapidFire':
                // Draw AK-47 silhouette
                ctx.fillStyle = '#333';
                ctx.save();
                ctx.translate(powerUp.x + powerUp.width / 2, powerUp.y + powerUp.height / 2);

                // Gun body
                ctx.fillRect(-12, -2, 24, 4);
                // Stock
                ctx.fillRect(-15, -3, 5, 6);
                // Barrel and gas tube
                ctx.fillRect(8, -3, 8, 1);
                ctx.fillRect(8, -1, 12, 2);
                // Magazine
                ctx.beginPath();
                ctx.moveTo(-5, 2);
                ctx.lineTo(-2, 2);
                ctx.lineTo(2, 10);
                ctx.lineTo(-8, 10);
                ctx.closePath();
                ctx.fill();

                ctx.restore();
                break;
        }

        ctx.restore();
    });
}

// Draw health bar
function drawHealthBar() {
    // Draw defence health (bottom left)
    ctx.fillStyle = '#000';
    ctx.fillRect(10, canvas.height - 30, 200, 20);
    ctx.fillStyle = gameState.regionHealth > 30 ? '#00ff00' : '#ff0000';
    ctx.fillRect(10, canvas.height - 30, gameState.regionHealth * 2, 20);
    ctx.fillStyle = '#fff';
    ctx.font = '14px Arial';
    ctx.fillText(`Defence Health: ${Math.ceil(gameState.regionHealth)}%`, 15, canvas.height - 15);

    // Draw grenades count (bottom right)
    ctx.fillStyle = '#000';
    ctx.fillRect(canvas.width - 110, canvas.height - 30, 100, 20);
    ctx.fillStyle = '#ff4400';
    ctx.font = '14px Arial';
    ctx.fillText(`Grenades: ${player.grenades}`, canvas.width - 100, canvas.height - 15);
}

// Draw power-up indicators
function drawPowerUpIndicators() {
    const y = canvas.height - 60;
    let x = 10;

    if (player.powerUps.rapidFire > 0) {
        ctx.fillStyle = powerUpTypes.rapidFire.color;
        ctx.fillRect(x, y, 15, 15);
        x += 25;
    }
    if (player.powerUps.doubleDamage > 0) {
        ctx.fillStyle = powerUpTypes.doubleDamage.color;
        ctx.fillRect(x, y, 15, 15);
        x += 25;
    }
    if (player.powerUps.shield > 0) {
        ctx.fillStyle = powerUpTypes.shield.color;
        ctx.fillRect(x, y, 15, 15);
    }
}

// Update player position
function updatePlayer() {
    player.isMoving = false;
    const oldX = player.x;
    const oldY = player.y;

    if (keys.ArrowUp && player.y > 0) {
        player.y -= player.speed;
        player.isMoving = true;
    }
    if (keys.ArrowDown && player.y < canvas.height - player.height) {
        player.y += player.speed;
        player.isMoving = true;
    }
    if (keys.ArrowLeft && player.x > 0) {
        player.x -= player.speed;
        player.isMoving = true;
        player.direction = -1;
    }
    if (keys.ArrowRight && player.x < canvas.width - player.width) {
        player.x += player.speed;
        player.isMoving = true;
        player.direction = 1;
    }

    // Check for collisions with all obstacles
    if (checkCollisionWithObstacles(player)) {
        player.x = oldX;
        player.y = oldY;
        player.isMoving = false;
    }

    if (keys.Space) {
        shoot();
    }

    if (keys.KeyG && player.grenades > 0) {
        throwGrenade();
    }
}

// Shoot bullet
function shoot() {
    const now = Date.now();
    const cooldown = player.powerUps.rapidFire > 0 ? gameState.shootCooldown / 2 : gameState.shootCooldown;

    if (now - gameState.lastShot > cooldown) {
        // Add recoil effect
        player.recoilOffset = 3;

        gameState.bullets.push({
            x: player.x + (player.direction > 0 ? player.width : 0),
            y: player.y + player.height / 2,
            width: bulletProps.width,
            height: bulletProps.height,
            direction: player.direction
        });

        playSound('shoot');
        gameState.lastShot = now;
    }
}

// Throw grenade
function throwGrenade() {
    const now = Date.now();
    if (now - gameState.lastGrenadeThrow > gameState.grenadeCooldown) {
        const direction = keys.ArrowUp ? -1 : keys.ArrowDown ? 1 : 0;
        if (direction !== 0) {
            const maxDistance = canvas.height * 0.3; // 30% of canvas height
            gameState.grenades.push({
                x: player.x + player.width / 2 - grenadeProps.width / 2,
                y: player.y + player.height / 2,
                width: grenadeProps.width,
                height: grenadeProps.height,
                speedY: direction * grenadeProps.speed,
                startY: player.y + player.height / 2, // Store starting position
                maxDistance: maxDistance,
                active: true
            });
            player.grenades--;
            playSound('shoot');
            gameState.lastGrenadeThrow = now;
        }
    }
}

// Update grenades
function updateGrenades() {
    gameState.grenades = gameState.grenades.filter(grenade => {
        if (!grenade.active) return false;

        grenade.y += grenade.speedY;

        // Check if grenade has traveled its maximum distance
        const distanceTraveled = Math.abs(grenade.y - grenade.startY);
        if (distanceTraveled >= grenade.maxDistance) {
            explodeGrenade(grenade);
            return false;
        }

        // Check if grenade hits the ground or ceiling
        if (grenade.y <= 0 || grenade.y >= canvas.height) {
            explodeGrenade(grenade);
            return false;
        }

        // Check if grenade hits any enemies
        gameState.enemies.forEach(enemy => {
            if (checkCollision(grenade, enemy)) {
                explodeGrenade(grenade);
            }
        });

        return grenade.active;
    });
}

// Handle grenade explosion
function explodeGrenade(grenade) {
    // Create explosion effect
    gameState.explosions.push({
        x: grenade.x + grenade.width / 2,
        y: grenade.y + grenade.height / 2,
        radius: 1,
        maxRadius: grenadeProps.explosionRadius,
        duration: 20, // frames
        currentFrame: 0
    });

    // Play explosion sound
    playSound('explosion');

    // Damage enemies within explosion radius
    gameState.enemies = gameState.enemies.filter(enemy => {
        const dx = (enemy.x + enemy.width / 2) - (grenade.x + grenade.width / 2);
        const dy = (enemy.y + enemy.height / 2) - (grenade.y + grenade.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= grenadeProps.explosionRadius) {
            const damage = grenadeProps.explosionDamage * (1 - distance / grenadeProps.explosionRadius);
            enemy.health -= damage;

            if (enemy.health <= 0) {
                gameState.score += enemy.points;
                // Add currency drop based on enemy type
                storeState.currency += enemy.type === 'tank' ? 25 :
                    enemy.type === 'drone' ? 15 : 10;
                // Play appropriate death sound
                if (enemy.type === 'tank') {
                    playSound('tankDestroyed');
                } else if (enemy.type === 'drone') {
                    playSound('droneDestroyed');
                } else {
                    // Play random death scream for other enemies
                    const deathSounds = ['enemyDeath1', 'enemyDeath2', 'enemyDeath3'];
                    playSound(deathSounds[Math.floor(Math.random() * deathSounds.length)]);
                }
                return false;
            }
        }
        return true;
    });

    grenade.active = false;
}

// Draw grenades and explosions
function drawGrenades() {
    ctx.save();

    // Draw grenades
    gameState.grenades.forEach(grenade => {
        if (grenade.active) {
            // Draw trail effect
            ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                ctx.arc(
                    grenade.x + grenade.width / 2,
                    grenade.y + grenade.height / 2 - i * 5 * grenade.speedY / grenadeProps.speed,
                    grenade.width / 2 - i,
                    0,
                    Math.PI * 2
                );
                ctx.fill();
            }

            // Draw grenade body
            ctx.fillStyle = grenadeProps.color;
            ctx.beginPath();
            ctx.arc(
                grenade.x + grenade.width / 2,
                grenade.y + grenade.height / 2,
                grenade.width / 2,
                0,
                Math.PI * 2
            );
            ctx.fill();

            // Draw grenade details
            ctx.strokeStyle = '#008000';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(
                grenade.x + grenade.width / 2,
                grenade.y + grenade.height / 2,
                grenade.width / 2,
                0,
                Math.PI * 2
            );
            ctx.stroke();
        }
    });

    // Draw explosions
    gameState.explosions = gameState.explosions.filter(explosion => {
        // Calculate explosion progress
        const progress = explosion.currentFrame / explosion.duration;
        const alpha = 1 - progress;
        const radius = explosion.maxRadius * Math.sin(progress * Math.PI);

        // Draw explosion
        const gradient = ctx.createRadialGradient(
            explosion.x, explosion.y, 0,
            explosion.x, explosion.y, radius
        );
        gradient.addColorStop(0, `rgba(255, 200, 0, ${alpha})`);
        gradient.addColorStop(0.4, `rgba(255, 100, 0, ${alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(255, 50, 0, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(explosion.x, explosion.y, radius, 0, Math.PI * 2);
        ctx.fill();

        explosion.currentFrame++;
        return explosion.currentFrame < explosion.duration;
    });

    ctx.restore();
}

// Update power-ups
function updatePowerUps() {
    if (Math.random() < 0.001) {
        spawnPowerUp();
    }

    gameState.powerUps = gameState.powerUps.filter(powerUp => {
        if (checkCollision(powerUp, player)) {
            powerUp.effect(player);
            playSound('powerUp');
            return false;
        }
        return true;
    });

    if (player.powerUps.rapidFire > 0) player.powerUps.rapidFire--;
    if (player.powerUps.shield > 0) player.powerUps.shield--;
    if (player.powerUps.doubleDamage > 0) player.powerUps.doubleDamage--;
}

// Update wave
function updateWave() {
    gameState.waveTimer += 16; // Approximately 60fps

    // If we're in a wave
    if (!gameState.wavePaused) {
        if (gameState.waveTimer >= gameState.waveDuration) {
            // Wave ended, start pause
            gameState.wavePaused = true;
            gameState.waveTimer = 0;
            gameState.pauseDuration = 7000; // 7 seconds pause
        }
    } else {
        // We're in the pause between waves
        if (gameState.waveTimer >= gameState.pauseDuration) {
            // Pause ended, start next wave
            gameState.wavePaused = false;
            gameState.wave++;
            gameState.waveTimer = 0;
            gameState.enemySpawnInterval = Math.max(500, 2000 - (gameState.wave * 100));

            // Check if all waves are completed
            if (gameState.wave > gameState.waveCount) {
                // Player has survived all waves - victory!
                player.health = player.maxHealth; // Restore health
                gameState.regionHealth = 100; // Restore region health
                gameState.gameOver = true;
            }
        }
    }
}

// Spawn enemy with type
function spawnEnemy() {
    const x = Math.random() * (canvas.width - enemyTypes['normal'].width);
    const y = -enemyTypes['normal'].height;

    // Choose enemy type based on wave and random chance
    let type = 'normal';
    const rand = Math.random();
    if (gameState.wave >= 3) {
        if (rand < 0.2) type = 'tank';
        else if (rand < 0.5) type = 'drone';
    } else if (gameState.wave >= 2) {
        if (rand < 0.3) type = 'drone';
    }

    const enemyType = enemyTypes[type];
    const enemy = {
        x,
        y,
        width: enemyType.width,
        height: enemyType.height,
        speed: enemyType.speed,
        color: enemyType.color,
        health: enemyType.health,
        damage: enemyType.damage,
        points: enemyType.points,
        type,
        direction: 1, // Always moving down
        runFrame: 0,
        runAnimationTimer: 0,
        lastShot: 0,
        shootChance: enemyType.shootChance,
        shootCooldown: enemyType.shootCooldown,
        bladeRotation: 0, // Initialize blade rotation for all enemies
        // Add recoil animation properties
        recoilOffset: 0,
        recoilTimer: 0,
        // Add new properties
        bobOffset: 0,
        bobSpeed: 0.1,
        armSwing: 0,
        armSwingSpeed: 0.2
    };

    gameState.enemies.push(enemy);
}

// Spawn power-up
function spawnPowerUp() {
    const types = Object.keys(powerUpTypes);
    const type = types[Math.floor(Math.random() * types.length)];
    const powerUpType = powerUpTypes[type];

    gameState.powerUps.push({
        x: Math.random() * (canvas.width - powerUpType.width),
        y: Math.random() * (canvas.height - powerUpType.height),
        width: powerUpType.width,
        height: powerUpType.height,
        color: powerUpType.color,
        type,
        effect: powerUpType.effect
    });
}

// Enemy shoot
function enemyShoot(enemy) {
    const now = Date.now();
    if (now - enemy.lastShot > enemy.shootCooldown && Math.random() < enemy.shootChance) {
        // Add recoil effect when shooting
        enemy.recoilOffset = 5;

        if (enemy.type === 'drone' || enemy.type === 'tank') {
            // Both drones and tanks shoot grenades
            gameState.enemyBullets.push({
                x: enemy.x + enemy.width / 2,
                y: enemy.y + enemy.height,
                width: grenadeProps.width,
                height: grenadeProps.height,
                speed: enemyTypes[enemy.type].grenadeSpeed,
                isGrenade: true,
                active: true,
                explosionRadius: enemyTypes[enemy.type].grenadeRadius,
                damage: enemy.damage,
                startY: enemy.y + enemy.height,
                maxDistance: canvas.height * 0.25,
                type: enemy.type // Store the enemy type to determine grenade color
            });
        } else {
            // Normal enemies shoot regular bullets
            gameState.enemyBullets.push({
                x: enemy.x + enemy.width / 2 - enemyBulletProps.width / 2,
                y: enemy.y + enemy.height,
                width: enemyBulletProps.width,
                height: enemyBulletProps.height,
                speed: enemyBulletProps.speed,
                isGrenade: false
            });
        }
        playSound('enemyShoot');
        enemy.lastShot = now;
    }

    // Update recoil effect
    if (enemy.recoilOffset > 0) {
        enemy.recoilOffset -= 0.5;
    }
}

// Update enemies
function updateEnemies() {
    const now = Date.now();

    // Only spawn new enemies if we're not in the pause between waves
    if (!gameState.wavePaused && now - gameState.lastEnemySpawn > gameState.enemySpawnInterval) {
        spawnEnemy();
        gameState.lastEnemySpawn = now;
    }

    // Move enemies and handle shooting
    gameState.enemies = gameState.enemies.filter(enemy => {
        // Update recoil animation
        if (enemy.recoilOffset > 0) {
            enemy.recoilOffset -= 0.5;
        }

        // Check for water effects first
        let inWater = false;
        let speedMultiplier = 1;

        // Check deep water
        for (const water of battlefield.deepWater) {
            if (checkCollision(enemy, water)) {
                inWater = true;
                speedMultiplier = 0.1; // 90% speed reduction
                break;
            }
        }

        // Check shallow water if not in deep water
        if (!inWater) {
            for (const water of battlefield.shallowWater) {
                // For oval shallow water, check if enemy is within the ellipse
                const centerX = water.x;
                const centerY = water.y;
                const normalizedX = (enemy.x + enemy.width / 2 - centerX) / water.radiusX;
                const normalizedY = (enemy.y + enemy.height / 2 - centerY) / water.radiusY;
                if ((normalizedX * normalizedX + normalizedY * normalizedY) <= 1) {
                    inWater = true;
                    speedMultiplier = 0.5; // 50% speed reduction
                    break;
                }
            }
        }

        // Apply water effects based on enemy type
        if (inWater) {
            if (enemy.type === 'tank') {
                speedMultiplier = 0.7; // Tanks are less affected by water (30% reduction)
            } else if (enemy.type === 'drone') {
                speedMultiplier = 1; // Drones are not affected by water
            }
        }

        // Move based on enemy type
        if (enemy.type === 'tank') {
            enemy.y += enemy.speed * speedMultiplier;
        }
        else if (enemy.type === 'drone') {
            enemy.y += enemy.speed;  // Drones ignore water
            enemy.bladeRotation = (enemy.bladeRotation + 0.2) % (Math.PI * 2);
        }
        // Normal enemies move in zig-zag pattern
        else {
            // Initialize movement direction if not set
            if (!enemy.hasOwnProperty('moveDirection')) {
                enemy.moveDirection = Math.random() < 0.5 ? -1 : 1;
                enemy.horizontalSpeed = enemy.speed * 1.5;
                enemy.verticalSpeed = enemy.speed * 0.5;
            }

            // Apply speed effects
            const currentHorizontalSpeed = enemy.horizontalSpeed * speedMultiplier;
            const currentVerticalSpeed = enemy.verticalSpeed * speedMultiplier;

            // Move downward and horizontally
            enemy.y += currentVerticalSpeed;
            enemy.x += currentHorizontalSpeed * enemy.moveDirection;

            // Update rifle direction based on movement
            enemy.direction = enemy.moveDirection;

            // Check for canvas edge collisions
            if (enemy.x <= 0 || enemy.x + enemy.width >= canvas.width) {
                enemy.moveDirection *= -1; // Reverse direction
                enemy.direction = enemy.moveDirection; // Update rifle direction
            }

            // Check for collisions with obstacles
            if (checkCollisionWithObstacles(enemy)) {
                enemy.moveDirection *= -1; // Reverse direction
                enemy.direction = enemy.moveDirection; // Update rifle direction
                // Move enemy away from obstacle to prevent sticking
                enemy.x += enemy.moveDirection * 5;
            }
        }

        // Remove enemies that are off screen
        if (enemy.y > canvas.height) {
            gameState.regionHealth -= enemy.damage;
            if (gameState.regionHealth <= 0) {
                gameState.gameOver = true;
            }
            return false;
        }

        // Handle enemy shooting
        enemyShoot(enemy);

        return true;
    });
}

// Update enemy bullets
function updateEnemyBullets() {
    gameState.enemyBullets = gameState.enemyBullets.filter(bullet => {
        if (bullet.isGrenade) {
            // Update grenade position
            bullet.y += bullet.speed;

            // Check if grenade has traveled its maximum distance
            const distanceTraveled = Math.abs(bullet.y - bullet.startY);
            if (distanceTraveled >= bullet.maxDistance) {
                // Create explosion effect
                gameState.explosions.push({
                    x: bullet.x + bullet.width / 2,
                    y: bullet.y + bullet.height / 2,
                    radius: 1,
                    maxRadius: bullet.explosionRadius,
                    duration: 20,
                    currentFrame: 0
                });
                // Play explosion sound
                playSound('explosion');
                return false;
            }

            // Check if grenade hits ground or player
            if (bullet.y >= canvas.height || checkCollision(bullet, player)) {
                // Create explosion effect
                gameState.explosions.push({
                    x: bullet.x + bullet.width / 2,
                    y: bullet.y + bullet.height / 2,
                    radius: 1,
                    maxRadius: bullet.explosionRadius,
                    duration: 20,
                    currentFrame: 0
                });

                // Play explosion sound
                playSound('explosion');

                // Damage player if within explosion radius
                const dx = (player.x + player.width / 2) - (bullet.x + bullet.width / 2);
                const dy = (player.y + player.height / 2) - (bullet.y + bullet.height / 2);
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance <= bullet.explosionRadius) {
                    if (player.powerUps.shield > 0) {
                        // Shield absorbs damage
                        return false;
                    }
                    const damage = bullet.damage * (1 - distance / bullet.explosionRadius);
                    player.health -= damage;
                    playSound('hit'); // Add hit sound
                    if (player.health <= 0) {
                        gameState.gameOver = true;
                    }
                }
                return false;
            }
        } else {
            // Regular bullet behavior
            bullet.y += bullet.speed;

            if (bullet.y > canvas.height) {
                return false;
            }

            if (checkCollision(bullet, player)) {
                if (player.powerUps.shield > 0) {
                    return false;
                }
                player.health -= 10;
                playSound('hit'); // Add hit sound
                if (player.health <= 0) {
                    gameState.gameOver = true;
                }
                return false;
            }
        }

        return true;
    });
}

// Draw enemy bullets
function drawEnemyBullets() {
    ctx.save();

    gameState.enemyBullets.forEach(bullet => {
        if (bullet.isGrenade) {
            // Draw grenade with appropriate color based on enemy type
            const grenadeColor = enemyTypes[bullet.type].grenadeColor;

            // Draw grenade
            ctx.fillStyle = grenadeColor;
            ctx.beginPath();
            ctx.arc(
                bullet.x + bullet.width / 2,
                bullet.y + bullet.height / 2,
                bullet.width / 2,
                0,
                Math.PI * 2
            );
            ctx.fill();

            // Draw grenade details with darker shade
            ctx.strokeStyle = bullet.type === 'drone' ? '#008000' : '#404040'; // Updated tank outline to dark gray
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(
                bullet.x + bullet.width / 2,
                bullet.y + bullet.height / 2,
                bullet.width / 2,
                0,
                Math.PI * 2
            );
            ctx.stroke();
        } else {
            // Draw regular bullet
            ctx.fillStyle = enemyBulletProps.color;
            ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        }
    });

    ctx.restore();
}

// // Draw region health bar
// function drawRegionHealthBar() {
//     const barWidth = 200;
//     const barHeight = 20;
//     const x = 10;
//     const y = 90;

//     // Background
//     ctx.fillStyle = '#333';
//     ctx.fillRect(x, y, barWidth, barHeight);

//     // Health
//     const healthWidth = (gameState.regionHealth / 100) * barWidth;
//     ctx.fillStyle = '#ff0000';
//     ctx.fillRect(x, y, healthWidth, barHeight);

//     // Border
//     ctx.strokeStyle = '#fff';
//     ctx.strokeRect(x, y, barWidth, barHeight);
// }

// Draw game over screen
function drawGameOver() {
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fff';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';

    // Play game over sound only once when entering game over state
    if (!gameState.gameOverSoundPlayed) {
        playSound('gameOver');
        gameState.gameOverSoundPlayed = true;
    }

    if (gameState.regionHealth <= 0) {
        ctx.fillText('REGION LOST', canvas.width / 2, canvas.height / 2);
        // Mark neighboring regions as in danger
        if (gameState.selectedRegion) {
            ukraineRegions[gameState.selectedRegion].neighbors.forEach(neighbor => {
                if (ukraineRegions[neighbor]) {
                    ukraineRegions[neighbor].isInDanger = true;
                }
            });
        }
    } else if (gameState.wave > gameState.waveCount) {
        ctx.fillText('REGION LIBERATED!', canvas.width / 2, canvas.height / 2);
        // Mark region as liberated
        if (gameState.selectedRegion) {
            ukraineRegions[gameState.selectedRegion].isLiberated = true;
            ukraineRegions[gameState.selectedRegion].isInDanger = false;
            // Add bonus currency for liberating the region
            storeState.currency += 200;
        }
    } else {
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
    }

    ctx.font = '24px Arial';
    ctx.fillText(`Final Score: ${gameState.score}`, canvas.width / 2, canvas.height / 2 + 40);

    // Show current wave progress
    if (!gameState.regionHealth <= 0 && gameState.wave <= gameState.waveCount) {
        ctx.fillText(`Waves Completed: ${gameState.wave - 1}/${gameState.waveCount}`, canvas.width / 2, canvas.height / 2 + 70);
    }

    ctx.fillText('Press Space to Return to Map', canvas.width / 2, canvas.height / 2 + 100);

    ctx.restore();
}

// Reset game
function resetGame() {
    const previousRegion = gameState.selectedRegion;
    const previousWaveCount = gameState.waveCount;

    gameState = {
        ...gameState,
        score: 0,
        wave: 1,
        enemies: [],
        bullets: [],
        enemyBullets: [],
        grenades: [],
        explosions: [],
        powerUps: [],
        gameOver: false,
        lastEnemySpawn: 0,
        enemySpawnInterval: 2000,
        lastShot: 0,
        lastGrenadeThrow: 0,
        shootCooldown: 250,
        grenadeCooldown: 1000,
        waveTimer: 0,
        waveDuration: 20000,
        regionHealth: 100,
        gameMode: 'playing',
        selectedRegion: previousRegion,
        waveCount: previousWaveCount
    };

    // Get the region object using the region name
    const regionObject = ukraineRegions[previousRegion];
    if (!regionObject) {
        console.error('Region not found:', previousRegion);
        return;
    }

    // Initialize battlefield with region-specific parameters
    battlefield.init(regionObject);

    // Apply difficulty settings
    switch (settings.difficulty) {
        case 'easy':
            player.maxHealth = 150;
            player.health = 150;
            gameState.enemySpawnInterval = 2500;
            break;
        case 'normal':
            player.maxHealth = 100;
            player.health = 100;
            gameState.enemySpawnInterval = 2000;
            break;
        case 'hard':
            player.maxHealth = 75;
            player.health = 75;
            gameState.enemySpawnInterval = 1500;
            break;
    }

    player.x = canvas.width / 4;
    player.y = canvas.height / 2;
    player.grenades = grenadeProps.maxCharges;
    player.powerUps = {
        rapidFire: 0
    };
    player.speed = 2.1; // Reset player speed

    // Reset store state
    storeState.currency = 0;

    // Reset allies
    gameState.allies = gameState.allies.map(ally => ({
        ...ally,
        health: 50,
        isAlive: true,
        lastShot: 0
    }));

    stopMenuMusic(); // Stop menu music when resetting game
    stopGameMusic();
}

// Update bullets
function updateBullets() {
    gameState.bullets = gameState.bullets.filter(bullet => {
        // Handle vertical movement for ally bullets
        if (bullet.hasOwnProperty('speedY')) {
            bullet.y += bullet.speedY;

            // Remove bullet if it goes off screen
            if (bullet.y < 0) {
                return false;
            }
        } else {
            // Original horizontal movement for player bullets
            bullet.x += bullet.direction * bulletProps.speed;

            // Remove bullet if it goes off screen
            if (bullet.x < 0 || bullet.x > canvas.width) {
                return false;
            }
        }

        // Check for building collisions
        for (const building of battlefield.buildings) {
            if (checkCollision(bullet, building)) {
                return false;
            }
        }

        // Check for enemy hits
        let hitEnemy = false;
        gameState.enemies = gameState.enemies.filter(enemy => {
            if (!hitEnemy && checkCollision(bullet, enemy)) {
                hitEnemy = true;
                const damage = player.powerUps.doubleDamage > 0 ? player.damage * 2 : player.damage;
                enemy.health -= damage;
                if (enemy.health <= 0) {
                    gameState.score += enemy.points;
                    storeState.currency += enemy.type === 'tank' ? 25 :
                        enemy.type === 'drone' ? 15 : 10;
                    if (enemy.type === 'tank') {
                        playSound('tankDestroyed');
                    } else if (enemy.type === 'drone') {
                        playSound('droneDestroyed');
                    } else {
                        const deathSounds = ['enemyDeath1', 'enemyDeath2', 'enemyDeath3'];
                        playSound(deathSounds[Math.floor(Math.random() * deathSounds.length)]);
                    }
                    return false;
                }
                return true;
            }
            return true;
        });

        // Remove bullet if it hit an enemy
        return !hitEnemy;
    });
}

// Check collision between two rectangles
function checkCollision(rect1, rect2) {
    // If rect2 is a barrier (has collisionPoints), use diamond collision
    if (rect2.collisionPoints) {
        // Check if any corner of the moving object is inside the diamond
        const corners = [
            { x: rect1.x, y: rect1.y }, // top-left
            { x: rect1.x + rect1.width, y: rect1.y }, // top-right
            { x: rect1.x + rect1.width, y: rect1.y + rect1.height }, // bottom-right
            { x: rect1.x, y: rect1.y + rect1.height } // bottom-left
        ];

        return corners.some(corner => pointInDiamond(corner.x, corner.y, rect2));
    }

    // Regular rectangle collision for other objects
    return rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y;
}

// Battlefield background elements
const battlefield = {
    grass: [],
    debris: [],
    craters: [],
    barriers: [],
    rocks: [],
    trees: [],
    shallowWater: [],
    deepWater: [],
    buildings: [],
    urbanDecorations: [], // Add urban decorations array

    init(region) {
        // Clear previous battlefield elements
        this.grass = [];
        this.debris = [];
        this.craters = [];
        this.barriers = [];
        this.rocks = [];
        this.trees = [];
        this.shallowWater = [];
        this.deepWater = [];
        this.buildings = [];
        this.urbanDecorations = []; // Clear urban decorations array

        // Define player spawn safe zone
        const safeZone = {
            x: canvas.width / 4 - 50,
            y: canvas.height / 2 - 50,
            width: 100,
            height: 100
        };

        // Helper function to check if position is in safe zone
        const isInSafeZone = (x, y, width, height) => {
            return !(x + width < safeZone.x ||
                x > safeZone.x + safeZone.width ||
                y + height < safeZone.y ||
                y > safeZone.y + safeZone.height);
        };

        // Helper function to check if position overlaps with water
        const isInWater = (x, y, width, height) => {
            // Check deep water
            for (const water of this.deepWater) {
                if (!(x + width < water.x || x > water.x + water.width ||
                    y + height < water.y || y > water.y + water.height)) {
                    return true;
                }
            }
            // Check shallow water
            for (const water of this.shallowWater) {
                if (!(x + width < water.x || x > water.x + water.width ||
                    y + height < water.y || y > water.y + water.height)) {
                    return true;
                }
            }
            return false;
        };

        // Generate water based on region type
        if (region.waterType === 'deep') {
            // Generate a horizontal river with random curves
            const riverHeight = 80 + Math.random() * 40;
            const segments = 4;
            const segmentWidth = canvas.width / segments;

            let lastY = canvas.height / 2;
            for (let i = 0; i < segments; i++) {
                const x = i * segmentWidth;
                const y = lastY + (Math.random() * 60 - 30);
                const width = segmentWidth + 10;
                const height = riverHeight;

                this.deepWater.push({
                    x, y: y - height / 2,
                    width, height,
                    color: 'rgba(0, 50, 150, 0.5)'
                });

                lastY = y;
            }
        } else if (region.waterType === 'shallow') {
            // Generate random water ponds
            for (let i = 0; i < 3; i++) {
                let x, y, radiusX, radiusY;
                do {
                    radiusX = 50 + Math.random() * 75;  // Horizontal radius
                    radiusY = 30 + Math.random() * 40;  // Vertical radius
                    x = radiusX + Math.random() * (canvas.width - radiusX * 2);
                    y = radiusY + Math.random() * (canvas.height - radiusY * 2);
                } while (isInSafeZone(x - radiusX, y - radiusY, radiusX * 2, radiusY * 2));

                this.shallowWater.push({
                    x, y,
                    radiusX, radiusY,
                    color: 'rgba(0, 100, 200, 0.3)'
                });
            }
        }

        // Generate buildings for urban terrain
        if (region.terrain === 'urban') {
            const buildingCount = 15;
            for (let i = 0; i < buildingCount; i++) {
                let x, y, width, height;
                let attempts = 0;
                const maxAttempts = 50; // Prevent infinite loop
                let validPosition = false;

                do {
                    width = 60 + Math.random() * 40; // Building width
                    height = 120 + Math.random() * 80; // Building height
                    // Spread buildings across the whole map
                    x = 50 + Math.random() * (canvas.width - width - 100);
                    y = 50 + Math.random() * (canvas.height - height - 100);

                    // Check if position is valid (not in safe zone, water, or overlapping with other buildings)
                    if (!isInSafeZone(x, y, width, height) && !isInWater(x, y, width, height)) {
                        validPosition = true;
                        // Check for overlap with existing buildings
                        for (const existingBuilding of this.buildings) {
                            const minDistance = 100; // Minimum distance between buildings
                            const dx = (x + width / 2) - (existingBuilding.x + existingBuilding.width / 2);
                            const dy = (y + height / 2) - (existingBuilding.y + existingBuilding.height / 2);
                            const distance = Math.sqrt(dx * dx + dy * dy);

                            if (distance < minDistance) {
                                validPosition = false;
                                break;
                            }
                        }
                    }

                    attempts++;
                } while (!validPosition && attempts < maxAttempts);

                if (validPosition) {
                    this.buildings.push({
                        x, y, width, height,
                        health: 10000, // Building health
                        // Collision points for diamond-shaped base (1/3 of height)
                        collisionPoints: [
                            { x: x + width * 0.5, y: y + height * 0.67 }, // Top point (2/3 up)
                            { x: x + width, y: y + height * 0.83 }, // Right point
                            { x: x + width * 0.5, y: y + height }, // Bottom point
                            { x: x, y: y + height * 0.83 } // Left point
                        ],
                        color: '#666'
                    });
                }
            }

            // Generate urban decorations
            const decorationCount = 30;
            for (let i = 0; i < decorationCount; i++) {
                let x, y, width, height;
                let attempts = 0;
                const maxAttempts = 50;
                let validPosition = false;
                let selectedDecoration;

                do {
                    // Randomly select decoration type
                    const decorationTypes = [
                        { width: 20, height: 40, type: 'sign' },      // Street sign
                        { width: 15, height: 25, type: 'trash' },     // Trash bin
                        { width: 30, height: 20, type: 'barrier' },   // Traffic barrier
                        { width: 25, height: 25, type: 'bench' }      // Bench
                    ];
                    selectedDecoration = decorationTypes[Math.floor(Math.random() * decorationTypes.length)];
                    width = selectedDecoration.width;
                    height = selectedDecoration.height;

                    // Spread decorations across the map
                    x = 50 + Math.random() * (canvas.width - width - 100);
                    y = 50 + Math.random() * (canvas.height - height - 100);

                    // Check if position is valid
                    if (!isInSafeZone(x, y, width, height) && !isInWater(x, y, width, height)) {
                        validPosition = true;
                        // Check for overlap with buildings and other decorations
                        for (const existingBuilding of this.buildings) {
                            const minDistance = 50;
                            const dx = (x + width / 2) - (existingBuilding.x + existingBuilding.width / 2);
                            const dy = (y + height / 2) - (existingBuilding.y + existingBuilding.height / 2);
                            const distance = Math.sqrt(dx * dx + dy * dy);

                            if (distance < minDistance) {
                                validPosition = false;
                                break;
                            }
                        }

                        if (validPosition) {
                            for (const existingDecoration of this.urbanDecorations) {
                                const minDistance = 30;
                                const dx = (x + width / 2) - (existingDecoration.x + existingDecoration.width / 2);
                                const dy = (y + height / 2) - (existingDecoration.y + existingDecoration.height / 2);
                                const distance = Math.sqrt(dx * dx + dy * dy);

                                if (distance < minDistance) {
                                    validPosition = false;
                                    break;
                                }
                            }
                        }
                    }

                    attempts++;
                } while (!validPosition && attempts < maxAttempts);

                if (validPosition) {
                    this.urbanDecorations.push({
                        x, y, width, height,
                        type: selectedDecoration.type,
                        rotation: Math.random() * Math.PI * 2
                    });
                }
            }

            // Generate shell marks (craters)
            const craterCount = 20;
            for (let i = 0; i < craterCount; i++) {
                let x, y, radius;
                do {
                    radius = 15 + Math.random() * 25;
                    x = radius + Math.random() * (canvas.width - radius * 2);
                    y = radius + Math.random() * (canvas.height - radius * 2);
                } while (isInSafeZone(x - radius, y - radius, radius * 2, radius * 2));

                this.craters.push({
                    x, y, radius,
                    depth: 0.3 + Math.random() * 0.4 // Random depth for 3D effect
                });
            }

            // Generate grass patches
            const grassCount = 40;
            for (let i = 0; i < grassCount; i++) {
                let x, y, width, height;
                do {
                    width = 8 + Math.random() * 15;
                    height = 5 + Math.random() * 10;
                    x = Math.random() * (canvas.width - width);
                    y = Math.random() * (canvas.height - height);
                } while (isInSafeZone(x, y, width, height));

                this.grass.push({
                    x, y, width, height,
                    color: `rgb(${100 + Math.random() * 50}, ${150 + Math.random() * 50}, ${100 + Math.random() * 50})`
                });
            }

            // Generate concrete debris
            const debrisCount = 35;
            for (let i = 0; i < debrisCount; i++) {
                let x, y, width, height;
                do {
                    width = 10 + Math.random() * 20;
                    height = 5 + Math.random() * 15;
                    x = Math.random() * (canvas.width - width);
                    y = Math.random() * (canvas.height - height);
                } while (isInSafeZone(x, y, width, height));

                this.debris.push({
                    x, y, width, height,
                    rotation: Math.random() * Math.PI * 2,
                    color: `rgb(${180 + Math.random() * 30}, ${180 + Math.random() * 30}, ${180 + Math.random() * 30})`
                });
            }
        } else {
            // Generate grass patches (these can be in safe zone)
            const grassCount = region.terrain === 'woodlands' ? 70 : 50;
            for (let i = 0; i < grassCount; i++) {
                this.grass.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    width: 10 + Math.random() * 20,
                    height: 5 + Math.random() * 10
                });
            }

            // Generate debris (avoid safe zone and water)
            const debrisCount = region.terrain === 'frontline' ? 40 : 30;
            for (let i = 0; i < debrisCount; i++) {
                let x, y, width, height;
                do {
                    width = 5 + Math.random() * 15;
                    height = 5 + Math.random() * 15;
                    x = Math.random() * (canvas.width - width);
                    y = Math.random() * (canvas.height - height);
                } while (isInSafeZone(x, y, width, height) || isInWater(x, y, width, height));

                this.debris.push({
                    x, y, width, height,
                    rotation: Math.random() * Math.PI * 2
                });
            }

            // Generate craters (avoid safe zone and water)
            const craterCount = region.terrain === 'frontline' ? 12 : 8;
            for (let i = 0; i < craterCount; i++) {
                let x, y, radius;
                do {
                    radius = 20 + Math.random() * 30;
                    x = radius + Math.random() * (canvas.width - radius * 2);
                    y = radius + Math.random() * (canvas.height - radius * 2);
                } while (isInSafeZone(x - radius, y - radius, radius * 2, radius * 2) ||
                    isInWater(x - radius, y - radius, radius * 2, radius * 2));

                this.craters.push({ x, y, radius });
            }

            // Generate rocks (avoid safe zone and water)
            const rockCount = region.terrain === 'rocky' ? 12 : 8;
            for (let i = 0; i < rockCount; i++) {
                let x, y, width, height;
                do {
                    width = 30 + Math.random() * 20;
                    height = 30 + Math.random() * 20;
                    x = 50 + Math.random() * (canvas.width - width - 100);
                    y = 50 + Math.random() * (canvas.height - height - 100);
                } while (isInSafeZone(x, y, width, height) || isInWater(x, y, width, height));

                this.rocks.push({
                    x, y, width, height,
                    collisionPoints: [
                        { x: x + width * 0.5, y: y },
                        { x: x + width, y: y + height * 0.5 },
                        { x: x + width, y: y + height },
                        { x: x, y: y + height },
                        { x: x, y: y + height * 0.5 }
                    ],
                    color: '#666'
                });
            }

            // Generate trees (avoid safe zone and water)
            const treeCount = region.terrain === 'woodlands' ? 15 : 8;
            for (let i = 0; i < treeCount; i++) {
                let x, y, width, height;
                do {
                    width = 40;
                    height = 40;
                    x = 50 + Math.random() * (canvas.width - width - 100);
                    y = 50 + Math.random() * (canvas.height - height - 100);
                } while (isInSafeZone(x, y, width, height) || isInWater(x, y, width, height));

                this.trees.push({
                    x, y,
                    width: width,
                    height: height * 1.5,  // Make trees 50% taller
                    trunkWidth: width * 0.4,  // trunk is 40% of total width
                    trunkHeight: height * 1.5,  // Make trunk match new height
                    canopyRadius: width * 0.8, // canopy is 160% of trunk width
                    // Collision points for diamond-shaped collision
                    collisionPoints: [
                        { x: x + width * 0.3, y: y },              // Top point
                        { x: x + width * 0.7, y: y },              // Top right
                        { x: x + width * 0.7, y: y + height * 1.5 },     // Bottom right
                        { x: x + width * 0.3, y: y + height * 1.5 },     // Bottom left
                    ],
                    trunkColor: '#4a3728'  // Brown color for trunk
                });
            }

            // Generate sandbag barriers (avoid safe zone and water)
            const barrierCount = region.terrain === 'frontline' ? 8 : 5;
            for (let i = 0; i < barrierCount; i++) {
                let x, y, width, height;
                do {
                    width = 100;
                    height = 40;
                    x = 50 + Math.random() * (canvas.width - width - 100);
                    y = 50 + Math.random() * (canvas.height - height - 100);
                } while (isInSafeZone(x, y, width, height) || isInWater(x, y, width, height));

                this.barriers.push({
                    x, y, width, height,
                    collisionPoints: [
                        { x: x + width * 0.5, y: y },
                        { x: x + width, y: y + height * 0.5 },
                        { x: x + width, y: y + height },
                        { x: x, y: y + height },
                        { x: x, y: y + height * 0.5 }
                    ],
                    color: '#666'
                });
            }
        }
    }
};

// Add a function to check point-in-diamond collision
function pointInDiamond(px, py, diamond) {
    const points = diamond.collisionPoints;
    let inside = false;

    // Use ray casting algorithm to determine if point is inside polygon
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
        const xi = points[i].x, yi = points[i].y;
        const xj = points[j].x, yj = points[j].y;

        const intersect = ((yi > py) !== (yj > py)) &&
            (px < (xj - xi) * (py - yi) / (yj - yi) + xi);

        if (intersect) inside = !inside;
    }

    return inside;
}

// Draw battlefield background
function drawBattlefield() {
    ctx.save();

    // Draw dirt background
    ctx.fillStyle = '#3a2f1c';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grass patches first
    battlefield.grass.forEach(patch => {
        ctx.fillStyle = patch.color;
        ctx.fillRect(patch.x, patch.y, patch.width, patch.height);
    });

    // Draw concrete debris
    battlefield.debris.forEach(piece => {
        ctx.save();
        ctx.translate(piece.x + piece.width / 2, piece.y + piece.height / 2);
        ctx.rotate(piece.rotation);
        ctx.translate(-(piece.x + piece.width / 2), -(piece.y + piece.height / 2));

        // Draw debris shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(piece.x + 2, piece.y + 2, piece.width, piece.height);

        // Draw debris piece
        ctx.fillStyle = piece.color;
        ctx.fillRect(piece.x, piece.y, piece.width, piece.height);

        // Add cracks
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.moveTo(piece.x + Math.random() * piece.width, piece.y + Math.random() * piece.height);
            ctx.lineTo(piece.x + Math.random() * piece.width, piece.y + Math.random() * piece.height);
            ctx.stroke();
        }

        ctx.restore();
    });

    // Draw shell marks (craters)
    battlefield.craters.forEach(crater => {
        // Draw crater shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.arc(crater.x + 2, crater.y + 2, crater.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw crater
        const gradient = ctx.createRadialGradient(
            crater.x, crater.y, 0,
            crater.x, crater.y, crater.radius
        );
        gradient.addColorStop(0, '#4a3f2c');
        gradient.addColorStop(0.5, '#3a2f1c');
        gradient.addColorStop(1, '#2a1f0c');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(crater.x, crater.y, crater.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw crater rim
        ctx.strokeStyle = '#2a1f0c';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(crater.x, crater.y, crater.radius, 0, Math.PI * 2);
        ctx.stroke();
    });

    // Draw building bases first (with collision)
    battlefield.buildings.forEach(building => {
        // Draw building shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(building.x + 5, building.y + building.height - 5, building.width, 10);

        // Draw building base (diamond shape for collision)
        ctx.fillStyle = building.color;
        ctx.beginPath();
        ctx.moveTo(building.collisionPoints[0].x, building.collisionPoints[0].y);
        for (let i = 1; i < building.collisionPoints.length; i++) {
            ctx.lineTo(building.collisionPoints[i].x, building.collisionPoints[i].y);
        }
        ctx.closePath();
        ctx.fill();
    });

    // Draw urban decorations
    battlefield.urbanDecorations.forEach(decoration => {
        ctx.save();
        ctx.translate(decoration.x + decoration.width / 2, decoration.y + decoration.height / 2);
        ctx.rotate(decoration.rotation);
        ctx.translate(-(decoration.x + decoration.width / 2), -(decoration.y + decoration.height / 2));

        switch (decoration.type) {
            case 'sign':
                // Draw sign post
                ctx.fillStyle = '#666';
                ctx.fillRect(decoration.x + decoration.width / 2 - 2, decoration.y, 4, decoration.height);
                // Draw sign head
                ctx.fillStyle = '#ff0000';
                ctx.fillRect(decoration.x, decoration.y, decoration.width, 15);
                // Draw text
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 10px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('STOP', decoration.x + decoration.width / 2, decoration.y + 10);
                break;

            case 'trash':
                // Draw trash bin body
                ctx.fillStyle = '#444';
                ctx.fillRect(decoration.x, decoration.y, decoration.width, decoration.height);
                // Draw lid
                ctx.fillStyle = '#666';
                ctx.fillRect(decoration.x - 2, decoration.y - 5, decoration.width + 4, 5);
                break;

            case 'barrier':
                // Draw traffic barrier
                ctx.fillStyle = '#ff9900';
                ctx.fillRect(decoration.x, decoration.y, decoration.width, decoration.height);
                // Draw stripes
                ctx.fillStyle = '#000';
                for (let i = 0; i < 3; i++) {
                    ctx.fillRect(decoration.x + i * 10, decoration.y, 5, decoration.height);
                }
                break;

            case 'bench':
                // Draw bench seat
                ctx.fillStyle = '#666';
                ctx.fillRect(decoration.x, decoration.y, decoration.width, 5);
                // Draw bench back
                ctx.fillRect(decoration.x, decoration.y - 15, decoration.width, 5);
                // Draw legs
                ctx.fillRect(decoration.x + 5, decoration.y + 5, 3, 15);
                ctx.fillRect(decoration.x + decoration.width - 8, decoration.y + 5, 3, 15);
                break;
        }

        ctx.restore();
    });

    // Draw deep water
    battlefield.deepWater.forEach(water => {
        ctx.fillStyle = water.color;
        ctx.fillRect(water.x, water.y, water.width, water.height);

        // Add wave effects throughout the height
        ctx.strokeStyle = 'rgba(0, 100, 255, 0.3)';
        ctx.lineWidth = 2;
        const waveHeight = 5;
        const waveCount = Math.floor(water.width / 20);
        const verticalWaveCount = Math.floor(water.height / 20);

        // Draw horizontal wave lines
        for (let j = 0; j < verticalWaveCount; j++) {
            ctx.beginPath();
            for (let i = 0; i < waveCount; i++) {
                const x = water.x + (i * 20);
                const baseY = water.y + (j * 20);
                // Offset each row's phase for more natural look
                const y = baseY + Math.sin((Date.now() / 1000) + i + (j * 0.5)) * waveHeight;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        }


    });

    // Draw shallow water
    battlefield.shallowWater.forEach(water => {
        ctx.fillStyle = water.color;
        ctx.beginPath();
        ctx.ellipse(water.x, water.y, water.radiusX, water.radiusY, 0, 0, Math.PI * 2);
        ctx.fill();

        // Add ripple effect
        ctx.strokeStyle = 'rgba(0, 150, 255, 0.2)';
        ctx.lineWidth = 1;
        const time = Date.now() / 1000;
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.ellipse(
                water.x,
                water.y,
                water.radiusX * (0.7 + Math.sin(time + i) / 4),
                water.radiusY * (0.7 + Math.sin(time + i) / 4),
                0, 0, Math.PI * 2
            );
            ctx.stroke();
        }
    });

    // Draw craters
    battlefield.craters.forEach(crater => {
        ctx.beginPath();
        ctx.fillStyle = '#2a1f0c';
        ctx.arc(crater.x, crater.y, crater.radius, 0, Math.PI * 2);
        ctx.fill();

        // Crater rim
        ctx.beginPath();
        ctx.strokeStyle = '#4a3f2c';
        ctx.lineWidth = 2;
        ctx.arc(crater.x, crater.y, crater.radius, 0, Math.PI * 2);
        ctx.stroke();
    });

    // Draw debris
    battlefield.debris.forEach(item => {
        ctx.save();
        ctx.translate(item.x + item.width / 2, item.y + item.height / 2);
        ctx.rotate(item.rotation);
        ctx.fillStyle = '#4a2a0a';
        ctx.fillRect(-item.width / 2, -item.height / 2, item.width, item.height);
        ctx.restore();
    });

    // Draw grass patches
    battlefield.grass.forEach(patch => {
        ctx.fillStyle = '#2d5a27';
        ctx.fillRect(patch.x, patch.y, patch.width, patch.height);
    });

    // Draw rocks
    battlefield.rocks.forEach(rock => {
        // Draw base rock shape with gradient
        const gradient = ctx.createLinearGradient(
            rock.x, rock.y,
            rock.x + rock.width, rock.y + rock.height
        );
        gradient.addColorStop(0, '#696969');    // Darker gray
        gradient.addColorStop(0.4, '#808080');  // Medium gray
        gradient.addColorStop(0.7, '#A9A9A9');  // Lighter gray
        gradient.addColorStop(1, '#696969');    // Back to darker gray

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(rock.collisionPoints[0].x, rock.collisionPoints[0].y);
        for (let i = 1; i < rock.collisionPoints.length; i++) {
            ctx.lineTo(rock.collisionPoints[i].x, rock.collisionPoints[i].y);
        }
        ctx.closePath();
        ctx.fill();

        // Add rock texture (cracks and highlights)
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.lineWidth = 1;

        // Add simple cracks
        ctx.beginPath();
        ctx.moveTo(rock.x + rock.width * 0.2, rock.y + rock.height * 0.3);
        ctx.lineTo(rock.x + rock.width * 0.4, rock.y + rock.height * 0.5);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(rock.x + rock.width * 0.6, rock.y + rock.height * 0.2);
        ctx.lineTo(rock.x + rock.width * 0.8, rock.y + rock.height * 0.4);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(rock.x + rock.width * 0.3, rock.y + rock.height * 0.7);
        ctx.lineTo(rock.x + rock.width * 0.5, rock.y + rock.height * 0.9);
        ctx.stroke();


        // Add highlights
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(rock.collisionPoints[0].x, rock.collisionPoints[0].y);
        ctx.lineTo(rock.collisionPoints[1].x, rock.collisionPoints[1].y);
        ctx.stroke();

        // Add shadow at the bottom
        const shadowGradient = ctx.createLinearGradient(
            rock.x, rock.y + rock.height - 10,
            rock.x, rock.y + rock.height
        );
        shadowGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');

        ctx.fillStyle = shadowGradient;
        ctx.beginPath();
        ctx.moveTo(rock.collisionPoints[2].x, rock.collisionPoints[2].y);
        ctx.lineTo(rock.collisionPoints[3].x, rock.collisionPoints[3].y);
        ctx.lineTo(rock.collisionPoints[3].x, rock.collisionPoints[3].y + 5);
        ctx.lineTo(rock.collisionPoints[2].x, rock.collisionPoints[2].y + 5);
        ctx.closePath();
        ctx.fill();
    });

    // Draw tree trunks
    battlefield.trees.forEach(tree => {
        // Draw the visual rectangle trunk
        ctx.fillStyle = tree.trunkColor;
        const trunkX = tree.x + (tree.width - tree.trunkWidth) / 2;
        ctx.fillRect(trunkX, tree.y, tree.trunkWidth, tree.trunkHeight);

        // Add wood grain texture
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.lineWidth = 1;
        for (let i = 0; i < tree.trunkHeight; i += 8) {
            ctx.beginPath();
            ctx.moveTo(trunkX, tree.y + i);
            ctx.bezierCurveTo(
                trunkX + tree.trunkWidth * 0.2, tree.y + i + 4,
                trunkX + tree.trunkWidth * 0.8, tree.y + i + 4,
                trunkX + tree.trunkWidth, tree.y + i
            );
            ctx.stroke();
        }
    });

    // Draw barriers
    battlefield.barriers.forEach(barrier => {
        // Draw base shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(barrier.x + 5, barrier.y + barrier.height - 5, barrier.width, 10);

        // Draw each sandbag row
        const bagHeight = barrier.height / 2;  // 2 rows high
        const bagWidth = 25;
        const rows = 2;
        const bottomRowBags = Math.floor(barrier.width / bagWidth);  // Maximum bags for bottom row
        const topRowBags = bottomRowBags - 1;  // 1 fewer bags in top row

        for (let row = 0; row < rows; row++) {
            const isTopRow = row === 0;
            const bagsInThisRow = isTopRow ? topRowBags : bottomRowBags;

            // Calculate offset to center the row
            const rowWidth = bagsInThisRow * bagWidth;
            const offsetX = (barrier.width - rowWidth) / 2;
            const y = barrier.y + row * bagHeight;

            for (let i = 0; i < bagsInThisRow; i++) {
                const x = barrier.x + offsetX + i * bagWidth;

                // Draw individual sandbag
                ctx.fillStyle = '#8B7355';  // Base sandbag color
                ctx.beginPath();
                ctx.ellipse(x + bagWidth / 2, y + bagHeight / 2, bagWidth / 2, bagHeight / 2, 0, 0, Math.PI * 2);
                ctx.fill();

                // Add highlight
                ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.beginPath();
                ctx.ellipse(x + bagWidth / 2, y + bagHeight / 3, bagWidth / 3, bagHeight / 4, 0, 0, Math.PI * 2);
                ctx.fill();

                // Add shadow detail
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.ellipse(x + bagWidth / 2, y + bagHeight / 2, bagWidth / 2 - 2, bagHeight / 2 - 2, 0, 0, Math.PI * 2);
                ctx.stroke();
            }
        }
    });

    ctx.restore();
}

// Create a new function to draw tree leaves (to be called after all other game elements)
function drawTreeLeaves() {
    ctx.save();

    battlefield.trees.forEach(tree => {
        // Draw canopy (leaves) centered above the trunk
        const trunkX = tree.x + (tree.width - tree.trunkWidth) / 2;
        const canopyX = trunkX + tree.trunkWidth / 2;  // Center on trunk
        const canopyY = tree.y + tree.trunkHeight * 0.001;  // Move leaves higher up relative to trunk

        // Create leaf gradient with more opacity
        const canopyGradient = ctx.createRadialGradient(
            canopyX, canopyY, 0,
            canopyX, canopyY, tree.canopyRadius
        );
        canopyGradient.addColorStop(0, 'rgba(45, 90, 39, 0.95)'); // More opaque center
        canopyGradient.addColorStop(0.6, 'rgba(26, 79, 26, 0.85)'); // More opaque middle
        canopyGradient.addColorStop(1, 'rgba(26, 79, 26, 0)'); // Still fade to transparent

        // Draw main canopy
        ctx.beginPath();
        ctx.arc(canopyX, canopyY, tree.canopyRadius, 0, Math.PI * 2);
        ctx.fillStyle = canopyGradient;
        ctx.fill();

        // Add leaf clusters for detail with larger, more visible clusters
        ctx.fillStyle = 'rgba(61, 106, 55, 0.7)'; // More opaque leaf clusters
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const leafX = canopyX + Math.cos(angle) * tree.canopyRadius * 0.7;
            const leafY = canopyY + Math.sin(angle) * tree.canopyRadius * 0.7;
            ctx.beginPath();
            ctx.arc(leafX, leafY, 18, 0, Math.PI * 2); // Larger leaf clusters
            ctx.fill();
        }

        // Add some highlight details for depth
        ctx.fillStyle = 'rgba(85, 130, 75, 0.4)';
        for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2;
            const highlightX = canopyX + Math.cos(angle) * tree.canopyRadius * 0.4;
            const highlightY = canopyY + Math.sin(angle) * tree.canopyRadius * 0.4;
            ctx.beginPath();
            ctx.arc(highlightX, highlightY, 12, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    ctx.restore();
}

// Menu transition state
let transitionState = {
    active: false,
    alpha: 0,
    direction: 1,
    duration: 500, // milliseconds
    startTime: 0
};

// Handle menu transitions
function startTransition(direction) {
    transitionState = {
        active: true,
        alpha: 0,
        direction: direction,
        duration: 500,
        startTime: Date.now()
    };
}

// Update transition
function updateTransition() {
    if (!transitionState.active) return;

    const elapsed = Date.now() - transitionState.startTime;
    const progress = Math.min(elapsed / transitionState.duration, 1);

    // Easing function for smooth transition
    const easeProgress = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    transitionState.alpha = easeProgress * transitionState.direction;

    if (progress >= 1) {
        transitionState.active = false;
    }
}

// Draw transition overlay
function drawTransition() {
    if (!transitionState.active) return;

    ctx.save();
    ctx.fillStyle = `rgba(0, 0, 0, ${transitionState.alpha})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
}

// Modify handleMenuSelection to include transitions
function handleMenuSelection() {
    startTransition(1);

    setTimeout(() => {
        switch (gameState.selectedOption) {
            case 0: // Start Game
                stopMenuMusic(); // Stop menu music when starting game
                startGameMusic(); // Start game music
                gameState.gameMode = 'regionSelect';
                break;
            case 1: // Settings
                gameState.gameMode = 'settings';
                break;
            case 2: // Store
                gameState.gameMode = 'store';
                break;
            case 3: // Support
                gameState.gameMode = 'support';
                break;
            case 4: // Exit
                window.close();
                break;
        }
    }, transitionState.duration);
}

// Draw menu screen
function drawMenu() {
    ctx.fillStyle = '#000033';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the background image
    ctx.globalAlpha = 0.1; // Make it subtle
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1.0;

    // Draw menu title
    ctx.fillStyle = '#FFD700';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('AZOV: The Resistance', canvas.width / 2, 100);

    // Draw menu options
    ctx.font = '32px Arial';
    gameState.menuOptions.forEach((option, index) => {
        if (index === gameState.selectedOption) {
            ctx.fillStyle = '#4a9eff';
            ctx.fillText('> ' + option + ' <', canvas.width / 2, 300 + index * 60);
        } else {
            ctx.fillStyle = '#fff';
            ctx.fillText(option, canvas.width / 2, 300 + index * 60);
        }
    });

    // Draw instructions
    ctx.font = '20px Arial';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Use ↑↓ to navigate, Enter to select', canvas.width / 2, canvas.height - 50);
}

// Settings screen state
let settingsState = {
    selectedOption: 0,
    options: [
        { name: 'Sound Effects', value: true, type: 'toggle' },
        { name: 'Background Music', value: true, type: 'toggle' },
        { name: 'Difficulty', value: 'Normal', type: 'select', options: ['Easy', 'Normal', 'Hard'] },
        { name: 'Volume', value: 0.7, type: 'slider', min: 0, max: 1, step: 0.1 }
    ]
};

// Update handleSettingsAdjustment
function handleSettingsAdjustment(direction) {
    const option = settingsState.options[settingsState.selectedOption];

    switch (option.type) {
        case 'toggle':
            option.value = !option.value;
            if (option.name === 'Sound Effects') {
                settings.soundEnabled = option.value;
            } else if (option.name === 'Background Music') {
                settings.musicEnabled = option.value;
                if (option.value) {
                    if (['menu', 'settings', 'store', 'support'].includes(gameState.gameMode)) {
                        startMenuMusic();
                    } else if (gameState.gameMode === 'playing' || gameState.gameMode === 'regionSelect') {
                        startGameMusic();
                    }
                } else {
                    stopMenuMusic();
                    stopGameMusic();
                }
            }
            break;

        case 'select':
            const currentIndex = option.options.indexOf(option.value);
            const newIndex = (currentIndex + direction + option.options.length) % option.options.length;
            option.value = option.options[newIndex];
            if (option.name === 'Difficulty') {
                settings.difficulty = option.value.toLowerCase();
                // Update difficulty multipliers
                switch (settings.difficulty) {
                    case 'easy':
                        settings.enemyHealthMultiplier = 0.8;
                        settings.enemySpeedMultiplier = 0.9;
                        settings.enemyDamageMultiplier = 0.8;
                        break;
                    case 'normal':
                        settings.enemyHealthMultiplier = 1;
                        settings.enemySpeedMultiplier = 1;
                        settings.enemyDamageMultiplier = 1;
                        break;
                    case 'hard':
                        settings.enemyHealthMultiplier = 1.2;
                        settings.enemySpeedMultiplier = 1.1;
                        settings.enemyDamageMultiplier = 1.2;
                        break;
                }
            }
            break;

        case 'slider':
            option.value = Math.max(option.min, Math.min(option.max,
                option.value + direction * option.step));
            if (option.name === 'Volume') {
                settings.volume = option.value;
                menuMusic.volume = option.value;
                gameMusic.volume = option.value;
                if (window.setVolume) {
                    window.setVolume(option.value);
                }
            }
            break;
    }
}

// Update drawSettings function
function drawSettings() {
    ctx.save();

    // Draw dark blue background
    ctx.fillStyle = '#000033';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the background image
    ctx.globalAlpha = 0.1; // Make it subtle
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1.0;

    // Draw title
    ctx.fillStyle = '#FFD700';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Settings', canvas.width / 2, 100);

    // Draw options
    ctx.font = '24px Arial';
    ctx.textAlign = 'left';

    settingsState.options.forEach((option, index) => {
        const y = 300 + index * 50;
        const isSelected = index === settingsState.selectedOption;

        // Draw option name
        ctx.fillStyle = isSelected ? '#4a9eff' : '#fff';
        ctx.fillText(option.name, canvas.width / 2 - 200, y);

        // Draw option value
        ctx.fillStyle = '#aaa';
        if (option.type === 'toggle') {
            ctx.fillText(option.value ? 'ON' : 'OFF', canvas.width / 2 + 100, y);
        } else if (option.type === 'select') {
            ctx.fillText(option.value, canvas.width / 2 + 100, y);
        } else if (option.type === 'slider') {
            const sliderWidth = 200;
            const sliderHeight = 10;
            const sliderX = canvas.width / 2 + 100;
            const sliderY = y - 5;

            // Draw slider track
            ctx.fillStyle = '#444';
            ctx.fillRect(sliderX, sliderY, sliderWidth, sliderHeight);

            // Draw slider handle
            const handleX = sliderX + (option.value - option.min) / (option.max - option.min) * sliderWidth;
            ctx.fillStyle = '#4a9eff';
            ctx.beginPath();
            ctx.arc(handleX, sliderY + sliderHeight / 2, 8, 0, Math.PI * 2);
            ctx.fill();

            // Draw value text
            ctx.fillText(Math.round(option.value * 100) + '%', sliderX + sliderWidth + 20, y);
        }
    });

    // Draw instructions
    ctx.font = '20px Arial';
    ctx.fillStyle = '#aaa';
    ctx.textAlign = 'center';
    ctx.fillText('Use Up/Down to select, Left/Right to adjust, Enter to save, Escape to cancel',
        canvas.width / 2, canvas.height - 50);

    ctx.restore();
}

// Update keyboard event listener for settings
document.addEventListener('keydown', (e) => {
    if (gameState.gameMode === 'settings') {
        switch (e.code) {
            case 'ArrowUp':
                settingsState.selectedOption = (settingsState.selectedOption - 1 + settingsState.options.length) % settingsState.options.length;
                break;
            case 'ArrowDown':
                settingsState.selectedOption = (settingsState.selectedOption + 1) % settingsState.options.length;
                break;
            case 'ArrowLeft':
                handleSettingsAdjustment(-1);
                break;
            case 'ArrowRight':
                handleSettingsAdjustment(1);
                break;
            case 'Enter':
                // Save settings
                startTransition(1);
                setTimeout(() => {
                    gameState.gameMode = 'menu';
                }, transitionState.duration);
                break;
            case 'Escape':
                // Cancel changes
                startTransition(1);
                setTimeout(() => {
                    gameState.gameMode = 'menu';
                }, transitionState.duration);
                break;
        }
    }
});

// Store items
const storeItems = [
    {
        name: 'Health Upgrade',
        description: 'Increase max health by 25',
        cost: 100,
        effect: () => {
            player.maxHealth += 25;
            player.health += 25;
        }
    },
    {
        name: 'Rapid Fire',
        description: 'Permanent 20% faster shooting',
        cost: 150,
        effect: () => {
            gameState.shootCooldown *= 0.8;
        }
    },
    {
        name: 'Shield Duration',
        description: 'Increase shield duration by 50%',
        cost: 200,
        effect: () => {
            powerUpTypes.shield.effect = (player) => {
                player.powerUps.shield = 450; // Increased from 300
            };
        }
    },
    {
        name: 'Double Damage',
        description: 'Increase double damage duration by 50%',
        cost: 250,
        effect: () => {
            powerUpTypes.doubleDamage.effect = (player) => {
                player.powerUps.doubleDamage = 600; // Increased from 400
            };
        }
    }
];

// Store state
let storeState = {
    selectedOption: 0,
    currency: 0
};

// Handle store input
document.addEventListener('keydown', (e) => {
    if (gameState.gameMode === 'store') {
        switch (e.code) {
            case 'ArrowUp':
                storeState.selectedOption = (storeState.selectedOption - 1 + storeItems.length) % storeItems.length;
                break;
            case 'ArrowDown':
                storeState.selectedOption = (storeState.selectedOption + 1) % storeItems.length;
                break;
            case 'Enter':
                handlePurchase();
                break;
            case 'Escape':
                gameState.gameMode = 'menu';
                break;
        }
    }
});

// Handle purchase
function handlePurchase() {
    const item = storeItems[storeState.selectedOption];
    if (storeState.currency >= item.cost) {
        storeState.currency -= item.cost;
        item.effect();
        playSound('powerUp');
    }
}

// Draw store screen
function drawStore() {
    ctx.save();

    // Draw dark blue background
    ctx.fillStyle = '#000033';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the background image
    ctx.globalAlpha = 0.1; // Make it subtle
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1.0;

    // Draw title
    ctx.fillStyle = '#FFD700';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Store', canvas.width / 2, 100);

    // Draw coming soon text
    ctx.font = '32px Arial';
    ctx.fillStyle = '#4a9eff';
    ctx.fillText('Coming Soon', canvas.width / 2, 300);

    // Draw description
    ctx.font = '20px Arial';
    ctx.fillStyle = '#aaa';
    const textLines = [
        'The store will be available in a future update.',
        'Check back soon for new weapons, abilities, and more!'
    ];

    textLines.forEach((line, index) => {
        ctx.fillText(line, canvas.width / 2, 400 + index * 30);
    });

    // Draw instructions
    ctx.fillStyle = '#aaa';
    ctx.fillText('Press Escape to return to menu', canvas.width / 2, canvas.height - 50);

    ctx.restore();
}

// Sound effects and music
const sounds = {
    background: null,
    shoot: null,
    enemyShoot: null,
    powerUp: null,
    hit: null,
    gameOver: null,
    explosion: null
};

// Play sound with settings check
function playSound(soundName) {
    if (!settings.soundEnabled) return;
    if (!window.soundSystem) return;
    try {
        window.soundSystem.playSound(soundName);
    } catch (error) {
        console.warn(`Error playing sound ${soundName}:`, error);
    }
}

// Initialize sounds
function initSounds() {
    // Nothing needed here - sounds are initialized in sounds.js
    console.log('Sound system ready');
}

// Test sound function
function testSound() {
    if (typeof window.testSound === 'function') {
        try {
            window.testSound();
        } catch (error) {
            console.warn('Error testing sound:', error);
        }
    }
}

// Settings state
let settings = {
    soundEnabled: true,
    musicEnabled: true,
    difficulty: 'normal', // 'easy', 'normal', 'hard'
    volume: 0.5
};

// Add menu music control
let menuMusic = new Audio('sounds/background-music-menu.wav');
menuMusic.loop = true;
menuMusic.volume = 0.5;

let gameMusic = new Audio('sounds/background-music-game.wav');
gameMusic.loop = true;
gameMusic.volume = 0.5;

// Add timeupdate event listeners to handle seamless looping
menuMusic.addEventListener('timeupdate', function () {
    const buffer = 0.25; // Start next loop 180ms before the current one ends
    if (this.currentTime > this.duration - buffer) {
        this.currentTime = 0;
        this.play();
    }
});

gameMusic.addEventListener('timeupdate', function () {
    const buffer = 0.15; // Start next loop 150ms before the current one ends
    if (this.currentTime > this.duration - buffer) {
        this.currentTime = 0;
        this.play();
    }
});

function startMenuMusic() {
    if (settings.musicEnabled) {
        menuMusic.currentTime = 0;
        menuMusic.play().catch(error => console.log('Error playing menu music:', error));
    }
}

function stopMenuMusic() {
    menuMusic.pause();
    menuMusic.currentTime = 0;
}

function startGameMusic() {
    if (settings.musicEnabled) {
        gameMusic.currentTime = 0;
        gameMusic.play().catch(error => console.log('Error playing game music:', error));
    }
}

function stopGameMusic() {
    gameMusic.pause();
    gameMusic.currentTime = 0;
}

// Modify game loop to include transitions
function gameLoop() {
    // Clear canvas
    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update transition
    updateTransition();

    // Handle music based on game mode
    if (['menu', 'settings', 'store', 'support'].includes(gameState.gameMode)) {
        // In menus
        if (menuMusic.paused && settings.musicEnabled) {
            stopGameMusic();
            startMenuMusic();
        }
    } else if (gameState.gameMode === 'playing' || gameState.gameMode === 'regionSelect') {
        // In game or region select
        if (gameMusic.paused && settings.musicEnabled) {
            stopMenuMusic();
            startGameMusic();
        }
    } else {
        // In other states (like game over)
        stopMenuMusic();
        stopGameMusic();
    }

    switch (gameState.gameMode) {
        case 'menu':
            drawMenu();
            break;
        case 'regionSelect':
            drawRegionSelect();
            break;
        case 'playing':
            // Draw battlefield background
            drawBattlefield();

            // Update game state
            updatePlayer();
            updateEnemies();
            updateAllies();  // Make sure allies are updated
            updateBullets();
            updateEnemyBullets();
            updateGrenades();
            updatePowerUps();
            updateWave();

            // Draw game objects
            drawPlayer();
            drawEnemies();
            drawBullets();
            drawEnemyBullets();
            drawGrenades();
            drawPowerUps();
            drawAllies();    // Draw allies
            drawHealthBar();
            // drawRegionHealthBar();
            drawPowerUpIndicators();

            // Draw building tops and tree leaves last (highest Z-index)
            drawBuildingTops();
            drawTreeLeaves();

            // Draw score, wave, and progress
            ctx.fillStyle = '#fff';
            ctx.font = '20px Arial';
            ctx.textAlign = 'left';
            ctx.fillText(`Score: ${gameState.score}`, 10, 30);
            ctx.fillText(`Region: ${gameState.selectedRegion}`, 210, 60);
            ctx.fillText(`Wave: ${gameState.wave}/${gameState.waveCount}`, 10, 60);

            // Draw wave progress bar
            const waveProgress = gameState.waveTimer / gameState.waveDuration;
            const progressBarWidth = 200;
            const progressBarHeight = 10;
            ctx.fillStyle = '#333';
            ctx.fillRect(10, 70, progressBarWidth, progressBarHeight);
            ctx.fillStyle = '#4a9eff';
            ctx.fillRect(10, 70, progressBarWidth * waveProgress, progressBarHeight);

            // Check for game over
            if (gameState.gameOver) {
                gameState.gameMode = 'gameOver';
            }
            break;
        case 'settings':
            drawSettings();
            break;
        case 'store':
            drawStore();
            break;
        case 'support':
            drawSupport();
            break;
        case 'gameOver':
            drawGameOver();
            if (keys.Space) {
                startTransition(1);
                setTimeout(() => {
                    gameState.gameMode = 'regionSelect';
                    // Reset game state but preserve region status
                    resetGame();
                    // Find first endangered region
                    const regions = Object.entries(ukraineRegions);
                    gameState.selectedRegionIndex = regions.findIndex(([_, region]) => region.isInDanger);
                }, transitionState.duration);
            }
            break;
    }

    // Draw transition overlay
    drawTransition();

    // Continue game loop
    requestAnimationFrame(gameLoop);
}

// Initialize battlefield when game starts
battlefield.init(ukraineRegions['kyiv']); // Use Kyiv as the default starting region

// Initialize sounds when game starts
initSounds();

// Start the game
gameLoop();

// Add ESC key handling for menu transitions
document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && gameState.gameMode !== 'menu') {
        startTransition(1);
        setTimeout(() => {
            gameState.gameMode = 'menu';
        }, transitionState.duration);
    }
});

// Add keyboard navigation for region selection
document.addEventListener('keydown', (e) => {
    if (gameState.gameMode === 'regionSelect') {
        const regions = Object.entries(ukraineRegions);
        const currentRegion = regions[gameState.selectedRegionIndex][1];
        const currentGridX = currentRegion.gridX;
        const currentGridY = currentRegion.gridY;

        let newIndex = -1;
        let bestDistance = Infinity;

        switch (e.code) {
            case 'ArrowUp':
                // Find closest region in upper rows
                regions.forEach(([_, region], index) => {
                    if (region.gridY < currentGridY) {
                        const xDist = Math.abs(region.gridX - currentGridX);
                        const yDist = currentGridY - region.gridY;
                        const distance = xDist + yDist;

                        if (distance < bestDistance) {
                            bestDistance = distance;
                            newIndex = index;
                        }
                    }
                });
                break;

            case 'ArrowDown':
                // Find closest region in lower rows
                regions.forEach(([_, region], index) => {
                    if (region.gridY > currentGridY) {
                        const xDist = Math.abs(region.gridX - currentGridX);
                        const yDist = region.gridY - currentGridY;
                        const distance = xDist + yDist;

                        if (distance < bestDistance) {
                            bestDistance = distance;
                            newIndex = index;
                        }
                    }
                });
                break;

            case 'ArrowLeft':
                // Find closest region to the left
                regions.forEach(([_, region], index) => {
                    if (region.gridX < currentGridX && Math.abs(region.gridY - currentGridY) <= 1) {
                        const distance = currentGridX - region.gridX;
                        if (distance < bestDistance) {
                            bestDistance = distance;
                            newIndex = index;
                        }
                    }
                });
                break;

            case 'ArrowRight':
                // Find closest region to the right
                regions.forEach(([_, region], index) => {
                    if (region.gridX > currentGridX && Math.abs(region.gridY - currentGridY) <= 1) {
                        const distance = region.gridX - currentGridX;
                        if (distance < bestDistance) {
                            bestDistance = distance;
                            newIndex = index;
                        }
                    }
                });
                break;

            case 'Enter':
                const selectedRegion = regions[gameState.selectedRegionIndex][1];
                if (selectedRegion.isInDanger) {
                    gameState.selectedRegion = regions[gameState.selectedRegionIndex][0];
                    gameState.waveCount = selectedRegion.waves;
                    startTransition(1);
                    setTimeout(() => {
                        gameState.gameMode = 'playing';
                        resetGame();
                        stopMenuMusic();
                        startGameMusic();
                    }, transitionState.duration);
                }
                break;
        }

        // Update the selected index if a valid region was found
        if (newIndex !== -1) {
            gameState.selectedRegionIndex = newIndex;
        }
    }
});

// Update the drawRegionSelect function to use our new map
function drawRegionSelect() {
    ctx.fillStyle = '#000033';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the background image
    ctx.globalAlpha = 0.1; // Make it subtle
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1.0;

    // Draw title
    ctx.fillStyle = '#FFD700';
    ctx.font = '36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Select Region', canvas.width / 2, 50);

    // Calculate grid layout parameters
    const gridStartX = 80;  // Moved more to the left (was 150)
    const gridStartY = 220;
    const cellWidth = 100;
    const cellHeight = 60;
    const padding = 5;

    // Draw regions in a grid that roughly follows Ukraine's shape
    Object.entries(ukraineRegions).forEach(([regionName, region]) => {
        // Calculate position based on grid coordinates
        const x = gridStartX + region.gridX * (cellWidth + padding * 2);
        const y = gridStartY + region.gridY * (cellHeight + padding * 2);

        // Draw region box background
        const isSelected = regionName === Object.keys(ukraineRegions)[gameState.selectedRegionIndex];
        ctx.fillStyle = isSelected ? 'rgba(74, 158, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(x + padding, y + padding, cellWidth - padding * 2, cellHeight - padding * 2);

        // Draw region border
        ctx.strokeStyle = isSelected ? '#4a9eff' : 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = isSelected ? 2 : 1;
        ctx.strokeRect(x + padding, y + padding, cellWidth - padding * 2, cellHeight - padding * 2);

        // Draw region name
        ctx.font = isSelected ? 'bold 14px Arial' : '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = region.isLiberated ? '#4a9eff' :
            region.isInDanger ? '#ff4a4a' :
                '#808080';
        ctx.fillText(region.name, x + cellWidth / 2, y + 25);

        // Draw status indicator
        ctx.font = '10px Arial';
        ctx.fillStyle = '#aaa';
        let status = region.isLiberated ? 'Liberated' :
            region.isInDanger ? 'Under Attack' :
                'Secure';
        ctx.fillText(status, x + cellWidth / 2, y + 40);

        // If selected, draw wave count
        if (isSelected) {
            ctx.fillStyle = '#fff';
            ctx.fillText(`Waves: ${region.waves}`, x + cellWidth / 2, y + cellHeight - 10);
        }

        // Draw connections to neighboring regions
        ctx.strokeStyle = 'rgba(74, 158, 255, 0.3)';
        ctx.lineWidth = 1;
        region.neighbors.forEach(neighborName => {
            const neighbor = ukraineRegions[neighborName];
            if (neighbor) {
                const nx = gridStartX + neighbor.gridX * (cellWidth + padding * 2) + cellWidth / 2;
                const ny = gridStartY + neighbor.gridY * (cellHeight + padding * 2) + cellHeight / 2;
                ctx.beginPath();
                ctx.moveTo(x + cellWidth / 2, y + cellHeight / 2);
                ctx.lineTo(nx, ny);
                ctx.stroke();
            }
        });
    });

    // Draw instructions
    ctx.font = '20px Arial';
    ctx.fillStyle = '#aaa';
    ctx.textAlign = 'center';
    const selectedRegion = Object.values(ukraineRegions)[gameState.selectedRegionIndex];
    if (selectedRegion.isInDanger) {
        ctx.fillText('Press Enter to defend this region', canvas.width / 2, canvas.height - 30);
    } else if (selectedRegion.isLiberated) {
        ctx.fillText('Region already liberated', canvas.width / 2, canvas.height - 30);
    } else {
        ctx.fillText('Region is currently secure', canvas.width / 2, canvas.height - 30);
    }

    ctx.fillStyle = '#aaa';
    ctx.font = '16px Arial';
    ctx.fillText('Use arrow keys to navigate between regions', canvas.width / 2, canvas.height - 60);
}



// Add checkCollisionWithObstacles function
function checkCollisionWithObstacles(entity) {
    // Check collision with buildings
    for (const building of battlefield.buildings) {
        if (checkCollision(entity, building)) {
            return true;
        }
    }

    // Check collision with rocks
    for (const rock of battlefield.rocks) {
        if (checkCollision(entity, rock)) {
            return true;
        }
    }

    // Check collision with barriers
    for (const barrier of battlefield.barriers) {
        if (checkCollision(entity, barrier)) {
            return true;
        }
    }

    // Check collision with trees
    for (const tree of battlefield.trees) {
        if (checkCollision(entity, tree)) {
            return true;
        }
    }

    // Handle water effects for player only
    if (entity === player) {
        let inWater = false;
        let speedMultiplier = 1;

        // Check deep water
        for (const water of battlefield.deepWater) {
            if (checkCollision(entity, water)) {
                inWater = true;
                speedMultiplier = 0.1; // 90% speed reduction
                break;
            }
        }

        // Check shallow water if not in deep water
        if (!inWater) {
            for (const water of battlefield.shallowWater) {
                // For oval shallow water, check if player is within the ellipse
                const centerX = water.x;
                const centerY = water.y;
                const normalizedX = (entity.x + entity.width / 2 - centerX) / water.radiusX;
                const normalizedY = (entity.y + entity.height / 2 - centerY) / water.radiusY;
                if ((normalizedX * normalizedX + normalizedY * normalizedY) <= 1) {
                    inWater = true;
                    speedMultiplier = 0.5; // 50% speed reduction
                    break;
                }
            }
        }

        // Apply speed effect if in water
        if (inWater) {
            player.speed = 2.1 * speedMultiplier;
        } else {
            player.speed = 2.1;
        }
    }

    return false;
}

// Draw ally soldiers
function drawAllies() {
    ctx.save();
    gameState.allies.forEach(ally => {
        if (!ally.isAlive) return;

        // Draw body
        ctx.fillStyle = ally.color;
        ctx.fillRect(ally.x, ally.y + 16, ally.width, ally.height - 16);

        // Draw uniform details
        ctx.fillStyle = '#3a7ed6';
        // Chest pockets
        ctx.fillRect(ally.x + 2, ally.y + 20, 4, 4);
        ctx.fillRect(ally.x + ally.width - 6, ally.y + 20, 4, 4);
        // Belt
        ctx.fillRect(ally.x, ally.y + 28, ally.width, 1);
        // Shoulder straps
        ctx.fillRect(ally.x + 1, ally.y + 16, 1, 4);
        ctx.fillRect(ally.x + ally.width - 2, ally.y + 16, 1, 4);

        // Draw head with recoil effect
        const headX = ally.x + ally.width / 2 + (ally.recoilOffset * ally.direction);
        const headY = ally.y + 12;
        const headRadius = 8;

        // Draw bottom half (skin color)
        ctx.beginPath();
        ctx.fillStyle = '#FFD1B3';
        ctx.arc(headX, headY, headRadius, 0, Math.PI);
        ctx.fill();

        // Draw top half (helmet)
        ctx.beginPath();
        ctx.fillStyle = ally.color;
        ctx.arc(headX, headY, headRadius, Math.PI, Math.PI * 2);
        ctx.fill();

        // Draw helmet line
        ctx.beginPath();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.moveTo(headX - headRadius, headY);
        ctx.lineTo(headX + headRadius, headY);
        ctx.stroke();

        // Draw arms with dynamic movement
        ctx.strokeStyle = '#1a4e9f';
        ctx.lineWidth = 6;

        const shoulderY = ally.y + 24;
        const shoulderX = ally.x + (ally.direction > 0 ? ally.width - 4 : 4);
        const rifleY = shoulderY;
        const rifleX = ally.x + (ally.direction > 0 ? ally.width : 0) + (ally.recoilOffset * ally.direction);

        // Draw back arm with adjusted elbow position during shooting
        ctx.beginPath();
        ctx.moveTo(shoulderX, shoulderY);
        const backElbowX = shoulderX + (ally.direction > 0 ? (ally.recoilOffset > 0 ? -2 : -8) : (ally.recoilOffset > 0 ? 2 : 8));
        const backElbowY = shoulderY + (ally.recoilOffset > 0 ? 4 : 12);
        ctx.lineTo(backElbowX, backElbowY);
        ctx.lineTo(rifleX - (ally.direction > 0 ? 4 : -4), rifleY + 2);
        ctx.stroke();

        // Draw front arm with adjusted elbow position during shooting
        ctx.beginPath();
        ctx.moveTo(shoulderX, shoulderY);
        const frontElbowX = shoulderX + (ally.direction > 0 ? (ally.recoilOffset > 0 ? 6 : 12) : (ally.recoilOffset > 0 ? -6 : -12));
        const frontElbowY = shoulderY + (ally.recoilOffset > 0 ? 2 : 8);
        ctx.lineTo(frontElbowX, frontElbowY);
        ctx.lineTo(rifleX + (ally.direction > 0 ? 16 : -16), rifleY);
        ctx.stroke();

        // Draw rifle with recoil effect
        ctx.save();
        ctx.translate(rifleX, rifleY);
        ctx.rotate(ally.direction > 0 ? 0 : Math.PI);

        // AK-47 body
        ctx.fillStyle = '#8B4513'; // Wood color for furniture
        ctx.fillRect(-4, -2, 8, 8); // Stock base
        ctx.fillRect(-8, -1, 4, 6); // Stock back

        // Main receiver
        ctx.fillStyle = '#444';
        ctx.fillRect(0, -2, 32, 4);

        // Gas tube
        ctx.fillStyle = '#333';
        ctx.fillRect(16, -4, 20, 2);

        // Front sight and muzzle brake
        ctx.fillRect(36, -2, 4, 4);
        ctx.fillRect(40, -3, 6, 2);
        ctx.fillRect(40, 1, 6, 2);

        // Handguard
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(8, -3, 16, 2);
        ctx.fillRect(8, 1, 16, 2);

        ctx.restore();

        // Draw curved magazine
        ctx.save();
        ctx.translate(rifleX + (ally.direction > 0 ? 12 : -12), rifleY);
        ctx.beginPath();
        ctx.fillStyle = '#666';
        if (ally.direction > 0) {
            ctx.moveTo(0, 2);
            ctx.quadraticCurveTo(4, 8, 8, 12);
            ctx.lineTo(12, 12);
            ctx.quadraticCurveTo(8, 6, 4, 2);
        } else {
            ctx.moveTo(0, 2);
            ctx.quadraticCurveTo(-4, 8, -8, 12);
            ctx.lineTo(-12, 12);
            ctx.quadraticCurveTo(-8, 6, -4, 2);
        }
        ctx.fill();
        ctx.restore();

        // Draw legs with animation
        ctx.fillStyle = '#4a9eff';
        if (ally.runFrame === 0) {
            ctx.fillRect(ally.x + 4, ally.y + 48, 3, 16);
            ctx.fillRect(ally.x + 9, ally.y + 48, 3, 16);
        } else if (ally.runFrame === 1) {
            ctx.fillRect(ally.x + 2, ally.y + 48, 3, 16);
            ctx.fillRect(ally.x + 11, ally.y + 48, 3, 16);
        } else if (ally.runFrame === 2) {
            ctx.fillRect(ally.x + 6, ally.y + 48, 3, 16);
            ctx.fillRect(ally.x + 7, ally.y + 48, 3, 16);
        }

        // Draw health bar if damaged
        if (ally.health < 50) {
            const healthPercent = ally.health / 50;
            const barWidth = ally.width;
            const barHeight = 4;

            ctx.fillStyle = '#333';
            ctx.fillRect(ally.x, ally.y - 8, barWidth, barHeight);

            ctx.fillStyle = '#ff0000';
            ctx.fillRect(ally.x, ally.y - 8, barWidth * healthPercent, barHeight);
        }
    });
    ctx.restore();
}

// Update ally soldiers
function updateAllies() {
    const now = Date.now();

    gameState.allies.forEach(ally => {
        if (!ally.isAlive) return;

        // Initialize lastDirectionChange if not set
        if (!ally.lastDirectionChange) {
            ally.lastDirectionChange = now;
        }

        // Randomly change direction every 2-5 seconds
        const directionChangeInterval = ally.directionChangeInterval || (2000 + Math.random() * 3000);
        if (now - ally.lastDirectionChange > directionChangeInterval) {
            // 50% chance to flip direction
            if (Math.random() < 0.5) {
                ally.direction *= -1;
            }
            ally.lastDirectionChange = now;
            // Set new random interval for next change
            ally.directionChangeInterval = 2000 + Math.random() * 3000;
        }

        // Check for enemy bullets hitting allies
        gameState.enemyBullets = gameState.enemyBullets.filter(bullet => {
            if (checkCollision(bullet, ally)) {
                ally.health -= 10;
                if (ally.health <= 0) {
                    ally.isAlive = false;
                    // Play death sound
                    playSound('enemyDeath1');
                }
                return false;
            }
            return true;
        });

        // Random shooting behavior
        if (now - ally.lastShot > ally.shootCooldown && Math.random() < ally.shootChance) {
            // Create bullet
            const bulletX = ally.x + ally.width / 2 - bulletProps.width / 2;
            const bulletY = ally.y;

            gameState.bullets.push({
                x: bulletX,
                y: bulletY,
                width: bulletProps.width,
                height: bulletProps.height,
                speedY: -bulletProps.speed,  // Negative speed to move upward
                damage: player.damage        // Use same damage as player
            });

            // Add recoil effect
            ally.recoilOffset = 5;
            ally.lastShot = now;

            // Play shoot sound
            playSound('shoot');
        }

        // Update recoil effect
        if (ally.recoilOffset > 0) {
            ally.recoilOffset -= 0.5;
        }
    });
}

// Add new function to draw building tops (decorative part)
function drawBuildingTops() {
    battlefield.buildings.forEach(building => {
        // Draw building facade (rectangular shape for visual appeal)
        const facadeWidth = building.width * 0.8; // Slightly narrower than base
        const facadeX = building.x + (building.width - facadeWidth) / 2;

        // Create gradient for building facade
        const gradient = ctx.createLinearGradient(
            facadeX, building.y,
            facadeX + facadeWidth, building.y + building.height
        );
        gradient.addColorStop(0, '#888');    // Lighter gray at top
        gradient.addColorStop(0.4, '#666');  // Medium gray in middle
        gradient.addColorStop(0.7, '#444');  // Darker gray lower
        gradient.addColorStop(1, '#333');    // Darkest at bottom

        ctx.fillStyle = gradient;
        ctx.fillRect(facadeX, building.y, facadeWidth, building.height);

        // Add windows
        const windowWidth = facadeWidth * 0.15;
        const windowHeight = windowWidth * 1.5;
        const windowSpacing = windowWidth * 1.2;
        const rows = Math.floor(building.height / (windowHeight + windowSpacing));
        const cols = Math.floor(facadeWidth / (windowWidth + windowSpacing));

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const windowX = facadeX + col * (windowWidth + windowSpacing);
                const windowY = building.y + row * (windowHeight + windowSpacing);

                // Draw window frame
                ctx.fillStyle = '#444';
                ctx.fillRect(windowX, windowY, windowWidth, windowHeight);

                // Draw window glass
                ctx.fillStyle = '#88ccff';
                ctx.fillRect(windowX + 2, windowY + 2, windowWidth - 4, windowHeight - 4);
            }
        }
    });
}

// Add support page state
let supportState = {
    selectedOption: 0,
    options: ['Buy Me a Coffee']
};

// Draw support screen
function drawSupport() {
    ctx.save();

    // Draw dark blue background
    ctx.fillStyle = '#000033';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the background image with the same style as the main menu
    ctx.globalAlpha = 0.1;
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1.0;

    // Draw title
    ctx.fillStyle = '#FFD700';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Support the Game', canvas.width / 2, 100);

    // Draw support text
    ctx.font = '24px Arial';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    const textLines = [
        'By supporting the game, you help us improve and expand:',
        '',
        '• Add new regions and missions',
        '• Create new enemy types and weapons',
        '• Improve graphics and animations',
        '• Add new power-ups and abilities',
        '• Develop multiplayer features',
        '',
        'Your support makes this possible!'
    ];

    textLines.forEach((line, index) => {
        ctx.fillText(line, canvas.width / 2, 200 + index * 40);
    });

    // Draw buttons
    const buttonSpacing = 80;
    const buttonWidth = 300;
    const buttonHeight = 60;
    const startY = 600;

    supportState.options.forEach((option, index) => {
        const buttonY = startY + (buttonHeight + buttonSpacing) * index;
        const buttonX = canvas.width / 2 - buttonWidth / 2;

        // Draw button background with hover effect
        ctx.fillStyle = supportState.selectedOption === index ? '#5ab9ff' : '#4a9eff';
        ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);

        // Draw button text
        ctx.fillStyle = '#fff';
        ctx.font = '28px Arial';
        ctx.fillText(option, canvas.width / 2, buttonY + 40);
    });

    // Draw instructions
    ctx.font = '20px Arial';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Use ↑↓ to select, Enter to confirm, Escape to return to menu', canvas.width / 2, canvas.height - 50);

    ctx.restore();
}

// Update support page keyboard handling
document.addEventListener('keydown', (e) => {
    if (gameState.gameMode === 'support') {
        switch (e.code) {
            case 'ArrowUp':
                supportState.selectedOption = (supportState.selectedOption - 1 + supportState.options.length) % supportState.options.length;
                break;
            case 'ArrowDown':
                supportState.selectedOption = (supportState.selectedOption + 1) % supportState.options.length;
                break;
            case 'Enter':
                if (supportState.selectedOption === 0) {
                    window.open('https://buymeacoffee.com/darkesto', '_blank');
                } else {
                    startTransition(1);
                    setTimeout(() => {
                        gameState.gameMode = 'menu';
                    }, transitionState.duration);
                }
                break;
            case 'Escape':
                startTransition(1);
                setTimeout(() => {
                    gameState.gameMode = 'menu';
                }, transitionState.duration);
                break;
        }
    }
});

