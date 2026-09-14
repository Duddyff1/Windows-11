let gameData = {
    robux: 500,
    coins: 50,
    dragonHp: 100,
    inventory: []
};

function loadData() {
    const saved = localStorage.getItem('dragonSimData');
    if (saved) {
        gameData = JSON.parse(saved);
    }
    updateUI();
}

function saveData() {
    localStorage.setItem('dragonSimData', JSON.stringify(gameData));
}

function updateUI() {
    document.getElementById('robux-display').innerText = gameData.robux;
    document.getElementById('coins-display').innerText = gameData.coins;
    
    let hpPercent = (gameData.dragonHp / 100) * 100;
    document.getElementById('dragon-hp').style.width = hpPercent + '%';

    const invList = document.getElementById('inventory-list');
    invList.innerHTML = '';
    gameData.inventory.forEach(item => {
        let li = document.createElement('li');
        li.innerText = `${item.name} (Color: ${item.color})`;
        invList.appendChild(li);
    });
}

function attackDragon() {
    gameData.dragonHp -= 20;
    if (gameData.dragonHp <= 0) {
        gameData.dragonHp = 100;
        gameData.coins += 25;
    }
    saveData();
    updateUI();
}

function buyItem(name, cost) {
    if (gameData.robux >= cost) {
        gameData.robux -= cost;
        gameData.inventory.push({
            name: name,
            color: 'Gold',
            equipped: false
        });
        saveData();
        updateUI();
    } else {
        alert('Not enough Robux!');
    }
}

window.onload = loadData;
