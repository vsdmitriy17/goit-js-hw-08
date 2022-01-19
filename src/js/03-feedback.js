// Подключение Lodash.trottle
import throttle from 'lodash.throttle';

//Находим элементы form, input, textarea, button
const formEl = document.querySelector('.feedback-form');
const inputEl = document.querySelector('.feedback-form input');
const textareaEl = document.querySelector('.feedback-form textarea');
const btnEl = document.querySelector('button');

//Объект значений полей формы
const formState = { email: '', message: '' };
//Ключ локального хранилища
const STORAGE_KEY = 'feedback-form-state';

populateFormState();
btnDisable();

//Слушатели событий
formEl.addEventListener('submit', onFormSubmit);
inputEl.addEventListener('input', onInputChange);
textareaEl.addEventListener('input', throttle(onTextareaChange, 500));

//Ф-ция:
//  1) присваивает свойству email, объекта formState - текущее значение поля формы input
//  2) сохраняет в локальное хранилище текущий объект formState (JSON - строку)
//  3) включает, либо выключает кнопку
function onInputChange(evt) {
    formState.email = evt.currentTarget.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
    btnDisable();
};

//Ф-ция:
//  1) присваивает свойству message, объекта formState - текущее значение поля формы textarea
//  2) сохраняет в локальное хранилище текущий объект formState (JSON - строку)
//  3) включает, либо выключает кнопку
function onTextareaChange(evt) {
    formState.message = evt.currentTarget.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
    btnDisable();
};

//Ф-ция:
//   1) отменяет действия браузера по умолчанию
//   2) выводит в консоль объект, созданный из текущих данных в локальном хронилище по ключу STORAGE_KEY
//   3) очищает все поля формы
//   4) удаляет из локального хранилища данные по ключу STORAGE_KEY
//   5) обнуляет значения свойств объекта formState
//   6) отключает кнопку
function onFormSubmit(evt) {
    evt.preventDefault();
    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    formState.email = "";
    formState.message = "";
    btnDisable();
};

//Ф-ция:
//   1) создает объект feedback - распарсит JSON-строку данных из локального хранилища, по ключу STORAGE_KEY
//   2) проверяет условие наявности данных в локальном хранилище (т.е. feedback приводится к true), в случае выполнения условия:
//       - присваивает полю input формы - значение свойства email объекта feedback
//       - присваивает полю textarea формы - значение свойства message объекта feedback
//         т.е. заполняет поля формы значениями из локального хранилища
//       -присваивает соотв. значения ключам объекта formState
function populateFormState() { 
    const feedback = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (feedback) { 
        inputEl.value = feedback.email;
        textareaEl.value = feedback.message;
        formState.email = feedback.email;
        formState.message = feedback.message;
    };
};

//Ф-ция отключает кнопку, если хотябы одно поле формы - не заполнено
function btnDisable() {
    btnEl.disabled = inputEl.value === "" || textareaEl.value === "";
};



