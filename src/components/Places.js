import React from 'react';
import Section from './common/Section';
import Map from './map/Map';
import data from '../data/data.json';

function Places() {
    return (
        <Section card title="Our Special Places" className="our-places">
            <Map 
                places={data.places}
                center={[50.933, 6.950]}
                zoom={7}
            />
        </Section>
    );
}

export default Places; 