import {useEffect} from 'react';
import {ANIMATION_SETTINGS} from '../data/constants';
import utils from '../utils/utils';

function HeartAnimation() {
    useEffect(() => {
        const createHeart = (x, y) => {
            const heart = utils.createElement('floating-heart', '❤️');
            heart.style.left = x + 'px';
            heart.style.top = y + 'px';
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), ANIMATION_SETTINGS.heartDuration);
        };
        
        const handleClick = (e) => {
            createHeart(e.pageX, e.pageY);
        };

        document.addEventListener('click', handleClick);
        
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    return null; // This component doesn't render anything visible
}

export default HeartAnimation; 