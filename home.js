 const opening = document.getElementById("opening");
const homePage = document.getElementById("homePage");

window.addEventListener("load", function () {
    setTimeout(function () {
        opening.classList.add("hide");
        homePage.classList.add("show");
    }, 1300);
});