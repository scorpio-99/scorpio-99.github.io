import React, { useEffect, useState } from 'react';
import data from '../data/data';
import { QUOTE_INTERVAL } from '../data/constants';

function QuoteCarousel() {
    const [quote, setQuote] = useState('');

    useEffect(() => {
        const getRandomQuote = () => {
            const quotes = data.quotes;
            const randomIndex = Math.floor(Math.random() * quotes.length);
            return quotes[randomIndex];
        };

        const updateQuote = () => setQuote(getRandomQuote());
        
        // Set initial quote
        updateQuote();
        
        // Set up interval for quote rotation
        const interval = setInterval(updateQuote, QUOTE_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="quote-carousel card hover-grow-sm section-spacing">
            <div className="quote-wrapper">
                <div className="heart">❤</div>
                <div className="quote">{quote}</div>
            </div>
        </div>
    );
}

export default QuoteCarousel; 