console.info("%cRecruiters & Employers: I'm looking for work if you need a front-end designer! @zfett on LinkedIn", "color: limegreen; font-size: 20px;");

const curDateElem = document.getElementById("curDate");
const y = new Date().getFullYear();

if (y == "2020") {
  //do nothing
} else {
  curDateElem.innerHTML = " - "+y;
}

let isPlaying = false;
const audioSrc = document.getElementById("audio_src");
const audioToggle = document.getElementById("audio_toggle");

function toggleAudio() {
  if (isPlaying) {
    isPlaying = false;
    audioSrc.pause();
    audioSrc.volume = 0;
    audioToggle.style.backgroundImage = "url('res/image/icon/speaker_off.png')";
  } else if (!isPlaying) {
    isPlaying = true;
    audioSrc.play();
    audioSrc.volume = 0.4;
    audioToggle.style.backgroundImage = "url('res/image/icon/speaker_on.png')";
  }
  
  audioSrc.addEventListener('ended', (event) => {
    isPlaying = false;
    audioToggle.style.backgroundImage = "url('res/image/icon/speaker_off.png')";
  });
}

audioToggle.addEventListener("click", toggleAudio);