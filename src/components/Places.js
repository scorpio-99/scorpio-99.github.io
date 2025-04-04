import React from 'react';
import Card from './common/Card';
import Map from './map/Map';
import data from '../data/data';

function Places() {
    return (
        <Card title="Our Special Places" className="our-places">
            <Map 
                places={data.places}
                center={[50.933, 6.950]}
                zoom={7}
            />
        </Card>
    );
}

export default Places; 