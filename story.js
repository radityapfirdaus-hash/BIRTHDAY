const opening = document.getElementById("opening");
const storyPage = document.getElementById("storyPage");
const pdfSection = document.getElementById("pdfSection");
const continueArea = document.getElementById("continueArea");

window.addEventListener("load", function () {

    setTimeout(function () {
        opening.classList.add("hide");
        storyPage.classList.add("show");

        setTimeout(function () {
            pdfSection.classList.add("show");
        }, 900);

        setTimeout(function () {
            continueArea.classList.add("show");
        }, 1500);

    }, 1500);

});