import './css/styles.css';
import debounce from 'lodash/debounce';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import countriesListEl from './countries_list.hbs';
import countriesInfoEl from './countries_info.hbs';
import { fetchCountries } from './fetch_countries';

const input = document.querySelector('input#search-box');
const countryList = document.querySelector('country-list');
const countryInfo = document.querySelector('country-info');
const DEBOUNCE_DELAY = 300;

let countryName = '';


input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

fetchCountries();

function onInputSearch(evt) {
    countryName = evt.target.value.trim();
    clearInput();
    setCountries(countryName); 

function setCountries(countryName) {
    fetchCountries(countryName)
        .then(data => {
            const amount = data.length;
            if (amount > 10) {
                Notiflix.Notify.warning(`Too many matches found. Please enter a more specific name.`);
                return;
            }
            if (amount >= 2 && amount <= 10) {
                renderCountriesList(data);
            } else {
                renderCountriesInfo(data);
            }
        })
        .catch(fetchError);
}

}
    
// function setCountries(countryName) {
//     fetchCountries(countryName)
//         .then(data => {
//             const amount = data.length;
//             if (amount > 10) {
//                 Notiflix.Notify.warning(`Too many matches found. Please enter a more specific name.`);
//                 return;
//             }
//             if (amount >= 2 && amount <= 10) {
//                 renderCountriesList(data);
//             } else {
//                 renderCountriesInfo(data);
//             }
//         })
//         .catch(fetchError(error));
// }

function clearInput() {
    countryList.innerHTML = "";
    countryInfo.innerHTML = "";
}


function renderCountriesList(data) {
    countryList.insertAdjacentHTML('beforeend', countriesListEl(data));
}
function renderCountriesInfo(data) {
    countryList.insertAdjacentHTML('beforeend', countriesInfoEl(data));
}
function fetchError(error) {
    if (countryName !== "") {
        Notiflix.Notify.failure("Oops, there is no country with that name");
    }
}