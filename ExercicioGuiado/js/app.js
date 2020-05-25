let tabCountries = null;
let tabFavorites = null;
let allCountries = [];
let favoriteCountries = [];
let countCountries = 0;
let countFavorites = 0;
let totalPopulationList = 0;
let totalPopulationFavorites = 0;
let numberFormat = null;

window.addEventListener('load', () => {
  tabCountries = document.querySelector('#tabCountries');
  tabFavorites = document.querySelector('#tabFavorites');
  countCountries = document.querySelector('#countCountries');
  countFavorites = document.querySelector('#countFavorites');

  totalPopulationList = document.querySelector('#totalPopulationList');
  //prettier-ignore
  totalPopulationFavorites = document.querySelector('#totalPopulationFavorites');

  numberFormat = Intl.NumberFormat('pt-BR');

  fetchCountries();
});

async function fetchCountries() {
  const res = await fetch('http://restcountries.eu/rest/v2/all');
  const json = await res.json();
  allCountries = json.map((country) => {
    const { numericCode, translations, population, flag } = country;
    return {
      id: numericCode,
      name: country.translations.pt,
      population,
      formattedPopulation: formatNumber(population),
      flag,
    };
  });
  render();
}

function render() {
  renderCountryList();
  renderCountryFavorites();
  renderSummary();
  handleCountryButtons();
}

function renderCountryList() {
  let countriesHTML = '<div>';

  allCountries.forEach((country) => {
    const { name, flag, id, population, formattedPopulation } = country;
    const countryHTML = `
      <div class='country'>
        <div>
          <a id='${id}' class="waves-effect waves-light btn">+</a>
        </div>
        <div>
          <img src='${flag}' alt='${name}'>
        </div>
        <div>
          <ul>
            <li>${name}</li>
            <li>${formattedPopulation}</li>
          </ul>
        </div>
      </div>  
    `;
    countriesHTML += countryHTML;
  });
  countriesHTML += '</div>';
  tabCountries.innerHTML = countriesHTML;
}

function renderCountryFavorites() {
  let favoritesHTML = '<div>';

  favoriteCountries.forEach((favorite) => {
    const { name, flag, id, population, formattedPopulation } = favorite;
    const favoriteHTML = `
      <div class='country'>
        <div>
          <a id='${id}' class="waves-effect waves-light btn red darken">-</a>
        </div>
        <div>
          <img src='${flag}' alt='${name}'>
        </div>
        <div>
          <ul>
            <li>${name}</li>
            <li>${formattedPopulation}</li>
          </ul>
        </div>
      </div>  
    `;
    favoritesHTML += favoriteHTML;
  });
  favoritesHTML += '</div>';
  tabFavorites.innerHTML = favoritesHTML;
}

function renderSummary() {
  countCountries.textContent = allCountries.length;
  countFavorites.textContent = favoriteCountries.length;
  const totalPopulation = allCountries.reduce((acc, curr) => {
    return acc + curr.population;
  }, 0);

  const totalFavorites = favoriteCountries.reduce((acc, curr) => {
    return acc + curr.population;
  }, 0);

  totalPopulationList.textContent = formatNumber(totalPopulation);
  totalPopulationFavorites.textContent = formatNumber(totalFavorites);
}

function handleCountryButtons() {
  const countryButtons = Array.from(tabCountries.querySelectorAll('.btn'));
  const favoriteButtons = Array.from(tabFavorites.querySelectorAll('.btn'));

  countryButtons.forEach((button) => {
    button.addEventListener('click', () => addToFavorites(button.id));
  });

  favoriteButtons.forEach((button) => {
    button.addEventListener('click', () => removeFromFavorites(button.id));
  });
}

function addToFavorites(id) {
  const countryToAdd = allCountries.find((country) => country.id === id);
  favoriteCountries = [...favoriteCountries, countryToAdd];
  favoriteCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  allCountries = allCountries.filter((country) => country.id !== id);
  render();
}

function removeFromFavorites(id) {
  const countryToRemove = favoriteCountries.find(
    (country) => country.id === id
  );
  allCountries = [...allCountries, countryToRemove];
  allCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  favoriteCountries = favoriteCountries.filter((country) => country.id !== id);
  render();
}

function formatNumber(num) {
  return numberFormat.format(num);
}