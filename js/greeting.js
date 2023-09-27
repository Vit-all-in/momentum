export class Greeting {
   constructor() {
      this.today = new Date();
      this.hourNow = this.today.getHours();
      this.greetingElement = document.querySelector('.greeting');
   }

   setGreeting() {
      if (this.hourNow > 5 && this.hourNow < 12) {
         this.greetingElement.innerHTML = `<h5 data-lang="morning">Good morning,</h5>`;
      } else if (this.hourNow > 11 && this.hourNow < 18) {
         this.greetingElement.innerHTML = `<h5 data-lang="afternoon">Good afternoon,</h5>`;
      } else if (this.hourNow > 17 && this.hourNow < 24) {
         this.greetingElement.innerHTML = `<h5 data-lang="evening">Good evening,</h5>`;
      } else if (this.hourNow < 6) {
         this.greetingElement.innerHTML = `<h5 data-lang="night">Good night,</h5>`;
      }
   }
}

export class Name {
   constructor() {
      this.nameElement = document.querySelector('.name');
      this.MAX_LENGTH = 23;
      this.loadName();
      this.nameElement.addEventListener('input', this.setName.bind(this));
      this.nameElement.addEventListener('keypress', this.setName.bind(this));
      this.nameElement.addEventListener('blur', this.setName.bind(this));
   }

   loadName() {
      if (localStorage.getItem('name') === null) {
         this.nameElement.textContent = 'Enter Your Name';
      } else {
         this.nameElement.textContent = localStorage.getItem('name');
      }
   }

   setName(e) {
      if (e.type === 'keypress') {
         if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('name', e.target.innerText);
            this.nameElement.blur();
         }
      } else {
         localStorage.setItem('name', e.target.innerText);
      }
   }
}

export class ImageSlider {
   constructor() {
      this.slideNext = document.querySelector('.slide-next');
      this.slidePrev = document.querySelector('.slide-prev');
      this.images = [];
      this.curImageIndex = 0;
      this.loadImages();
      this.slideNext.addEventListener('click', this.showNextImage.bind(this));
      this.slidePrev.addEventListener('click', this.showPrevImage.bind(this));
   }

   async loadImages() {
      try {
         const response = await fetch('https://api.unsplash.com/photos/random?count=20&client_id=XkDCieEEsTzS7csy0qNIaIKmd0IV4OhxHqVjuqqHd9Q');
         const images = await response.json();
         this.images = images.map(image => image.urls.regular);
         this.displayImage();
      } catch (error) {
         console.error('Ошибка при загрузке изображений:', error);
      }
   }

   showNextImage() {
      this.curImageIndex = (this.curImageIndex + 1) % this.images.length;
      this.displayImage();
   }

   showPrevImage() {
      this.curImageIndex = (this.curImageIndex - 1 + this.images.length) % this.images.length;
      this.displayImage();
   }

   displayImage() {
      const imageUrl = this.images[this.curImageIndex];
      document.body.style.backgroundImage = `url('${imageUrl}')`;
   }
}

