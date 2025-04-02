import React from 'react';

function MusicPlayer() {
    return (
        <div className="music-player card section-spacing">
            <h2>Our Song</h2>
            <audio controls className="hover-grow">
                <source src="assets/adele.mp3" type="audio/mpeg"/>
                Your browser does not support the audio element.
            </audio>
        </div>
    );
}

export default MusicPlayer; 