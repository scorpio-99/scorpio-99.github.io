import {DateTime} from "luxon";
import {DATE_FORMAT} from "../data/constants";

const utils = {
    formatDate: (date) => DateTime.fromJSDate(date).toFormat(DATE_FORMAT),

    createRandomEmoji: (emojis) =>
        emojis[Math.floor(Math.random() * emojis.length)],

    createElement: (className, text) => {
        const element = document.createElement('div');
        element.className = className;
        if (text) element.textContent = text;
        return element;
    },

    // Date helpers
    calculateDaysBetween: (start, end) => {
        return Math.ceil(
            DateTime.fromJSDate(end)
                .diff(DateTime.fromJSDate(start), 'days')
                .days
        );
    },

    isSameDay: (date1, date2) => {
        return DateTime.fromJSDate(date1).hasSame(DateTime.fromJSDate(date2), 'day');
    }
};

export default utils; 