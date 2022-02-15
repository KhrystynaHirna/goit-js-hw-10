import './css/styles.css';
import debounce from 'lodash/debounce';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('input#search-box');
const countryList = document.querySelector('country-list');
const countryInfo = document.querySelector('country-info');
const DEBOUNCE_DELAY = 300;
const BASE_URL = 'https://restcountries.com/v3.1/name'
let countryName = '';


input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

fetchCountries();

// wynesty okremo
function fetchCountries(countryName) {
   return fetch('${BASE_URL}/${countryName}?fields=name,capital,population,flags,languages')
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
}
// ///////

function onInputSearch(evt) {
    // countryName = evt.currentTarget.elements.query.value;
    // fetchCountries(countryName);

    // if (countryName.length > 10) {
        // Notiflix.Notify.warning(`Too many matches found. Please enter a more specific name.`)
    // } else if (!countryName) {
    //     Notiflix.Notify.warning(`Oops, there is no country with that name`)
    // }
    countryName = evt.target.value.trim();
    clearInput();
    setCountries(countryName);

    
}
    
function setCountries(countryName) {
    fetchCountries(countryName)
        .then(data => {
            const amount = data.length;
            if (amount > 10) {
                Notiflix.Notify.warning(`Too many matches found. Please enter a more specific name.`);
                return;
            }
            if (amount >= 2 && amount <= 10) {
                renderCountries(data);
            }
    })
}

function clearInput() {
    countryList.innerHTML = "";
    countryInfo.innerHTML = "";
}


function renderCountries(data) {
    countryList.insertAdjacentHTML('beforeend', countriesList(data));
}