const opening = document.getElementById("opening");
const tkaPage = document.getElementById("tkaPage");

window.addEventListener("load", function () {

    setTimeout(function () {

        opening.classList.add("hide");

        tkaPage.classList.add("show");

    }, 1500);

});