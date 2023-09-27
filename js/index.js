import { clock } from './clock.js';
import { Greeting, Name, ImageSlider } from './greeting.js';
import { QuoteGenerator } from './quoteGenerator.js';
import { initWeather} from './weather.js'
import { AudioPlayer }  from './audioPlayer.js'
import { initTodo } from './todo.js';
import { initSettings } from './setting.js';

initWeather()
const audioPlayer = new AudioPlayer();
audioPlayer.settingsAudio.addEventListener('click', () => {
   audioPlayer.toggleSettings();
});

const quoteGenerator = new QuoteGenerator();
quoteGenerator.getQuote();

const greeting = new Greeting();
greeting.setGreeting();
const name = new Name();
const imageSlider = new ImageSlider();

clock.updateClock();

initTodo();
initSettings()



