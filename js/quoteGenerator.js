export function quoteGenerator(){
   const quote = document.querySelector('.quote');
   const author = document.querySelector('.author');
   const changeQuote = document.querySelector('.change-quote');
   const settingsQuote = document.querySelector('.settings-quote')
   changeQuote.addEventListener('click', getQuote)

   async function getQuote(){
      try {
         await fetch('https://api.quotable.io/random')
         .then(res => res.json())
         .then(data => {
            quote.innerText = `"${data.content}"`
            author.innerText = `"${data.author}"`
         })
      } catch (error) {
         console.log(error);
      }
   }

   getQuote()

   settingsQuote.addEventListener('click', () => {
      const quote = document.querySelector('.container-quote');
      quote.classList.toggle('hidden');
      settingsQuote.classList.toggle('opacity')
   });
}

