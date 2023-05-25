export function audioPlayer() {
   const playBtn = document.querySelector('#mainPlayBtn')
   const audio = document.querySelector('#audio')
   const btnPrev = document.querySelector('#btnPrev')
   const btnNext = document.querySelector('#btnNext')
   const trackTitle = document.querySelector('.track-title')
   const artistName = document.querySelector('.artist-name')
   const slider = document.querySelector('.slider')
   const thumb = document.querySelector('.slider-thumb')
   const progress = document.querySelector('.progress')
   const fullTime = document.querySelector('.fulltime')
   const trackTime = document.querySelector('.track-time')
   const volumeSlider = document.querySelector('.volume-slider .slider')
   const volumeProgress = document.querySelector('.volume-slider .progress')
   const volumeIcon = document.querySelector('.volume-icon')
   const settingsAudio = document.querySelector('.settings-audio')
   let trackPlaying = false;
   let volumeMuted = false;
   let trackId = 0;

   const tracks = [
      "Clint Eastwood",
      "Love Is",
      "Clubnoir",
      "Chill"
   ];

   const artists = [
      "Gorillas",
      "Loner",
      "Talamanca",
      "The Chiller"
   ];

   playBtn.addEventListener('click', playTrack)

   function playTrack() {
      if (trackPlaying === false) {

         audio.play()

         playBtn.innerHTML = `
      <span class="material-symbols-outlined">
            pause
      </span>
      `

         trackPlaying = true;
      } else {
         audio.pause();

         playBtn.innerHTML = `
      <span class="material-symbols-outlined">
            play_arrow
      </span>
      `
         trackPlaying = false;
      }
   }

   function switchTrack() {
      if (trackPlaying === true) {
         audio.play()
      }
   }

   const trackSrc = 'assets/sounds/' + tracks[trackId] + ".mp3";


   function loadTrack() {
      audio.src = 'assets/sounds/' + tracks[trackId] + ".mp3";

      audio.load();

      trackTitle.innerHTML = tracks[trackId];

      artistName.innerHTML = artists[trackId];

      progress.style.width = 0;
      thumb.style.left = 0;

      audio.addEventListener('loadeddata', () => {
         setTime(fullTime, audio.duration)

         slider.setAttribute("max", audio.duration)
      })
   }

   loadTrack()

   btnPrev.addEventListener('click', () => {
      trackId--

      if (trackId < 0) {
         trackId = tracks.length - 1
      }

      loadTrack()
      switchTrack()
   });

   btnNext.addEventListener('click', nextTrack)

   function nextTrack() {
      trackId++
      if (trackId > tracks.length - 1) {
         trackId = 0
      }

      loadTrack()
      switchTrack()
   }

   audio.addEventListener('ended', nextTrack)

   function setTime(output, input) {
      const min = Math.floor(input / 60);
      const sec = Math.floor(input % 60)

      if (sec < 10) {
         output.innerHTML = min + ":0" + sec
      } else {
         output.innerHTML = min + ":" + sec
      }
   }

   setTime(fullTime, audio.duration)

   audio.addEventListener('timeupdate', () => {
      const currentAudioTime = Math.floor(audio.currentTime)
      const timePercentage = (currentAudioTime / audio.duration) * 100 + "%"

      setTime(trackTime, currentAudioTime);

      progress.style.width = timePercentage;
      thumb.style.left = timePercentage;
   })

   function customSlider() {
      const val = (slider.value / audio.duration) * 100 + "%";
      progress.style.width = val;
      thumb.style.left = val;

      setTime(trackTime, slider.value)

      audio.currentTime = slider.value;
   }

   customSlider()

   slider.addEventListener("input", customSlider)

   let valVol;

   function customVolumeSlider() {
      const maxVal = volumeSlider.getAttribute("max")
      valVol = (volumeSlider.value / maxVal) * 100 + "%";
      volumeProgress.style.width = valVol;

      audio.volume = volumeSlider.value / 100;

      if (audio.volume > 0.5) {
         volumeIcon.innerHTML = `
      <span class="material-symbols-outlined">
            volume_up
      </span>
      `
      } else if (audio.volume === 0) {
         volumeIcon.innerHTML = `
      <span class="material-symbols-outlined">
            volume_off
      </span>
      `
      } else {
         volumeIcon.innerHTML = `
      <span class="material-symbols-outlined">
            volume_down
      </span>
      `
      }
   }

   customVolumeSlider()

   volumeSlider.addEventListener("input", customVolumeSlider);

   volumeIcon.addEventListener('click', () => {
      if (volumeMuted === false) {
         volumeIcon.innerHTML = `
      <span class="material-symbols-outlined">
            volume_off
      </span>
      `

         audio.volume = 0;

         volumeProgress.style.width = 0;
         volumeMuted = true;
      } else {
         volumeIcon.innerHTML = `
      <span class="material-symbols-outlined">
            volume_down
      </span>
      `

         audio.volume = 0.5;
         volumeProgress.style.width = valVol;
         volumeMuted = false;
      }
   })

   settingsAudio.addEventListener('click', () => {
      const player = document.querySelector('.player');
      player.classList.toggle('hidden');
      settingsAudio.classList.toggle('opacity')
   });
}