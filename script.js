"use strict";
const songs = [
  {
    songName: "Binte Dil(Padmaavat)",
    songPath: "./Music/Binte Dil (Padmaavat) 128 Kbps.mp3",
    songNumber: 0,
  },
  {
    songName: "Blue Eyes YO Yo Honey Singh",
    songPath: "./Music/Blue Eyes Yo Yo Honey Singh 128 Kbps.mp3",
    songNumber: 1,
  },
  {
    songName: "Brown Rang Interbnational Villager",
    songPath: "./Music/Brown Rang International Villager 128 Kbps.mp3",
    songNumber: 2,
  },
  {
    songName: "Dil ko Karaar Aaya",
    songPath: "./Music/Dil Ko Karaar Aaya(PagalWorld.com.se).mp3",
    songNumber: 3,
  },
  {
    songName: "kesariya",
    songPath: "./Music/Kesariya(PagalWorld.com.se).mp3",
    songNumber: 4,
  },
  {
    songName: "Kya Muje Pyar Hai--KK",
    songPath: "./Music/Kya Mujhe Pyar Hai - KK_128-(DJMaza).mp3",
    songNumber: 5,
  },
  {
    songName: "Pheli Nazar Mein",
    songPath: "./Music/Pehli Nazar Mein - Race 128 Kbps.mp3",
    songNumber: 6,
  },
  {
    songName: "Tu Hi Meri Shab Hai",
    songPath: "./Music/Tu Hi Meri Shab Hai - Gangster_128-(DJMaza).mp3",
    songNumber: 7,
  },
  {
    songName: "Tu Jo Mila",
    songPath: "./Music/Tu Jo Mila - KK_128-(DJMaza).mp3",
    songNumber: 8,
  },
  {
    songName: "Zindagi Do Pal Ki",
    songPath: "./Music/Zindagi Do Pal Ki - KK_128-(DJMaza).mp3",
    songNumber: 9,
  },
];
const musicContainer = document.querySelector(".music-list");
const about = document.querySelector(".link");
const forwardBtn = document.querySelector(".forward-btn");
const backwardBtn = document.querySelector(".backward-btn");
const play_And_pauseBtn = document.querySelector(".playAndpause-btn");
const aboutContent = document.querySelector(".about");
const iframeBeat = document.querySelector(".beat");
const songsArrEl = [...document.querySelectorAll(".song")];
const musicBar = document.querySelector(".range");
const songDurationEl = document.querySelector(".songDuration");
const currentTimeEl = document.querySelector(".currentTime");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
let musicAudio;
let song = 0;
let musicPlay = false;
let musicBarValue;

const displayMusicTime = function (durationTime, currentTime) {
  if (!durationTime || !currentTime) return;
  const durationMin = String(Math.trunc(durationTime / 60)).padStart(2, 0);
  const durationSec = String(Math.trunc(durationTime % 60)).padStart(2, 0);
  const currentMin = String(Math.trunc(currentTime / 60)).padStart(2, 0);
  const currentSec = String(Math.trunc(currentTime % 60)).padStart(2, 0);
  songDurationEl.textContent = `${durationMin}:${durationSec}`;
  currentTimeEl.textContent = `${currentMin}:${currentSec}`;
};

const musicDetails = function () {
  musicAudio.addEventListener("timeupdate", () => {
    musicBar.value = (musicAudio.currentTime / musicAudio.duration) * 100;
    displayMusicTime(musicAudio.duration, musicAudio.currentTime);
  });
  musicAudio.addEventListener("ended", () => {
    toggleMusic();
  });
};

const deActiveSong = function () {
  songsArrEl[song].style.backgroundColor = "#22223333";
};

const activeSong = function () {
  songsArrEl[song].style.backgroundColor = "#fffff333";
};
activeSong();

const currentSong = function (song) {
  if (musicAudio) {
    musicAudio.pause();
  }
  const songUrl = songs[song].songPath;
  const audio = new Audio(songUrl);
  musicAudio = audio;
  audio.play();
  activeSong();
  musicDetails();
};

const toggleMusic = function () {
  const attribute = play_And_pauseBtn.getAttribute("class");
  let newAttribute;

  if (musicPlay) {
    musicAudio.pause();
    musicPlay = false;
    newAttribute = attribute.replace("pause", "play");
    iframeBeat.style.display = "none";
  } else {
    musicAudio.play();
    musicPlay = true;
    newAttribute = attribute.replace("play", "pause");
    iframeBeat.style.display = "block";
  }
  play_And_pauseBtn.setAttribute("class", newAttribute);
};

const pause_And_paly_Music = function () {
  currentSong(song);
  toggleMusic();
};

const forwardSong = function () {
  deActiveSong();
  if (song === songs.length - 1) song = 0;
  else song++;
  currentSong(song);
};

const backwardSong = function () {
  deActiveSong();
  if (song === 0) song = songs.length - 1;
  else song--;
  currentSong(song);
};

const playMusic = function (e) {
  const btn = e.target.closest(".play-btn");
  if (!btn) return;
  if (musicAudio) {
    musicAudio.pause();
  }
  deActiveSong();
  const songId = +btn.dataset.songNumber;
  song = songId;
  currentSong(song);
  activeSong();
  toggleMusic();
};

const musicRange = function () {
  if (!musicAudio) return;
  musicAudio.currentTime = (musicBar.value / 100) * musicAudio.duration;
};

const eventListener = function () {
  musicContainer.addEventListener("click", playMusic);

  about.addEventListener("click", function () {
    aboutContent.classList.toggle("display");
  });

  play_And_pauseBtn.addEventListener("click", pause_And_paly_Music);

  forwardBtn.addEventListener("click", forwardSong);

  backwardBtn.addEventListener("click", backwardSong);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") forwardSong();
    else if (e.key === "ArrowLeft") backwardSong();
  });

  musicBar.addEventListener("change", musicRange);
};
eventListener();
