import React from 'react';
import data from '../data/data';
import Card from './common/Card';

function BucketList() {
    return (
        <Card title="Our Future Adventures" className="bucket-list">
            <ul className="plans">
                {data.bucketList.map((plan, index) => (
                    <li key={index} className="plan-item card hover-grow">
                        <div className="plan-text">{plan.item}</div>
                        <div className="plan-status">{plan.status}</div>
                    </li>
                ))}
            </ul>
        </Card>
    );
}

export default BucketList; 