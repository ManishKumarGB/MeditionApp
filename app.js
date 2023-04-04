const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".videos");

  //sounds
  const sounds = document.querySelector(".sound-picker");
  //time display
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-select button");
  // get the length of outline
  const outlinelength = outline.getTotalLength();

  // Duration
  let fakeDuration = 600;

  outline.style.strokeDasharray = outlinelength;
  // outline.style.strokeDashoffset = outlinelength;
  console.log(sounds);
  // sounds.forEach((sound) => {
  //   sound.addEventListener("click", function () {
  //     song.src = this.getAttribute("data-sound");
  //     console.log(sound);
  //     // video.src = this.getAttribute("data-video");
  //     checkPlaying(song);
  //   });
  // });

  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  timeSelect.forEach((option) => {
    option.addEventListener("click", function () {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });

  const checkPlaying = (song) => {
    if (song.paused) {
      play.src = "./images/pause.svg";
      song.play();
      console.log(video);
      video.play();
    } else {
      play.src = "./images/play.svg";
      song.pause();
      video.pause();
    }
  };

  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    let progress = outlinelength - (currentTime / fakeDuration) * outlinelength;
    outline.style.strokeDashoffset = progress;

    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./images/play.svg";
      video.pause();
    }
  };
};

app();
