export class QuoteGenerator {
   constructor() {
     this.quoteElement = document.querySelector('.quote');
     this.authorElement = document.querySelector('.author');
     this.changeQuoteButton = document.querySelector('.change-quote');
     this.settingsQuoteButton = document.querySelector('.settings-quote');
     
     this.changeQuoteButton.addEventListener('click', this.getQuote.bind(this));
     this.settingsQuoteButton.addEventListener('click', this.toggleQuoteContainer.bind(this));
   }
   
   async getQuote() {
    try {
      const response = await fetch('../assets/json/quotes.json');
      const data = await response.json();
      const randomQuote = data[Math.floor(Math.random() * data.length)];
      this.displayQuote(randomQuote.quote, randomQuote.author);
    } catch (error) {
      console.log(error);
    }
  }
   
   displayQuote(content, author) {
     this.quoteElement.innerText = `"${content}"`;
     console.log(author);
     this.authorElement.innerText = `"${author}"`;
   }
   
   toggleQuoteContainer() {
     const quoteContainer = document.querySelector('.container-quote');
     quoteContainer.classList.toggle('hidden');
     this.settingsQuoteButton.classList.toggle('opacity');
   }
 }

