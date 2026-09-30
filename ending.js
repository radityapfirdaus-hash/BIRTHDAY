const escapeButton = document.getElementById("escapeButton");
const warning = document.getElementById("warning");
const finalMessage = document.getElementById("finalMessage");
const finishButton = document.getElementById("finishButton");

let clickCount = 0;

const messages = [
    "BILANG MAKASII DULU!!!",
    "BELUM BOLEH.",
    "ADIT NUNGGU.",
    "MAKASIH DULU WOI.",
    "MASIH NGGAK MAU?",
    "YA AMPUN."
];

escapeButton.addEventListener("click", function () {

    clickCount++;

    const messageIndex = Math.min(
        clickCount - 1,
        messages.length - 1
    );

    warning.textContent = messages[messageIndex];

    /*
        Setiap klik tombol makin kecil.
        Setelah beberapa klik ukurannya hampir tidak terlihat.
    */

    const scale = Math.max(
        0.18,
        1 - (clickCount * 0.15)
    );

    escapeButton.style.transform = `scale(${scale})`;

    /*
        Sedikit dipindahkan supaya terasa
        seperti tombol yang "kabur".
    */

    const moveX = (Math.random() * 30) - 15;
    const moveY = (Math.random() * 15) - 7;

    escapeButton.style.translate =
        `${moveX}px ${moveY}px`;


    /*
        Setelah 6 kali mencoba kabur,
        akhirnya tombol menyerah.
    */

    if (clickCount >= 6) {

        escapeButton.style.display = "none";

        warning.textContent = "yaudah...";

        setTimeout(function () {
            finalMessage.classList.add("show");
        }, 900);
    }

});


finishButton.addEventListener("click", function () {

    finalMessage.innerHTML = `
        <div class="final-box">
            <p class="final-small">END OF TRANSMISSION</p>

            <h2>18</h2>

            <p>
                happy birthday.
            </p>

            <p>
                sekarang beneran selesai.
            </p>
        </div>
    `;

});