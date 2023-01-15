import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import fetchCountries from './js/fetchCountries';

import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');

const onSearch = debounce((event) => {
  clearMarkup();

  const searchQuery = event.target.value.trim();
  if (!searchQuery) return;

  fetchCountries(searchQuery)
    .then((countries) => {
      if (countries.length === 1) {
        renderCountry(countries[0]);
      } else if (countries.length >= 2 && countries.length <= 10) {
        renderCountriesList(countries);
      } else if (countries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
      }
    })
    .catch((error) => {
      Notify.failure('Oops, there is no country with that name');
    });
});

const renderCountry = (country) => {
  const markup = `
    <div class="country">
      <h2>
        <img src="${country.flags.svg}" alt="${country.name.official}" width="20" />
        ${country.name.official}
      </h2>
      <p><b>Capital:</b> ${country.capital}</p>
      <p><b>Population:</b> ${country.population}</p>
      <p><b>Languages:<b> ${Object.values(country.languages).join(', ')}</p>
    </div>
  `;
  document.querySelector('.country-info').innerHTML = markup;
}

const renderCountriesList = (countries) => {
  const markup = countries.map(country => `
    <li>
      <img src="${country.flags.svg}" alt="${country.name.official}" width="16" />
      ${country.name.official}
    </li>
  `).join('');
  document.querySelector('.country-list').innerHTML = markup;
}

const clearMarkup = () => {
  document.querySelector('.country-info').innerHTML = '';
  document.querySelector('.country-list').innerHTML = '';
}

inputRef.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
