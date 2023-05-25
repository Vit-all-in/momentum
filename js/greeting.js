export function greeting() {
   const today = new Date();
   const hourNow = today.getHours();
   const greeting = document.querySelector('.greeting');
   const settingsGreeting = document.querySelector('.settings-greeting')
   const name = document.querySelector('.name');
   
   const slideNext = document.querySelector('.slide-next')
   const slidePrev = document.querySelector('.slide-prev')
 
   let curImage = randomImage(1, 20)

   function randomImage(min, max) {
      let rand = min + Math.random() * (max + 1 - min);
      if (rand < 10) {
         return "0" + Math.floor(rand)
      }
      return Math.floor(rand);
   }

   async function nextSlide(){
      curImage++
       getTimeGreetings()
      if(curImage <= 9){
         curImage = '0' + curImage 
         getTimeGreetings()
      } else {
         curImage = curImage++ 
         getTimeGreetings()
      }  
      if(curImage == '21'){
         curImage = '01';
         getTimeGreetings()
      }
   }

   async function prevSlide(){
      curImage--
      if(curImage <= 9){
         curImage = '0' + curImage
         getTimeGreetings()
      } else {
         curImage = curImage++ 
         getTimeGreetings()
      }  
      if(curImage == '00'){
         curImage = '20';
         getTimeGreetings()
      } 
   }
 
   slideNext.addEventListener('click', nextSlide)
   slidePrev.addEventListener('click', prevSlide)

   async function getTimeGreetings(){
      let imagesMorning = "url('https://raw.githubusercontent.com/Vit-all-in/stage1-tasks/assets/images/morning/" + curImage + ".jpg')";
      let imagesAfternoon = "url('https://raw.githubusercontent.com/Vit-all-in/stage1-tasks/assets/images/afternoon/" + curImage + ".jpg')";
      let imagesEvening = "url('https://raw.githubusercontent.com/Vit-all-in/stage1-tasks/assets/images/evening/" + curImage + ".jpg')";
      let imagesNight = "url('https://raw.githubusercontent.com/Vit-all-in/stage1-tasks/assets/images/night/" + curImage + ".jpg')";


   if (hourNow > 5 && hourNow < 12) {
         document.body.style.backgroundImage = imagesMorning;
         greeting.innerHTML = `<h5 data-lang="morning">Good morning,</h5>`
      } else if (hourNow > 11 && hourNow < 18) {
         document.body.style.backgroundImage = imagesAfternoon;
         greeting.innerHTML = `<h5 data-lang="diner">Good afternoon,</h5>`
      } else if (hourNow > 17 && hourNow < 24) {
         document.body.style.backgroundImage = imagesEvening;
         greeting.innerHTML = `<h5 data-lang="evening">Good evening,</h5>`
      } else if (hourNow < 6) {
         document.body.style.backgroundImage = imagesNight;
         greeting.innerHTML = `<h5 data-lang="night">Good night,</h5>`
      }
   }
   
   getTimeGreetings()

   function getName() {
      if (localStorage.getItem('name') === null) {
         name.textContent = 'Enter Your Name';
      } else {
         name.textContent = localStorage.getItem('name');
      }
   }

   function setName(e) {
      if (e.type === 'keypress') {
         if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('name', e.target.innerText);
            name.blur();
         }
      } else {
         localStorage.setItem('name', e.target.innerText);
      }
   }

   name.addEventListener('keypress', setName);
   name.addEventListener('blur', setName);

   getName();

   settingsGreeting.addEventListener('click', () => {
      const greeting = document.querySelector('.greeting');
      const name = document.querySelector('.name')
      name.classList.toggle('hidden');
      greeting.classList.toggle('hidden');
      settingsGreeting.classList.toggle('opacity')
   });
}