// Function to find consecutive days worked
const findConsecutiveDays = (shifts) => {
    const sortedShifts = shifts.sort((a, b) => new Date(a.Time) - new Date(b.Time));
    const consecutiveDays = [];

    for (let i = 0; i < sortedShifts.length - 6; i++) {
        let current = new Date(sortedShifts[i].Time);
        let isConsecutive = true;

        for (let j = 1; j <= 6; j++) {
            const next = new Date(sortedShifts[i + j].Time);

            // Check if the next day is consecutive
            current.setDate(current.getDate() + 1);
            if (current.getTime() !== next.getTime()) {
                isConsecutive = false;
                break;
            }
        }

        if (isConsecutive) {
            consecutiveDays.push(sortedShifts[i].Time);
        }
    }

    return consecutiveDays;
};

// Function to find shifts with less than 10 hours between them
const findShortBreaks = (shifts) => {
    const shortBreaks = [];

    for (let i = 0; i < shifts.length - 1; i++) {
        const current = new Date(shifts[i].Time);
        const next = new Date(shifts[i + 1].Time);
        const hoursBetween = Math.abs((next - current) / (1000 * 60 * 60));

        if (hoursBetween < 10 && hoursBetween > 1) {
            shortBreaks.push(shifts[i].Time);
        }
    }

    return shortBreaks;
};


// Function to find shifts with more than 14 hours worked
const findLongShifts = (shifts) => {
    const longShifts = [];

    shifts.forEach((shift) => {
        const hoursWorked = parseFloat(shift['Timecard Hours (as Time)']);

        if (!isNaN(hoursWorked) && hoursWorked > 14) {
            longShifts.push(shift.Time);
        }
    });

    return longShifts;
};

module.exports = {
    findConsecutiveDays,
    findShortBreaks,
    findLongShifts
}