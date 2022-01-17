// Подключение VimeoPlayer и Lodash.trottle
import throttle from 'lodash.throttle';

//Находим элементы form, input, textarea
const formEl = document.querySelector('.feedback-form');
const inputEl = document.querySelector('.feedback-form input');
const textareaEl = document.querySelector('.feedback-form textarea');

//Слушатели событий
formEl.addEventListener('submit', onFormSubmit);
inputEl.addEventListener('input', throttle(onInputChange, 500));
textareaEl.addEventListener('input',throttle(onTextareaChange, 500));

function onInputChange(evt) {
    const value = evt.currentTarget.value;
};

function onTextareaChange(evt) {
    
};

function onFormSubmit(evt) {
    
};
