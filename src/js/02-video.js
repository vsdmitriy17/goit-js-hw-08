// Подключение VimeoPlayer и Lodash.trottle
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

// Находим элемент iframe
const iframe = document.querySelector('iframe');
// Создаем элемент player, библиотеки Player
const player = new Player(iframe);

//Метод "player.on('event',callBackFunction)" (на элементе player - прослушивает событие 'event', вызывает callBackFunction),
// при событии "timeupdate", вызывает колбек ф - цию "playerOn", через метод "Lodash.trottle"(вызов ф - ции с периодичностью 1000 мс)
player.on('timeupdate', throttle(playerOn, 1000));

// Метод player.setCurrentTime(seconds) - устанавливает время старта видео, при запуске плеера
// аргумент seconds - время в секудах (localStorage.getItem('videoplayer-current-time') - время из локального хранилища)
player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));

//Ф-ция - принимает объект события "timeupdate" ({duration: 61.857, percent: 0.049, seconds: 3.034}),
//Сохраняет в локальное хранилище текущее время видео (time), ключ - 'videoplayer-current-time'
function playerOn(data) {
    const time = data.seconds;
    localStorage.setItem('videoplayer-current-time', time);
}

