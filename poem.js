const opening = document.getElementById("opening");
const poemPage = document.getElementById("poemPage");

const slides = document.querySelectorAll(".poem-slide");
const dots = document.querySelectorAll(".dot");

const slideCounter = document.getElementById("slideCounter");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const continueArea = document.getElementById("continueArea");
const swipeNote = document.getElementById("swipeNote");

let currentSlide = 0;
let touchStartX = 0;
let touchEndX = 0;

window.addEventListener("load", function () {
    setTimeout(function () {
        opening.classList.add("hide");
        poemPage.classList.add("show");
    }, 1500);
});

function updateSlide(direction = 1) {

    slides.forEach((slide, index) => {
        slide.classList.remove("active", "previous");

        if (index < currentSlide) {
            slide.classList.add("previous");
        }
    });

    slides[currentSlide].classList.add("active");

    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide);
    });

    slideCounter.textContent =
        `${String(currentSlide + 1).padStart(2, "0")} / 05`;

    prevButton.disabled = currentSlide === 0;

    if (currentSlide === slides.length - 1) {
        nextButton.disabled = true;
        continueArea.classList.add("show");
    } else {
        nextButton.disabled = false;
        continueArea.classList.remove("show");
    }

    if (currentSlide > 0) {
        swipeNote.classList.add("hide");
    }
}

function nextSlide() {
    if (currentSlide >= slides.length - 1) return;

    currentSlide++;
    updateSlide(1);
}

function previousSlide() {
    if (currentSlide <= 0) return;

    currentSlide--;
    updateSlide(-1);
}

nextButton.addEventListener("click", nextSlide);
prevButton.addEventListener("click", previousSlide);

dots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
        currentSlide = index;
        updateSlide();
    });
});


/* SWIPE */

const book = document.querySelector(".poem-book");

book.addEventListener("touchstart", function (event) {
    touchStartX = event.changedTouches[0].screenX;
});

book.addEventListener("touchend", function (event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {

    const distance = touchEndX - touchStartX;

    if (Math.abs(distance) < 45) return;

    if (distance < 0) {
        nextSlide();
    } else {
        previousSlide();
    }
}


/* KEYBOARD */

document.addEventListener("keydown", function (event) {

    if (event.key === "ArrowRight") {
        nextSlide();
    }

    if (event.key === "ArrowLeft") {
        previousSlide();
    }

});


updateSlide();