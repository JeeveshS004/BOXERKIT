document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const trainingTimeInput = document.getElementById('trainingTime');
    const punchDirectionDisplay = document.getElementById('punchDirection');

    let timerId;
    let totalSeconds;
    let intervalId;
    let lastDirection = ''; // NEW: Store the last direction

    const directions = ['Left', 'Right'];

    function startTraining() {
        // Clear any existing timers
        clearInterval(intervalId);
        clearTimeout(timerId);

        // Get the training time from the input and convert it to milliseconds
        const trainingMinutes = parseInt(trainingTimeInput.value);
        if (isNaN(trainingMinutes) || trainingMinutes <= 0) {
            alert("Please enter a valid training time.");
            return;
        }
        totalSeconds = trainingMinutes * 60;

        punchDirectionDisplay.textContent = 'Get ready...';
        punchDirectionDisplay.style.opacity = 1;

        // Start the main timer
        timerId = setTimeout(() => {
            clearInterval(intervalId);
            punchDirectionDisplay.textContent = 'Training complete! 💪';
            punchDirectionDisplay.style.opacity = 1;
            startButton.disabled = false;
        }, totalSeconds * 1000);

        // Start the 10-second interval timer
        intervalId = setInterval(() => {
            let newDirection;
            do {
                const randomIndex = Math.floor(Math.random() * directions.length);
                newDirection = directions[randomIndex];
            } while (newDirection === 'Right' && lastDirection === 'Right'); // NEW: Loop to prevent two consecutive "Right" punches

            lastDirection = newDirection;

            // Make the word appear
            punchDirectionDisplay.textContent = newDirection;
            punchDirectionDisplay.style.opacity = 1;

            // NEW: Schedule the word to fade out slowly after a delay
            // It will be visible for 7 seconds, then fade out for 3 seconds.
            setTimeout(() => {
                punchDirectionDisplay.style.opacity = 0;
            }, 7000); // Fades out with the 3s transition defined in CSS

        }, 10000); // 10000 milliseconds = 10 seconds

        startButton.disabled = true; // Disable the button while training is active
    }

    startButton.addEventListener('click', startTraining);
});