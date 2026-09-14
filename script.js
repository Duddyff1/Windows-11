// Window Manager Logic
function openApp(appId) {
    const appWindow = document.getElementById(appId);
    if (appWindow) {
        appWindow.classList.remove('hidden');
    }
}

function closeApp(appId) {
    const appWindow = document.getElementById(appId);
    if (appWindow) {
        appWindow.classList.add('hidden');
    }
}

// Calculator Logic
function appendCalc(val) {
    document.getElementById('calc-display').value += val;
}

function clearCalc() {
    document.getElementById('calc-display').value = '';
}

function calculateResult() {
    try {
        let result = eval(document.getElementById('calc-display').value);
        document.getElementById('calc-display').value = result;
    } catch (e) {
        document.getElementById('calc-display').value = 'Error';
    }
}

// Retro Dragon Simulator Logic
let gameData = {
    robux: 500,
    coins: 50,
    dragonHp: 100,
    inventory: []
};

function loadDragonData() {
    const saved = localStorage.getItem('dragonSimData');
    if (saved) gameData = JSON.parse(saved);
    updateDragonUI();
}

function saveDragonData() {
    localStorage.setItem('dragonSimData', JSON.stringify(gameData));
}

function updateDragonUI() {
    const robuxEl = document.getElementById('robux-display');
    const coinsEl = document.getElementById('coins-display');
    if (!robuxEl || !coinsEl) return;

    robuxEl.innerText = gameData.robux;
    coinsEl.innerText = gameData.coins;
    
    let hpPercent = (gameData.dragonHp / 100) * 100;
    const hpBar = document.getElementById('dragon-hp');
    if (hpBar) hpBar.style.width = hpPercent + '%';

    const invList = document.getElementById('inventory-list');
    if (invList) {
        invList.innerHTML = '';
        gameData.inventory.forEach(item => {
            let li = document.createElement('li');
            li.innerText = `${item.name} (${item.color})`;
            invList.appendChild(li);
        });
    }
}

function attackDragon() {
    gameData.dragonHp -= 20;
    if (gameData.dragonHp <= 0) {
        gameData.dragonHp = 100;
        gameData.coins += 25;
    }
    saveDragonData();
    updateDragonUI();
}

function buyItem(name, cost) {
    if (gameData.robux >= cost) {
        gameData.robux -= cost;
        gameData.inventory.push({ name: name, color: 'Gold' });
        saveDragonData();
        updateDragonUI();
    } else {
        alert('Not enough Robux!');
    }
}

// Airline Idle Simulation Mock Logic
let airlineCash = 1000;
function upgradeAirline() {
    airlineCash += 500;
    document.getElementById('airline-cash').innerText = airlineCash;
}

window.addEventListener('DOMContentLoaded', () => {
    loadDragonData();
});
