let timer;
let isRunning = false;
let workDuration = 25 * 60;
let breakDuration = 5 * 60;
let timeRemaining = workDuration;
let isWorkTime = true;

const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const workInput = document.getElementById('work-duration');
const breakInput = document.getElementById('break-duration');
const addTaskButton = document.getElementById('add-task');
const newTaskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');
const progressBar = document.getElementById('progress-bar');

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
addTaskButton.addEventListener('click', addTask);

function startTimer() {
    if (!isRunning) {
        timer = setInterval(updateTimer, 1000);
        isRunning = true;
    }
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeRemaining = isWorkTime ? workDuration : breakDuration;
    updateDisplay();
}

function updateTimer() {
    if (timeRemaining > 0) {
        timeRemaining--;
        updateDisplay();
        updateProgressBar();
    } else {
        isWorkTime = !isWorkTime;
        timeRemaining = isWorkTime ? workDuration : breakDuration;
        alert(isWorkTime ? 'Time to work!' : 'Time for a break!');
    }
}

function updateDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timeDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function updateProgressBar() {
    const totalDuration = isWorkTime ? workDuration : breakDuration;
    const percentage = ((totalDuration - timeRemaining) / totalDuration) * 100;
    progressBar.style.width = `${percentage}%`;
}

workInput.addEventListener('change', function() {
    workDuration = parseInt(workInput.value) * 60;
    if (isWorkTime) {
        timeRemaining = workDuration;
        updateDisplay();
        updateProgressBar();
    }
});

breakInput.addEventListener('change', function() {
    breakDuration = parseInt(breakInput.value) * 60;
    if (!isWorkTime) {
        timeRemaining = breakDuration;
        updateDisplay();
        updateProgressBar();
    }
});

function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText) {
        const listItem = document.createElement('li');
        listItem.textContent = taskText;
        taskList.appendChild(listItem);
        newTaskInput.value = '';
    }
}
