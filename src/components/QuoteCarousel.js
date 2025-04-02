import React, {useEffect, useState} from 'react';
import data, {QUOTE_INTERVAL} from '../data/data';

function QuoteCarousel() {
    const [quote, setQuote] = useState('');

    const updateQuote = () => {
        const randomQuote = data.quotes[Math.floor(Math.random() * data.quotes.length)];
        setQuote(randomQuote);
    };

    useEffect(() => {
        updateQuote();
        const interval = setInterval(updateQuote, QUOTE_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="quote-carousel card hover-grow-sm section-spacing">
            <div className="quote-wrapper">
                <div className="heart">❤</div>
                <div id="quote" className="quote">{quote}</div>
            </div>
        </div>
    );
}

export default QuoteCarousel; 