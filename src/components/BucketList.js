import React from 'react';
import data from '../data/data';

function BucketList() {
    return (
        <div className="bucket-list card section-spacing">
            <h2>Our Future Adventures</h2>
            <ul className="plans" id="plans-list">
                {data.bucketList.map((plan, index) => (
                    <li key={index} className="plan-item card hover-grow">
                        <div className="plan-text">{plan.item}</div>
                        <div className="plan-status">{plan.status}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BucketList; 