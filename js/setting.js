export function initSettings() {
   const items = document.querySelectorAll('.circle span');
   const settingsClock = document.querySelector('.settings-clock')
   const settingsDate = document.querySelector('.settings-month')

   settingsClock.addEventListener('click', () => {
      const clock = document.querySelector('.clock');
      clock.classList.toggle('hidden');
      settingsClock.classList.toggle('opacity')
   });

   settingsDate.addEventListener('click', () => {
      const date = document.querySelector('.date');
      date.classList.toggle('hidden');
      settingsDate.classList.toggle('opacity');
   });

   for (let i = 0, l = items.length; i < l; i++) {
      items[i].style.left = (50 - 25 * Math.cos(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";

      items[i].style.top = (50 + 25 * Math.sin(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";
   };

   document.querySelector('.menu-button').addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('.circle').classList.toggle('open');
   });
}