import React from 'react';

function Card({title, children, className = '', hover = false}) {
    return (
        <div className={`card section-spacing ${hover ? 'hover-grow' : ''} ${className}`}>
            {title && <h2>{title}</h2>}
            {children}
        </div>
    );
}

export default Card; 