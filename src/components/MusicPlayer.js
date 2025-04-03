import React from 'react';
import Card from './common/Card';

function MusicPlayer() {
    return (
        <Card title="Our Song" className="music-player">
            <audio controls className="hover-grow">
                <source src="assets/adele.mp3" type="audio/mpeg"/>
                Your browser does not support the audio element.
            </audio>
        </Card>
    );
}

export default MusicPlayer; 