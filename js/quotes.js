function updateQuote() {
    const quoteElement = document.getElementById('quote');
    const randomQuote = data.quotes[Math.floor(Math.random() * data.quotes.length)];
    quoteElement.textContent = randomQuote;
}

setInterval(updateQuote, 5000);
updateQuote(); 