import './sass/markup.scss';
import { error } from '@pnotify/core';
import"@pnotify/core/dist/PNotify.css";
import"@pnotify/core/dist/BrightTheme.css";
import countryTemplate from './ templates/countryMarkup.hbs';
import countryListTemplate from './ templates/countryList.hbs';
import { fetchingRequest } from './jsFiles/fetchCountries.js';
const debounce = require('lodash.debounce');

let searchValue = '';

const refs = {
    searchValue: document.querySelector('.input-search'),
    markup: document.querySelector('.render-markup'),
}; 

refs.searchValue.addEventListener('input', debounce ((inputValue),500));


function inputValue (event) {
    searchValue = event.target.value;
    // console.log(searchValue);
    checkInputValue(searchValue);

};


function ClearRender () {   
    refs.markup.innerHTML = '';
};

function checkInputValue (value) {
  const val = value.trim(value);
   if (val.length ===0) return 
       ClearRender();
   searchValueInput(value);
};

function searchValueInput (value) {
   const feth = fetchingRequest (value);
        feth.then(data => { 
            ClearRender ();
            distributionMarkupRender(data);
    }).
        catch(er => console.log("Упс!!! Сервак не дает данные!!! Ищи проблему в fetch!!")
        );
};



function errorMessage () {
    const myError = error({
    text:"Слишком много совпадений!!! Введите более точные данные!!",
    hide: false,
    delay:2000,
    });
    setTimeout(() => {
        myError.hide = true;
    }, 200);

};


function  distributionMarkupRender (data) {
    if (data.length>10) {
        errorMessage();  
    } else if (data.length===1){
        countryRender(data);
    } else {
        countryListRender (data);
    };
    
};
function countryListRender(data) {
    const markup = countryListTemplate(data);
    refs.markup.insertAdjacentHTML('beforeend',markup);
    
};
function countryRender(data) {
    const markup = countryTemplate(...data);
    refs.markup.insertAdjacentHTML('beforeend',markup);
    
};
