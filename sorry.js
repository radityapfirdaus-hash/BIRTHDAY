const opening = document.getElementById("opening");
const sorryPage = document.getElementById("sorryPage");
const continueArea = document.getElementById("continueArea");

window.addEventListener("load", function () {

    // Opening screen
    setTimeout(function () {
        opening.classList.add("hide");
        sorryPage.classList.add("show");
    }, 1500);


    // Tombol lanjut baru muncul setelah user
    // sudah cukup lama berada di halaman
    setTimeout(function () {
        continueArea.classList.add("show");
    }, 6500);

});