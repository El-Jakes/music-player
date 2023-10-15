import data from "./data.js";

const musicPlayer = document.getElementById("music-player");
const playPauseIcon = document.getElementById("play-pause-icon");
const previousIcon = document.getElementById("previous-icon");
const nextIcon = document.getElementById("next-icon");
const songList = document.getElementById("song-list");

const song = document.getElementById("song");
const progress = document.getElementById("progress");
const progressWrapper = document.getElementById("progress-wrapper");

const musicArt = document.getElementById("music-art");
const songTitle = document.getElementById("song-title");
const artiste = document.getElementById("artiste");

const controlIcon = document.getElementById("control-icon");

let songIndex = 0;

loadSong(data[songIndex]);

// load song from playlist
function loadSong(music) {
  musicArt.innerHTML = `<img class="music-art" src="${music.albumCover}" alt="${music.altText}">`;
  songTitle.textContent = `${music.songTitle}`;
  artiste.textContent = `${music.artiste}`;
  song.src = `${music.song}`;
}

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

function progressUpdate(e) {
  const { duration, currentTime } = e.srcElement;
  const progressBar = (currentTime / duration) * 100;
  console.log(progressBar);
  progress.style.width = `${progressBar}%`;
}

// next & previous songs functions

function nextSong() {
  songIndex++;

  if (songIndex > data.length - 1) {
    songIndex = 0;
  }

  loadSong(data[songIndex]);
  play();
}

function previousSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = data.length - 1;
  }

  loadSong(data[songIndex]);
  play();
}

// play song event
playPauseIcon.addEventListener("click", function () {
  if (controlIcon.classList.contains("fa-play")) {
    play();
  } else {
    pause();
  }
});

document.addEventListener("keydown", function (e) {
  e.preventDefault();
  console.log(e);
  if (controlIcon.classList.contains("fa-play") && e.keyCode === 32) {
    play();
  } else if (e.keyCode === 78) {
    nextSong();
  } else if (e.keyCode === 80) {
    previousSong();
  } else if (e.keyCode === 83) {
    // play();
  } else {
    pause();
  }
});

// next and previous events
nextIcon.addEventListener("click", nextSong);
previousIcon.addEventListener("click", previousSong);

// lookup why this event is not firing
song.addEventListener("timeUpdate", progressUpdate);

progressWrapper.addEventListener("click", function (e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = song.duration;

  song.currentTime = (clickX / width) * duration;
});

song.addEventListener("ended", nextSong);

// document.addEventListener("keypress", function (e) {
//   console.log(e);
//   e.preventDefault();
//   if (e.keyCode === 110 && controlIcon.classList.contains("fa-pause")) {
//     pause();
//   } else {
//     play();
//   }
// });
