import {useEffect} from 'react';
import {ANIMATION_SETTINGS} from '../data/data';
import utils from '../utils/utils';

function HeartAnimation() {
    useEffect(() => {
        const handleClick = (e) => {
            const heart = utils.createElement('floating-heart', '❤️');
            heart.style.left = e.pageX + 'px';
            heart.style.top = e.pageY + 'px';
            document.body.appendChild(heart);

            setTimeout(() => heart.remove(), ANIMATION_SETTINGS.heartDuration);
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    return null; // This component doesn't render anything visible
}

export default HeartAnimation; 