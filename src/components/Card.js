import { Link } from 'react-router-dom';
function Card({country}) {
    console.log(country)
  return (
    <div className="card">
       <div key={country.cca3}>
         <Link to={`/country/${country.cca3}`}>
         <div className="img-container">
         <img src={country.flags.png} alt={country.name.common}  />
         </div>
         <div className="text-container">
        <h3>{country.name.common}</h3>
        <p>population:{country.population}</p>
        <p>Region:{country.region}</p>
        <p>Capital:{country.capital}</p>
        </div>
               
            </Link>
        </div>
                                   
    </div>
  )
}
export default Card;