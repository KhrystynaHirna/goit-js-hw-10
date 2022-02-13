import './css/styles.css';
import debounce from 'lodash/debounce';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('input#search-box');
const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

fetchCountries();

function fetchCountries(name) {
    fetch('https://restcountries.com/v2/name/{name}')
        .then(response => {
            return response.json();
        })
        .then(country => {
            console.log(country);
        })
        .catch(error => {
            console.log(error);
        })        
}

function onInputSearch() {

}