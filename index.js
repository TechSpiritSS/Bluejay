const csvtojson = require('csvtojson');
const fs = require('fs');
const {findConsecutiveDays, findLongShifts, findShortBreaks} = require("./utils/gap");

const inputFile = './data.csv';


// Function to analyze the data and print results
const analyzeFile = (jsonArrayObj) => {
    const employees = {};

    // Iterate through the data to analyze
    jsonArrayObj.forEach((entry) => {
        const {
            'Employee Name': employeeName,
            'Position ID': positionID,
            'Position Status': positionStatus,
            Time,
            'Time Out': timeOut,
            'Timecard Hours (as Time)': hoursWorked
        } = entry;

        // Initialize employee if not already in the object
        if (!employees[employeeName]) {
            employees[employeeName] = {shifts: []};
        }

        // Add shift details to the employee
        employees[employeeName].shifts.push({positionID, positionStatus, Time, timeOut, hoursWorked});
    });

    // Analyze and print results
    Object.keys(employees).forEach((employeeName) => {
        const employee = employees[employeeName];
        const consecutiveDays = findConsecutiveDays(employee.shifts);
        const shortBreaks = findShortBreaks(employee.shifts);
        const longShifts = findLongShifts(employee.shifts);

        if (consecutiveDays.length === 7) {
            console.log(`${employeeName} has worked for 7 consecutive days.`);
        }

        if (shortBreaks.length > 0) {
            console.log(`${employeeName} has less than 10 hours between shifts on the following days: ${shortBreaks.join(', ')}`);
        }

        if (longShifts.length > 0) {
            console.log(`${employeeName} has worked for more than 14 hours on the following days: ${longShifts.join(', ')}`);
        }
    });
};


// Read CSV file and start analysis
csvtojson()
    .fromFile(inputFile)
    .then(analyzeFile)
    .catch((error) => console.error('Error analyzing CSV file:', error));