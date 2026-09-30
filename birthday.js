const opening = document.getElementById("opening");
const birthdayPage = document.getElementById("birthdayPage");

window.addEventListener("load", function () {

    setTimeout(function () {
        opening.classList.add("hide");
        birthdayPage.classList.add("show");
    }, 1500);

});