// Подключение VimeoPlayer и Lodash.trottle
import throttle from 'lodash.throttle';

//Находим элементы form, input, textarea
const formEl = document.querySelector('.feedback-form');
const inputEl = document.querySelector('.feedback-form input');
const textareaEl = document.querySelector('.feedback-form textarea');

//Объект значений полей формы
const formState = { email: '', message: '' };
//Ключ локального хранилища
const STORAGE_KEY = 'feedback-form-state';

populateFormState();

//Слушатели событий
formEl.addEventListener('submit', onFormSubmit);
inputEl.addEventListener('input', onInputChange);
textareaEl.addEventListener('input', throttle(onTextareaChange, 500));

//Ф-ция:
//  1) присваивает свойству email, объекта formState - текущее значение поля формы input
//  2) сохраняет в локальное хранилище текущий объект formState (JSON - строку)
function onInputChange(evt) {
    formState.email = evt.currentTarget.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
};

//Ф-ция:
//  1) присваивает свойству message, объекта formState - текущее значение поля формы textarea
//  2) сохраняет в локальное хранилище текущий объект formState (JSON - строку)
function onTextareaChange(evt) {
    formState.message = evt.currentTarget.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
};

//Ф-ция:
//   1) отменяет действия браузера по умолчанию
//   2) выводит в консоль объект, созданный из текущих данных в локальном хронилище по ключу STORAGE_KEY
//   3) очищает все поля формы
//   4) удаляет из локального хранилища данные по ключу STORAGE_KEY
function onFormSubmit(evt) {
    evt.preventDefault();
    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
};

//Ф-ция:
//   1) создает объект feedback - распарсит JSON-строку данных из локального хранилища, по ключу STORAGE_KEY
//   2) проверяет условие наявности данных в локальном хранилище (т.е. feedback приводится к true), в случае выполнения условия:
//       - присваивает полю input формы - значение свойства email объекта feedback
//       - присваивает полю textarea формы - значение свойства message объекта feedback
//       т.е. заполняет поля формы значениями из локального хранилища
function populateFormState() { 
    const feedback = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (feedback) { 
        inputEl.value = feedback.email;
        textareaEl.value = feedback.message;
    };
};



