import data from "./data.js";

const musicArt = document.getElementById("music-art");
const songTitle = document.getElementById("song-title");
const artiste = document.getElementById("artiste");
const musicPlayer = document.getElementById('music-player')

const progress = document.getElementById("progress");
const playPauseIcon = document.getElementById("play-pause-icon");
const controlIcon = document.getElementById("control-icon");
const song = document.getElementById("song");

const previousIcon = document.getElementById("previous-icon");
const nextIcon = document.getElementById("next-icon");

// let musicIndex = 1

// data[musicIndex]

data.map((music) => {
  musicArt.innerHTML = `<img class="music-art" src="${music.albumCover}" alt="${music.altText}">`;
  songTitle.textContent = `${music.songTitle}`;
  artiste.textContent = `${music.artiste}`;
  song.innerHTML = `<source src="${music.song}" type="audio/mpeg">`;
});

song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
};

playPauseIcon.addEventListener("click", function () {
  if (controlIcon.classList.contains("fa-pause")) {
    song.pause();
    controlIcon.classList.remove("fa-pause");
    controlIcon.classList.add("fa-play");
    musicPlayer.classList.remove('play')
} else {
    song.play();
    controlIcon.classList.add("fa-pause");
    controlIcon.classList.remove("fa-play");
    musicPlayer.classList.add('play')
  }
});

// if (song.play()) {
//   setInterval(() => {
//     progress.value = song.currentTime;
//   }, 500);
// }

progress.onchange = function () {
  song.play();
  song.currentTime = progress.value;
  controlIcon.classList.add("fa-pause");
  controlIcon.classList.remove("fa-play");
};

nextIcon.addEventListener("click", function () {
  console.log("play next song");
});

previousIcon.addEventListener("click", function () {
     data--
    for (let i = 0; i < array.length; i++) {
        if (data[i] < 0) {
            data[i] = data.length - 1
        }
        
    }
});
