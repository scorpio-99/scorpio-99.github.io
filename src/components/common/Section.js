import React from 'react';

function Section({title, children, className = '', card = false, hover = false}) {
    const classes = [
        card && 'card',
        hover && 'hover-grow',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={classes}>
            {title && <div className={'subtitle'}>{title}</div>}
            {children}
        </div>
    );
}

export default Section;