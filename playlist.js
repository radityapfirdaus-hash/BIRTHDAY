const opening = document.getElementById("opening");
const playlistPage = document.getElementById("playlistPage");

const music = document.getElementById("birthdaySong");

const songItems = document.querySelectorAll(".song-item");

const currentTitle = document.getElementById("currentTitle");
const currentArtist = document.getElementById("currentArtist");

const pauseButton = document.getElementById("pauseButton");

const progressFill = document.getElementById("progressFill");
const progressBar = document.getElementById("progressBar");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const MUSIC_TIME_KEY = "birthdayMusicTime";
const MUSIC_PLAYING_KEY = "birthdayMusicPlaying";
const MUSIC_SONG_KEY = "birthdayMusicSong";

let currentSong = localStorage.getItem(MUSIC_SONG_KEY) || "About You.mp3";

const songs = {
    "About You.mp3": {
        title: "About You",
        artist: "The 1975"
    },

    "WIWYM.mp3": {
        title: "When I Was Your Man",
        artist: "Bruno Mars"
    },

    "BKKASM.mp3": {
        title: "Berapa Kali Kita Akan Saling Memaafkan",
        artist: "Pamungkas"
    }
};


function formatTime(seconds) {

    if (!Number.isFinite(seconds)) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);

    return (
        String(minutes).padStart(2, "0") +
        ":" +
        String(remainingSeconds).padStart(2, "0")
    );
}


function setActiveSong(filename) {

    const song = songs[filename];

    if (!song) return;

    currentSong = filename;

    music.src = filename;
    music.load();

    currentTitle.textContent = song.title;
    currentArtist.textContent = song.artist;

    songItems.forEach(function (item) {

        item.classList.toggle(
            "active",
            item.dataset.song === filename
        );

    });

    localStorage.setItem(
        MUSIC_SONG_KEY,
        filename
    );

    localStorage.removeItem(MUSIC_TIME_KEY);

    music.currentTime = 0;

    music.play().then(function () {

        localStorage.setItem(
            MUSIC_PLAYING_KEY,
            "true"
        );

        pauseButton.textContent = "❚❚";

    }).catch(function () {

        console.log("Autoplay diblokir browser.");

        pauseButton.textContent = "▶";

    });
}


/*
    OPENING
*/

window.addEventListener("load", function () {

    setTimeout(function () {

        opening.classList.add("hide");

        playlistPage.classList.add("show");

    }, 1500);

});


/*
    LOAD SONG DARI HALAMAN SEBELUMNYA
*/

const savedTime =
    localStorage.getItem(MUSIC_TIME_KEY);

const wasPlaying =
    localStorage.getItem(MUSIC_PLAYING_KEY);

const previousSong =
    localStorage.getItem(MUSIC_SONG_KEY);


/*
    SET SONG TANPA LANGSUNG RESET
*/

if (previousSong && songs[previousSong]) {

    const song = songs[previousSong];

    currentSong = previousSong;

    music.src = previousSong;

    currentTitle.textContent = song.title;
    currentArtist.textContent = song.artist;

    songItems.forEach(function (item) {

        item.classList.toggle(
            "active",
            item.dataset.song === previousSong
        );

    });

} else {

    music.src = "About You.mp3";

    currentTitle.textContent = "About You";
    currentArtist.textContent = "The 1975";

}


/*
    SET POSISI TERAKHIR
*/

music.addEventListener("loadedmetadata", function () {

    if (savedTime) {

        const time =
            parseFloat(savedTime);

        if (
            Number.isFinite(time) &&
            time < music.duration
        ) {
            music.currentTime = time;
        }

    }

});


/*
    AUTOPLAY LANJUTAN
*/

function continueMusic() {

    music.play().then(function () {

        localStorage.setItem(
            MUSIC_PLAYING_KEY,
            "true"
        );

        pauseButton.textContent = "❚❚";

    }).catch(function () {

        console.log("Autoplay diblokir browser.");

    });

}


if (wasPlaying === "true") {

    continueMusic();

}


/*
    PILIH LAGU
*/

songItems.forEach(function (item) {

    item.addEventListener("click", function () {

        const filename =
            item.dataset.song;

        setActiveSong(filename);

    });

});


/*
    PLAY / PAUSE
*/

pauseButton.addEventListener("click", function () {

    if (music.paused) {

        music.play().then(function () {

            localStorage.setItem(
                MUSIC_PLAYING_KEY,
                "true"
            );

            pauseButton.textContent = "❚❚";

        });

    } else {

        music.pause();

        localStorage.setItem(
            MUSIC_PLAYING_KEY,
            "false"
        );

        pauseButton.textContent = "▶";

    }

});


/*
    SIMPAN POSISI LAGU
*/

music.addEventListener("timeupdate", function () {

    if (Number.isFinite(music.currentTime)) {

        localStorage.setItem(
            MUSIC_TIME_KEY,
            music.currentTime
        );

    }

    if (
        Number.isFinite(music.duration) &&
        music.duration > 0
    ) {

        const percentage =
            (music.currentTime / music.duration) * 100;

        progressFill.style.width =
            percentage + "%";

    }

    currentTime.textContent =
        formatTime(music.currentTime);

});


/*
    DURASI
*/

music.addEventListener("loadedmetadata", function () {

    duration.textContent =
        formatTime(music.duration);

});


/*
    SAAT PLAY / PAUSE
*/

music.addEventListener("play", function () {

    localStorage.setItem(
        MUSIC_PLAYING_KEY,
        "true"
    );

    pauseButton.textContent = "❚❚";

});


music.addEventListener("pause", function () {

    localStorage.setItem(
        MUSIC_PLAYING_KEY,
        "false"
    );

    pauseButton.textContent = "▶";

});


/*
    KLIK PROGRESS BAR
*/

progressBar.addEventListener("click", function (event) {

    if (!music.duration) return;

    const rect =
        progressBar.getBoundingClientRect();

    const percentage =
        (event.clientX - rect.left) / rect.width;

    music.currentTime =
        percentage * music.duration;

});