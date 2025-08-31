document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const trainingTimeInput = document.getElementById('trainingTime');
    const tempoInput = document.getElementById('tempo'); // NEW: Get the tempo input element
    const punchDirectionDisplay = document.getElementById('punchDirection');

    let timerId;
    let totalSeconds;
    let intervalId;
    let lastDirection = '';

    const directions = ['Left', 'Right'];

    function startTraining() {
        // Clear any existing timers
        clearInterval(intervalId);
        clearTimeout(timerId);

        // Get the training time and tempo from the inputs
        const trainingMinutes = parseInt(trainingTimeInput.value);
        const tempoSeconds = parseInt(tempoInput.value); // NEW: Get the tempo value

        if (isNaN(trainingMinutes) || trainingMinutes <= 0 || isNaN(tempoSeconds) || tempoSeconds <= 0) {
            alert("Please enter a valid training time and tempo.");
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

        // Start the custom interval timer
        intervalId = setInterval(() => {
            let newDirection;
            do {
                const randomIndex = Math.floor(Math.random() * directions.length);
                newDirection = directions[randomIndex];
            } while (newDirection === 'Right' && lastDirection === 'Right');

            lastDirection = newDirection;

            // Make the word appear
            punchDirectionDisplay.textContent = newDirection;
            punchDirectionDisplay.style.opacity = 1;

            // Schedule the word to fade out
            setTimeout(() => {
                punchDirectionDisplay.style.opacity = 0;
            }, (tempoSeconds * 1000) - 3000); // Fades out 3 seconds before the next punch

        }, tempoSeconds * 1000); // NEW: Use the custom tempo value

        startButton.disabled = true;
    }

    startButton.addEventListener('click', startTraining);
});
