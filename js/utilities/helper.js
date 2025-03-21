// Constants
const DATE_FORMAT = 'dd.MM.yyyy';

const utils = {
    formatDate: (date) => luxon.DateTime.fromJSDate(date).toFormat(DATE_FORMAT),

    createRandomEmoji: () =>
        CELEBRATION_EMOJIS[Math.floor(Math.random() * CELEBRATION_EMOJIS.length)],

    createElement: (className, text) => {
        const element = document.createElement('div');
        element.className = className;
        if (text) element.textContent = text;
        return element;
    }
};
