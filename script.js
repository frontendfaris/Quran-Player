const surahs = [
  {
    path: "./indexMaterial/AlJummuah.mp3",
    title: "Surah Al Jummuah",
    reciterName: "Mansour Al Salmi",
    headPhoto: "./indexMaterial/MansourAlSalmi.jpg",
  },
  {
    path: "./indexMaterial/DuaAnxiety.mp3",
    title: "Dua For Anxiety",
    reciterName: "The Holy Quran",
    headPhoto: "./indexMaterial/QuranDuaCover.jpg",
  },
  {
    path: "./indexMaterial/AlMulk.mp3",
    title: "Surah Al Mulk",
    reciterName: "Badr Al Turki",
    headPhoto: "./indexMaterial/BadrAlTurki.jpg",
  },
  {
    path: "./indexMaterial/DuaBeforeSleeping.mp3",
    title: "Dua Before Sleeping",
    reciterName: "The Holy Quran",
    headPhoto: "./indexMaterial/QuranDuaCover2.jpg",
  },
  {
    path: "./indexMaterial/AlMuzzammil.mp3",
    title: "Surah Al Muzzammil",
    reciterName: "Saad Al Ghamidi",
    headPhoto: "./indexMaterial/SaadAlGhamidi.jpg",
  },
  {
    path: "./indexMaterial/DuaBusiness.mp3",
    title: "Dua For Business Success",
    reciterName: "The Holy Quran",
    headPhoto: "./indexMaterial/QuranDuaCover.jpg",
  },
  {
    path: "./indexMaterial/Al-Qiyamah.mp3",
    title: "Surah Al Qiyamah",
    reciterName: "Maher Al Mu'aiqly",
    headPhoto: "./indexMaterial/MaherAlMuaiqly.jpg",
  },
  {
    path: "./indexMaterial/DuaExamSuccess.mp3",
    title: "Dua For Exam Success",
    reciterName: "The Holy Quran",
    headPhoto: "./indexMaterial/QuranDuaCover2.jpg",
  },
  {
    path: "./indexMaterial/AlMutaffifin.mp3",
    title: "Surah Al Mutaffifin",
    reciterName: "Saad Al Ghamidi",
    headPhoto: "./indexMaterial/SaadAlGhamidi.jpg",
  },
  {
    path: "./indexMaterial/DuaMorning.mp3",
    title: "Dua For Morning",
    reciterName: "The Holy Quran",
    headPhoto: "./indexMaterial/QuranDuaCover.jpg",
  },
  {
    path: "./indexMaterial/AlBuruj.mp3",
    title: "Surah Buruj",
    reciterName: "Mansour Al Salmi",
    headPhoto: "./indexMaterial/MansourAlSalmi.jpg",
  },
  {
    path: "./indexMaterial/DuaProtection.mp3",
    title: "Dua For Total Protection",
    reciterName: "The Holy Quran",
    headPhoto: "./indexMaterial/QuranDuaCover2.jpg",
  },
  {
    path: "./indexMaterial/LastTenSurahs.mp3",
    title: "Last Ten Surahs",
    reciterName: "Saud Al Shuraim",
    headPhoto: "./indexMaterial/SaudAlShuraim.jpg",
  },
  {
    path: "./indexMaterial/DuaWealth.mp3",
    title: "Dua For Wealth",
    reciterName: "The Holy Quran",
    headPhoto: "./indexMaterial/QuranDuaCover.jpg",
  },
];

const quran = new Audio();

let isPlaying = false;
//-->
const togglePlay = () => {
  if (isPlaying) {
    pauseQuran();
  } else {
    playQuran();
  }
};

const loopBtn = document.getElementById("loop");
const previousBtn = document.getElementById("previous");
const playBtn = document.getElementById("play-and-pause");
const nextBtn = document.getElementById("next");
let quranIndex = 0;
//-->
const changeSurah = (fwOrBw) => {
  quranIndex = (quranIndex + fwOrBw + surahs.length) % surahs.length;
  loadQuran(surahs[quranIndex]);
  playQuran();
};
const playQuran = () => {
  isPlaying = true;
  playBtn.classList.replace("bx-play", "bx-pause");
  quran.play();
};
const pauseQuran = () => {
  isPlaying = false;
  playBtn.classList.replace("bx-pause", "bx-play");
  quran.pause();
};
const loopCurrent = () => {
  loopBtn.classList.toggle("color");
  if (loopBtn.classList.contains("color")) {
    quran.loop = true;
    loopBtn.style.color = "#10810E";
    loadQuran();
  } else {
    quran.loop = false;
    loopBtn.style.color = "black";
    loadQuran();
  }
};
/*const shuffleBtn = document.getElementById("shuffle");
  const shuffleCurrent = () => {
    shuffleBtn.classList.toggle("color");
    if (shuffleBtn.classList.contains("color")) {
      const RandomIndex = Math.floor(Math.random() * surahs.length);
      if (RandomIndex !== quranIndex) {
        changeSurah(RandomIndex + 1);
      }
    } else {
      shuffleBtn.style.color = "black";
    } 
  };
*/

const image = document.getElementById("reciter-head");
const background = document.getElementById("background-img");
const surahTitle = document.getElementById("surah-title");
const reciter = document.getElementById("reciter-name");
//-->
const loadQuran = (surah) => {
  quran.src = surah.path;
  surahTitle.innerText = surah.title;
  reciter.innerText = surah.reciterName;
  image.src = surah.headPhoto;
  background.src = surah.headPhoto;
};

const durationSpan = document.getElementById("duration-span");
const currentTimeSpan = document.getElementById("current-time-span");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progress-bar");
//-->
const progressBarTimeline = () => {
  const { duration, currentTime } = quran;
  const percent = (currentTime / duration) * 100;
  progress.style.width = `${percent}%`;

  const time = (time) => String(Math.floor(time)).padStart(2, "0");

  currentTimeSpan.textContent = `${time(currentTime / 60)}:${time(
    currentTime % 60
  )}`;
  durationSpan.textContent = `${time(duration / 60)}:${time(duration % 60)}`;
};
const clickOnProgressBar = (point) => {
  const clickX = point.offsetX;
  const width = progressBar.clientWidth;

  quran.currentTime = (clickX / width) * quran.duration;
};

quran.addEventListener("ended", () => changeSurah(1));
nextBtn.addEventListener("click", () => changeSurah(1));
previousBtn.addEventListener("click", () => changeSurah(-1));
playBtn.addEventListener("click", togglePlay);
loopBtn.addEventListener("click", loopCurrent);
/* shuffleBtn.addEventListener("click", shuffleCurrent);*/
progressBar.addEventListener("click", clickOnProgressBar);
quran.addEventListener("timeupdate", progressBarTimeline);

loadQuran(surahs[quranIndex]);
