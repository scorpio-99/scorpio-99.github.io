function displayFunFacts() {
    const container = document.getElementById('facts-container');
    container.innerHTML = data.funFacts.map(fact => `
        <div class="fact card hover-grow">
            <div class="number">${fact.number}</div>
            <div class="label">${fact.label}</div>
        </div>
    `).join('');
}

displayFunFacts(); 