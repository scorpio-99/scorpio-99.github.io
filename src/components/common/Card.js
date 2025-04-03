import React from 'react';

function Card({ title, children, className = '' }) {
    return (
        <div className={`card section-spacing ${className}`}>
            {title && <h2>{title}</h2>}
            {children}
        </div>
    );
}

export default Card; 