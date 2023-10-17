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
// const songDuration = song.duration;
// console.log(songDuration);

let songIndex = 0;

// fix this
// currentTime / duration * 100: apply it to update progress time reading

song.addEventListener('loadeddata', timeUpdateReading)

// song progress
function updateSongProgress(e) {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  const progressBar = (currentTime / duration) * 100;
  progress.style.width = `${progressBar}%`;
}

// time update function
function timeUpdateReading(){
  // fix the bug here
  const songCurrentTime = document.getElementById('current')
  const songTotalTime = document.getElementById('end')

  const songTotalDuration = song.duration;
  const totalMinutes = Math.floor(songTotalDuration / 60)
  let totalSeconds = Math.floor(songTotalDuration % 60)
  if(totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`
  }
  
  songTotalTime.textContent = `${totalMinutes}:${totalSeconds}`

  const songCurrentPlayTime = song.currentTime
  const currentMinutes = (song.currentTime / 60)
  let currentSeconds = (song.currentTime % 60) 
  if(currentSeconds < 10) {
    currentSeconds = `0${currentSeconds}`
  }
  
  songCurrentTime.textContent = `${currentMinutes}:${currentSeconds}`
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

// keyboard functionality
function onkeydown(e) {
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
  } else if (!e.code === 'Space' || e.code === 'KeyN' || e.code === 'Period' || e.code === 'KeyP' || e.code === 'Comma' || e.code === KeyS) {
    e.cancelBubble = true
    e = null
  }
  else {
    // fix the issue with other keys pausing the song
    pause(); 
  }
}

// play & pause event
playPauseIcon.addEventListener("click", function () {
  if (controlIcon.classList.contains("fa-play")) {
    play();
  } else {
    pause();
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

// keyboard events
document.addEventListener("keydown", onkeydown);
