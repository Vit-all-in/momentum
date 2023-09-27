export class AudioPlayer {
   constructor() {
      this.playBtn = document.querySelector('#mainPlayBtn');
      this.audio = document.querySelector('#audio');
      this.btnPrev = document.querySelector('#btnPrev');
      this.btnNext = document.querySelector('#btnNext');
      this.trackTitle = document.querySelector('.track-title');
      this.artistName = document.querySelector('.artist-name');
      this.slider = document.querySelector('.slider');
      this.thumb = document.querySelector('.slider-thumb');
      this.progress = document.querySelector('.progress');
      this.fullTime = document.querySelector('.fulltime');
      this.trackTime = document.querySelector('.track-time');
      this.volumeSlider = document.querySelector('.volume-slider .slider');
      this.volumeProgress = document.querySelector('.volume-slider .progress');
      this.volumeIcon = document.querySelector('.volume-icon');
      this.settingsAudio = document.querySelector('.settings-audio');
      this.trackPlaying = false;
      this.volumeMuted = false;
      this.trackId = 0;
      this.tracks = [
         "Clint Eastwood",
         "Love Is",
         "Clubnoir",
         "Chill"
      ];
      this.artists = [
         "Gorillas",
         "Loner",
         "Talamanca",
         "The Chiller"
      ];

      this.playBtn.addEventListener('click', () => this.playTrack());
      this.btnPrev.addEventListener('click', () => this.prevTrack());
      this.btnNext.addEventListener('click', () => this.nextTrack());
      this.audio.addEventListener('ended', () => this.nextTrack());
      this.slider.addEventListener('input', () => this.customSlider());
      this.volumeSlider.addEventListener('input', () => this.customVolumeSlider());
      this.volumeIcon.addEventListener('click', () => this.toggleMute());
      this.settingsAudio.addEventListener('click', () => this.toggleSettings());

      this.loadTrack();
      this.customSlider();
      this.customVolumeSlider();

      this.settingsAudio = document.querySelector('.settings-audio');

      // Проверяем, сохранена ли настройка видимости в Local Storage
      const isPlayerHidden = localStorage.getItem('isPlayerHidden');
      if (isPlayerHidden === 'true') {
         this.hidePlayer();
      }

      // Проверяем, сохранена ли настройка прозрачности в Local Storage
      const isSettingsAudioOpaque = localStorage.getItem('isSettingsAudioOpaque');
      if (isSettingsAudioOpaque === 'true') {
         this.settingsAudio.style.opacity = 1;
      } else {
         this.settingsAudio.style.opacity = "";
      }

      this.settingsAudio.addEventListener('click', () => {
         this.toggleSettings();
      });

      
      this.player = document.querySelector('.player');
      this.isDragging = false;
      this.offsetX = 0;
      this.offsetY = 0;
      
      this.player.addEventListener('mousedown', this.handleMouseDown.bind(this));
      document.addEventListener('mousemove', this.handleMouseMove.bind(this));
      document.addEventListener('mouseup', this.handleMouseUp.bind(this));
   }
   handleMouseDown(event) {
      if (event.button === 0) {
         this.isDragging = true;
         this.offsetX = event.clientX - this.player.offsetLeft;
         this.offsetY = event.clientY - this.player.offsetTop;
         document.body.style.cursor = 'move'; 
      }
   }
   
   handleMouseMove(event) {
      if (this.isDragging) {
         this.player.style.left = `${event.clientX - this.offsetX}px`;
         this.player.style.top = `${event.clientY - this.offsetY}px`;
      }
   }
   
   handleMouseUp(event) {
      if (event.button === 0) {
         this.isDragging = false;
         document.body.style.cursor = 'default'; 
      }
   }

   toggleSettings() {
      const player = document.querySelector('.player');
      player.classList.toggle('hidden');
      const isPlayerHidden = player.classList.contains('hidden');

      localStorage.setItem('isPlayerHidden', isPlayerHidden.toString());

      if (isPlayerHidden) {
         this.settingsAudio.style.opacity = "";
         localStorage.removeItem('isSettingsAudioOpaque');
      } else {
         this.settingsAudio.style.opacity = 1;
         localStorage.setItem('isSettingsAudioOpaque', 'true');
      }
   }
   hidePlayer() {
      const player = document.querySelector('.player');
      player.classList.add('hidden');
   }

   playTrack() {
      if (this.trackPlaying === false) {
         this.startPlayback();
      } else {
         this.pausePlayback();
      }
   }

   startPlayback() {
      this.audio.play();
      this.playBtn.innerHTML = `
         <span class="material-symbols-outlined">
            pause
         </span>
      `;
      this.trackPlaying = true;
   }

   pausePlayback() {
      this.audio.pause();
      this.playBtn.innerHTML = `
         <span class="material-symbols-outlined">
            play_arrow
         </span>
      `;
      this.trackPlaying = false;
   }

   prevTrack() {
      this.decrementTrackId();
      this.loadTrack();
      this.switchTrack();
   }

   nextTrack() {
      this.incrementTrackId();
      this.loadTrack();
      this.switchTrack();
   }

   decrementTrackId() {
      this.trackId--;
      if (this.trackId < 0) {
         this.trackId = this.tracks.length - 1;
      }
   }

   incrementTrackId() {
      this.trackId++;
      if (this.trackId > this.tracks.length - 1) {
         this.trackId = 0;
      }
   }

   loadTrack() {
      this.audio.src = `assets/sounds/${this.tracks[this.trackId]}.mp3`;
      this.audio.load();
      this.trackTitle.innerHTML = this.tracks[this.trackId];
      this.artistName.innerHTML = this.artists[this.trackId];
      this.progress.style.width = 0;
      this.thumb.style.left = 0;
      this.audio.addEventListener('loadeddata', () => {
         this.setTime(this.fullTime, this.audio.duration);
         this.slider.setAttribute('max', this.audio.duration);
      });
   }

   switchTrack() {
      if (this.trackPlaying === true) {
         this.audio.play();
      }
   }

   setTime(output, input) {
      const min = Math.floor(input / 60);
      const sec = Math.floor(input % 60);
      if (sec < 10) {
         output.innerHTML = `${min}:0${sec}`;
      } else {
         output.innerHTML = output.innerHTML = `${min}:${sec}`;
      }
   }

   customSlider() {
      this.progress.style.width = `${(this.slider.value / this.slider.max) * 100}%`;
      this.thumb.style.left = `${(this.slider.value / this.slider.max) * 100}%`;
      this.audio.currentTime = this.slider.value;
      this.setTime(this.trackTime, this.slider.value);
   }

   customVolumeSlider() {
      this.volumeProgress.style.width = `${(this.volumeSlider.value / this.volumeSlider.max) * 100}%`;
      this.audio.volume = this.volumeSlider.value / this.volumeSlider.max;
      if (this.audio.volume === 0) {
         this.volumeIcon.innerHTML = `
          <span class="material-symbols-outlined">
            volume_off
          </span>
        `;
      } else if (this.audio.volume <= 0.5) {
         this.volumeIcon.innerHTML = `
          <span class="material-symbols-outlined">
            volume_down
          </span>
        `;
      } else {
         this.volumeIcon.innerHTML = `
          <span class="material-symbols-outlined">
            volume_up
          </span>
        `;
      }
   }

   toggleMute() {
      if (this.volumeMuted === false) {
         this.audio.volume = 0;
         this.volumeSlider.value = 0;
         this.volumeProgress.style.width = 0;
         this.volumeIcon.innerHTML = `
          <span class="material-symbols-outlined">
            volume_off
          </span>
        `;
         this.volumeMuted = true;
      } else {
         this.audio.volume = this.volumeSlider.value / this.volumeSlider.max;
         this.volumeProgress.style.width = `${(this.volumeSlider.value / this.volumeSlider.max) * 100}%`;
         if (this.audio.volume <= 0.5) {
            this.volumeIcon.innerHTML = `
            <span class="material-symbols-outlined">
              volume_down
            </span>
          `;
         } else {
            this.volumeIcon.innerHTML = `
            <span class="material-symbols-outlined">
              volume_up
            </span>
          `;
         }
         this.volumeMuted = false;
      }
   }
}