export function clock() {
   const timeOutput = document.querySelector('.time')
   const secOutput = document.querySelector('.sec')
   const ampmOutput = document.querySelector('.ampm')
   const dayOfWeekOutput = document.querySelector('.dayofweek')
   const monthOutput = document.querySelector('.month')
   const dayOutput = document.querySelector('.day')

   const weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

   const monthsName = [
      'January,',
      'February,',
      'March,',
      'April,',
      'May,',
      'June,',
      'July,',
      'August,',
      'September,',
      'October,',
      'November,',
      'December,',
   ];

   function formatTime(val) {
      if (val < 10) {
         return "0"
      } else {
         return "";
      }
   }

   const d = new Date();

   const h = d.getHours();
   const m = d.getMinutes();
   const s = d.getSeconds();

   dayOfWeekOutput.innerHTML = weekday[
      d.getDay()
   ]

   monthOutput.innerHTML = monthsName[
      d.getMonth()
   ]

   dayOutput.innerHTML = d.getDate()

   const time = formatTime(h) + h + ':' + formatTime(m) + m;
   const sec = formatTime(s) + s;

   const ampm = h >= 12 ? "PM" : "AM";

   timeOutput.innerHTML = time;
   secOutput.innerHTML = sec;
   ampmOutput.innerHTML = ampm;  
}

