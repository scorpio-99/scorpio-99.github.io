function updateCounter() {
    const now = new Date();
    const timeDifference = now - ANNIVERSARY_DATE;

    const timeUnits = {
        days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeDifference % (1000 * 60)) / 1000)
    };

    Object.entries(timeUnits).forEach(([unit, value]) => {
        document.getElementById(unit).textContent = Math.abs(value);
    });
}

setInterval(updateCounter, 1000);
updateCounter(); 