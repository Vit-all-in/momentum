export class Clock {
   constructor() {
      this.timeOutput = document.querySelector('.time');
      this.secOutput = document.querySelector('.sec');
      this.ampmOutput = document.querySelector('.ampm');
      this.dayOfWeekOutput = document.querySelector('.dayofweek');
      this.monthOutput = document.querySelector('.month');
      this.dayOutput = document.querySelector('.day');

      this.weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      this.monthsName = [
         'January,', 'February,', 'March,', 'April,', 'May,', 'June,', 'July,', 'August,', 'September,', 'October,', 'November,', 'December,',
      ];


      setInterval(() => {
         this.updateClock();
      }, 1000);
   }

   formatTime(val) {
      if (val < 10) {
         return "0" + val;
      } else {
         return val.toString();
      }
   }

   updateClock() {
      const d = new Date();

      const h = d.getHours();
      const m = d.getMinutes();
      const s = d.getSeconds();

      this.dayOfWeekOutput.innerHTML = this.weekday[d.getDay()];
      this.monthOutput.innerHTML = this.monthsName[d.getMonth()];
      this.dayOutput.innerHTML = d.getDate();

      const time = this.formatTime(h) + ':' + this.formatTime(m);
      const sec = this.formatTime(s);

      const ampm = h >= 12 ? "PM" : "AM";

      this.timeOutput.innerHTML = time;
      this.secOutput.innerHTML = sec;
      this.ampmOutput.innerHTML = ampm;
   }
}

export const clock = new Clock();