import React from 'react';
import data from '../data/data';
import Card from './common/Card';

function FunFacts() {
    return (
        <Card title="Our Story in Numbers" className="fun-facts">
            <div className="facts-container">
                {data.funFacts.map((fact, index) => (
                    <div key={index} className="fact card hover-grow">
                        <div className="number">{fact.number}</div>
                        <div className="label">{fact.label}</div>
                    </div>
                ))}
            </div>
        </Card>
    );
}

export default FunFacts; 