const funFacts = [
    {
        number: "147",
        label: "Messages on First Day"
    },
    {
        number: "5",
        label: "Hours on First Date"
    },
    {
        number: "5",
        label: "Countries Explored Together"
    },
    {
        number: "∞",
        label: "Moments to Come"
    }
];

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