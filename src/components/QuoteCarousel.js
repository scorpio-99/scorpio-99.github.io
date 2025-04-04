import React, {useEffect, useState} from 'react';

import Section from './common/Section';
import data from '../data/data.json';
import {QUOTE_INTERVAL} from '../data/constants';

function QuoteCarousel() {
    const [quote, setQuote] = useState('');

    useEffect(() => {
        const getRandomQuote = () => {
            const randomIndex = Math.floor(Math.random() * data.quotes.length);
            return data.quotes[randomIndex];
        };

        const updateQuote = () => setQuote(getRandomQuote());

        // Set initial quote
        updateQuote();

        // Set up interval for quote rotation
        const interval = setInterval(updateQuote, QUOTE_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    return (
        <Section card hover className="quote-carousel">
            <div className="quote-wrapper">
                <div className="heart">❤</div>
                <div className="quote">{quote}</div>
            </div>
        </Section>
    );
}

export default QuoteCarousel; 