import {DateTime} from "luxon";

export const DATE_FORMAT = 'dd.MM.yyyy';

const utils = {
    formatDate: (date) => DateTime.fromJSDate(date).toFormat(DATE_FORMAT),

    createRandomEmoji: (emojis) =>
        emojis[Math.floor(Math.random() * emojis.length)],

    createElement: (className, text) => {
        const element = document.createElement('div');
        element.className = className;
        if (text) element.textContent = text;
        return element;
    }
};

export default utils; 