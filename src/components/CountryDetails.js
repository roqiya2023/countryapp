import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function CountryDetails() {
  const { cca3 } = useParams();
  const [countryDetails, setCountryDetails] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/alpha/${cca3}`)
      .then((response) => {
        setCountryDetails(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [cca3]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (!countryDetails) {
    return <div>Loading...</div>;
  }
 console.log(countryDetails)
  // Helper function to convert object entries to a string
  const objectToString = (obj) => {
    return obj ? Object.values(obj).map(value => value.name ? value.name : value).join(', ') : 'N/A';
  };

  return (
    <div className={`${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <header className={`${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <h1>Where in the world?</h1>
        <button className={`btn ${isDarkMode ? 'dark-mode' : 'light-mode'}`} onClick={toggleTheme}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</button>
      </header>
     
      <div className={`country-details ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <button className={`btn ${isDarkMode ? 'dark-mode' : 'light-mode'}`}> <Link to="/">Back</Link></button>
        <div className="country-details-main-container">
        <div className="country-details-img-container">
          <img src={countryDetails.flags.png} alt={countryDetails.name.common} />
        </div>
        <div className={`bottom-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className="country-details-text-container">
          <div className="left">
            <h1>{countryDetails.name.common}</h1>
            <p>Native Name: {countryDetails.name.nativeName ? objectToString(countryDetails.name.nativeName) : 'N/A'}</p>
            <p>Population: {countryDetails.population}</p>
            <p>Region: {countryDetails.region}</p>
            <p>Sub Region: {countryDetails.subregion}</p>
            <p>Capital: {countryDetails.capital ? countryDetails.capital.join(', ') : 'N/A'}</p>
          </div>
          <div className="right">
            <p>Top Level Domain: {countryDetails.tld ? countryDetails.tld.join(', ') : 'N/A'}</p>
            <p>Currencies: {objectToString(countryDetails.currencies)}</p>
            <p>Languages: {objectToString(countryDetails.languages)}</p>
          </div>
        </div>
        <div className="border-container">
        <h2>Borders Countries:</h2>
         <ul className='border-list'>
            
            {countryDetails.borders ? countryDetails.borders.map(border => (
              <li key={border} className={`${isDarkMode ? 'dark-mode' : 'light-mode'}`}>{border}</li>
            )) : <li>No borders</li>}
          </ul>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;
