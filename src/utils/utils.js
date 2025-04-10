const utils = {
    createElement: (className, text) => {
        const element = document.createElement('div');
        element.className = className;
        if (text) element.textContent = text;
        return element;
    },
};

export default utils; 