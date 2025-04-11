import React, { useState } from 'react';
import Section from './common/Section';
import Map from './map/Map';
import data from '../data/data.json';

function Places() {
    const [selectedPlace, setSelectedPlace] = useState(null);

    const handlePlaceClick = (place) => {
        setSelectedPlace(place);
    };

    const handleMarkerClick = (place) => {
        setSelectedPlace(place);
    };

    return (
        <Section card title="Our Special Places" className="our-places">
            <div className="places-container">
                <div className="places-map">
                    <Map 
                        places={data.places}
                        center={[50.933, 6.950]}
                        zoom={7}
                        onMarkerClick={handleMarkerClick}
                        selectedPlace={selectedPlace}
                    />
                </div>
                <div className="places-sidebar">
                    <div className="places-list">
                        {data.places.map((place, index) => (
                            <div
                                key={index}
                                className={`place-item ${selectedPlace === place ? 'active' : ''}`}
                                onClick={() => handlePlaceClick(place)}
                            >
                                <div className={"place-name"}>{place.name}</div>
                                <span className="place-date">{place.date}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}

export default Places; 