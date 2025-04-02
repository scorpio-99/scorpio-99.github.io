import React from 'react';
import data from '../data/data';

function FunFacts() {
    return (
        <div className="fun-facts card section-spacing">
            <h2>Our Story in Numbers</h2>
            <div className="facts-container" id="facts-container">
                {data.funFacts.map((fact, index) => (
                    <div key={index} className="fact card hover-grow">
                        <div className="number">{fact.number}</div>
                        <div className="label">{fact.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FunFacts; 