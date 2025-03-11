const quotes = [
    "Every love story is beautiful, but ours is my favorite.",
    "You're the first thought in my morning and the last thought in my night.",
    "With you, every day feels like Valentine's Day.",
    "In your smile, I see something more beautiful than the stars.",
    "You make my heart smile.",
    "Life is better when I'm with you.",
    "You're my favorite notification."
];

function updateQuote() {
    const quoteElement = document.getElementById('quote');
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteElement.textContent = randomQuote;
}

setInterval(updateQuote, 5000);
updateQuote(); 