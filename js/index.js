import {clock} from './clock.js';
import {greeting} from './greeting.js';
import {quoteGenerator} from './quoteGenerator.js';
import { getWeather} from './weather.js'
import {audioPlayer} from './audioPlayer.js';
import {initTodo} from './todo.js';
import { initSettings } from './setting.js';
setInterval(clock, 1000)
greeting()
quoteGenerator()
getWeather()
audioPlayer()
initTodo()
initSettings()



