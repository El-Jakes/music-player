const progress = document.getElementById("progress");
const playPauseIcon = document.getElementById("play-pause-icon");
const controlIcon = document.getElementById("control-icon");
const song = document.getElementById("song");

song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
};

// song.addEventListener("onloadedmetadata", function () {
//   progress.max = song.duration;
//   progress.value = song.currentTime;
// });

playPauseIcon.addEventListener("click", handleClick);

function handleClick() {
  if (controlIcon.classList.contains("fa-pause")) {
    song.pause();
    controlIcon.classList.remove("fa-pause");
    controlIcon.classList.add("fa-play");
  } else {
    song.play();
    controlIcon.classList.add("fa-pause");
    controlIcon.classList.remove("fa-play");
  }

  if (song.play()) {
    setInterval(() => {
      progress.value = song.currentTime;
    }, 1000);
  }
}


progress.onchange = function() {
    song.play();
    song.currentTime = progress.value;
    controlIcon.classList.add("fa-pause");
    controlIcon.classList.remove("fa-play");
}


// progress.addEventListener("onChange", function () {
//   song.play();
//   song.currentTime = progress.value;
//   controlIcon.classList.add("fa-pause");
//   controlIcon.classList.remove("fa-play");
// });
