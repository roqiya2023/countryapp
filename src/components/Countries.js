import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from './Card';


function Countries(){
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [region, setRegion] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(()=>{
        axios.get('https://restcountries.com/v3.1/all')
        .then((response)=>{
            setCountries(response.data);
            
        })
        .catch((error)=>{
            console.log(error);
        })
    },[]);
   
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    }
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }
    const handleRegionChange = (e) => {
        setRegion(e.target.value);
    }

 const filteredCountries = countries.filter((country) => {
        return country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) && country.region.toLowerCase().includes(region.toLowerCase());
    });


return(
    <div className={`main-countries-container ${isDarkMode ? 'dark-mode' : 'light-mode'}` }>
        <header className={ `${isDarkMode ? 'dark-mode' : 'light-mode'} `}>
            <h1>Where in the world?</h1>
            <button className={`btn ${isDarkMode ? 'dark-mode' : 'light-mode'}`} onClick={toggleTheme}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</button>
        </header>
        <div className={`search-field ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <input className={ `${isDarkMode ? 'dark-mode' : 'light-mode'} `}
        type="text"
         placeholder="Search..." 
         onChange={handleSearchChange}
            value={searchTerm}

          />
          <select value={region} onChange={handleRegionChange} className={ `${isDarkMode ? 'dark-mode' : 'light-mode'} `}>
                <option value="">Filter by Region</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
            </select>

            </div>
          {
            filteredCountries && (
                <div className="filtered-countries-container">
                    
                    <div  className={ `countries-container ${isDarkMode ? 'dark-mode' : 'light-mode'} `}>
                        {
                            filteredCountries.map((country)=>(
                               <Card key={country.cca3} country={country} />
                            ))
                        }
                    </div>
                </div>
            )
            
          }
         <div className={ `countries-container ${isDarkMode ? 'dark-mode' : 'light-mode'} `}>
        {
            countries.map((country)=>(
                <Card key={country.cca3} country={country} />
            ))
        }
        </div>
    </div>
)

}
export default Countries;