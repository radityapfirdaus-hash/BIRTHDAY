const MUSIC_KEY = "birthdayMusicTime";
const MUSIC_PLAYING_KEY = "birthdayMusicPlaying";

const music = document.getElementById("birthdaySong");

if (music) {

    const savedTime = localStorage.getItem(MUSIC_KEY);
    const wasPlaying = localStorage.getItem(MUSIC_PLAYING_KEY);

    if (savedTime) {
        music.currentTime = parseFloat(savedTime);
    }

    music.volume = 0.45;

    function startMusic() {
        if (music.paused) {
            music.play().then(function () {
                localStorage.setItem(MUSIC_PLAYING_KEY, "true");
            }).catch(function () {
                console.log("Autoplay diblokir browser.");
            });
        }
    }

    // Coba langsung play
    startMusic();

    // Kalau autoplay diblokir, mulai ketika user berinteraksi
    document.addEventListener("click", startMusic, { once: true });
    document.addEventListener("touchstart", startMusic, { once: true });

    // Simpan posisi lagu terus-menerus
    music.addEventListener("timeupdate", function () {
        localStorage.setItem(MUSIC_KEY, music.currentTime);
    });

    music.addEventListener("play", function () {
        localStorage.setItem(MUSIC_PLAYING_KEY, "true");
    });

    music.addEventListener("pause", function () {
        localStorage.setItem(MUSIC_PLAYING_KEY, "false");
    });
}