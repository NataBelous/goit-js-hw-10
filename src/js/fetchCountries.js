const fetchCountries = (name) => {
  return new Promise((resolve, reject) => {
    fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          reject();
        }
      })
  });
}

export default fetchCountries;
