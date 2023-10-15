import data from "./data.js";

const musicPlayer = document.getElementById("music-player");
const musicArt = document.getElementById("music-art");
const songTitle = document.getElementById("song-title");
const artiste = document.getElementById("artiste");
const previousIcon = document.getElementById("previous-icon");
const playPauseIcon = document.getElementById("play-pause-icon");
const controlIcon = document.getElementById("control-icon");
const nextIcon = document.getElementById("next-icon");
// const songList = document.getElementById("song-list");

const song = document.getElementById("song");
const progress = document.getElementById("progress");
const progressWrapper = document.getElementById("progress-wrapper");

let songIndex = 0;

// song progress
function updateSongProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressBar = (currentTime / duration) * 100;
  progress.style.width = `${progressBar}%`;
}

// fetch song from playlist
function fetchSong(music) {
  musicArt.innerHTML = `<img class="music-art" src="${music.albumCover}" alt="${music.altText}">`;
  songTitle.textContent = `${music.songTitle}`;
  artiste.textContent = `${music.artiste}`;
  song.src = `${music.song}`;
}

fetchSong(data[songIndex]);

// play & pause song functions
function play() {
  controlIcon.classList.add("fa-pause");
  controlIcon.classList.remove("fa-play");
  musicPlayer.classList.add("play");

  song.play();
}

function pause() {
  controlIcon.classList.remove("fa-pause");
  controlIcon.classList.add("fa-play");
  musicPlayer.classList.remove("play");

  song.pause();
}

// stop, next & previous songs functions
function nextSong() {
  songIndex++;

  if (songIndex > data.length - 1) {
    songIndex = 0;
  }

  fetchSong(data[songIndex]);
  play();
}

function previousSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = data.length - 1;
  }

  fetchSong(data[songIndex]);
  play();
}

function stopSong() {
  pause();
  song.currentTime = 0;
}

// play & pause event
playPauseIcon.addEventListener("click", function () {
  if (controlIcon.classList.contains("fa-play")) {
    play();
  } else {
    pause();
  }
});

// keyboard events
document.addEventListener("keydown", function (e) {
  e.preventDefault();
  console.log(e);
  if (controlIcon.classList.contains("fa-play") && e.code === "Space") {
    play();
  } else if (e.code === "KeyN" || e.code === "Period") {
    nextSong();
  } else if (e.code === "KeyP" || e.code === "Comma") {
    previousSong();
  } else if (e.code === "KeyS") {
    stopSong();
  } else {
    // fix the issue with other keys pausing the song
    // pause();
  }
});

// next and previous events
nextIcon.addEventListener("click", nextSong);
previousIcon.addEventListener("click", previousSong);

// progress bar event
song.addEventListener("timeupdate", updateSongProgress);

progressWrapper.addEventListener("click", function (e) {
  const progressWidth = progressWrapper.clientWidth
  const clickedX = e.offsetX;
  const songDuration = song.duration;

  song.currentTime = (clickedX / progressWidth) * songDuration;
});

// song end event
song.addEventListener("ended", nextSong);
