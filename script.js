
// ----------------------------------
// Traffic Light Simulator
// ----------------------------------

let currentState = "RED";
let completedCycles = 0;

let running = false;

let timerInterval;

let timeRemaining;


// ----------------------------------
// Get HTML Elements
// ----------------------------------

const redLight = document.getElementById("red");
const yellowLight = document.getElementById("yellow");
const greenLight = document.getElementById("green");

const currentStateText =
    document.getElementById("currentState");

const timerText =
    document.getElementById("timer");

const cyclesText =
    document.getElementById("cycles");

const redTimeInput =
    document.getElementById("redTime");

const greenTimeInput =
    document.getElementById("greenTime");

const yellowTimeInput =
    document.getElementById("yellowTime");


// ----------------------------------
// Load Saved Data
// ----------------------------------

function loadData() {

    const savedData =
        localStorage.getItem("trafficLightData");

    if (savedData) {

        const data = JSON.parse(savedData);

        currentState =
            data.currentState || "RED";

        completedCycles =
            data.completedCycles || 0;

        redTimeInput.value =
            data.timings.red || 5;

        greenTimeInput.value =
            data.timings.green || 5;

        yellowTimeInput.value =
            data.timings.yellow || 2;
    }

    updateDisplay();
}


// ----------------------------------
// Save Data as JSON
// ----------------------------------

function saveData() {

    const data = {

        timings: {

            red: Number(redTimeInput.value),

            green: Number(greenTimeInput.value),

            yellow: Number(yellowTimeInput.value)

        },

        currentState: currentState,

        completedCycles: completedCycles

    };

    localStorage.setItem(
        "trafficLightData",
        JSON.stringify(data)
    );
}


// ----------------------------------
// Update Traffic Light
// ----------------------------------

function updateDisplay() {

    // Turn all lights OFF

    redLight.classList.remove("active");

    yellowLight.classList.remove("active");

    greenLight.classList.remove("active");


    // Turn current light ON

    if (currentState === "RED") {

        redLight.classList.add("active");

    }

    else if (currentState === "YELLOW") {

        yellowLight.classList.add("active");

    }

    else if (currentState === "GREEN") {

        greenLight.classList.add("active");

    }


    // Update text

    currentStateText.textContent =
        currentState;

    cyclesText.textContent =
        completedCycles;
}


// ----------------------------------
// Get Current Timing
// ----------------------------------

function getCurrentTime() {

    if (currentState === "RED") {

        return Number(redTimeInput.value);

    }

    if (currentState === "GREEN") {

        return Number(greenTimeInput.value);

    }

    if (currentState === "YELLOW") {

        return Number(yellowTimeInput.value);

    }
}


// ----------------------------------
// Start Traffic Light
// ----------------------------------

function startTraffic() {

    if (running) {
        return;
    }

    running = true;

    timeRemaining = getCurrentTime();

    timerText.textContent =
        timeRemaining;

    updateDisplay();

    startTimer();
}


// ----------------------------------
// Timer
// ----------------------------------

function startTimer() {

    timerInterval = setInterval(() => {

        timeRemaining--;

        timerText.textContent =
            timeRemaining;


        if (timeRemaining <= 0) {

            changeLight();

        }

    }, 1000);
}


// ----------------------------------
// Change Light
// ----------------------------------

function changeLight() {

    if (currentState === "RED") {

        currentState = "GREEN";

    }

    else if (currentState === "GREEN") {

        currentState = "YELLOW";

    }

    else if (currentState === "YELLOW") {

        currentState = "RED";

        completedCycles++;

    }


    timeRemaining =
        getCurrentTime();

    timerText.textContent =
        timeRemaining;

    updateDisplay();

    saveData();
}


// ----------------------------------
// Stop Traffic
// ----------------------------------

function stopTraffic() {

    running = false;

    clearInterval(timerInterval);

    saveData();
}


// ----------------------------------
// Reset Traffic Light
// ----------------------------------

function resetTraffic() {

    running = false;

    clearInterval(timerInterval);


    currentState = "RED";

    completedCycles = 0;


    redTimeInput.value = 5;

    greenTimeInput.value = 5;

    yellowTimeInput.value = 2;


    timeRemaining =
        getCurrentTime();

    timerText.textContent =
        timeRemaining;


    updateDisplay();

    saveData();
}


// ----------------------------------
// Save Timing Changes
// ----------------------------------

redTimeInput.addEventListener(
    "change",
    saveData
);

greenTimeInput.addEventListener(
    "change",
    saveData
);

yellowTimeInput.addEventListener(
    "change",
    saveData
);


// ----------------------------------
// Start Application
// ----------------------------------

loadData();

timeRemaining =
    getCurrentTime();

timerText.textContent =
    timeRemaining;

