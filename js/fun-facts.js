function displayFunFacts() {
    const container = document.getElementById('facts-container');
    container.innerHTML = funFacts.map(fact => `
        <div class="fact">
            <div class="number">${fact.number}</div>
            <div class="label">${fact.label}</div>
        </div>
    `).join('');
}

displayFunFacts(); 