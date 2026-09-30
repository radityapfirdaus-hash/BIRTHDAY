 const targetDate = new Date("2026-10-01T00:00:00+07:00");

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const enterButton = document.getElementById("enterButton");

function formatNumber(number) {
    return String(Math.max(0, Math.floor(number))).padStart(2, "0");
}

function updateCountdown() {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        enterButton.classList.remove("locked");
        enterButton.classList.add("ready");

        enterButton.querySelector("span:first-child").textContent = "enter";

        enterButton.onclick = function () {
            window.location.href = "questions.html";
        };

        return;
    }

    const totalSeconds = Math.floor(difference / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    daysElement.textContent = formatNumber(days);
    hoursElement.textContent = formatNumber(hours);
    minutesElement.textContent = formatNumber(minutes);
    secondsElement.textContent = formatNumber(seconds);

    // Kunci tombol selama countdown
    enterButton.classList.add("locked");
    enterButton.classList.remove("ready");
    enterButton.querySelector("span:first-child").textContent = "waiting...";

    enterButton.onclick = function (event) {
        event.preventDefault();
    };
}

updateCountdown();
setInterval(updateCountdown, 1000);