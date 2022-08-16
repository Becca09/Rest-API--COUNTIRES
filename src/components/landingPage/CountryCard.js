import React from 'react'
import '../../pages/landingPage/landingpage.css'
import {useNavigate} from "react-router-dom";

const CountryCard = ({countries}) => {
  console.log('country info', countries)
  const navigate = useNavigate();
  return (
<div className="cardList" >
        <div className='card' onClick={
            () => navigate ("/country-details/"  + countries.name.common)
        }>
          <div className="card-img">
            <img src={countries.flags.svg} width={240}  alt={countries.countryName}/>
          </div>
         

            <div className='info'>
                <h3>{countries.name.common}</h3>
                <p><b>Population:  </b>{countries.population}</p>
                <p><b>Region:      </b>{countries.region}</p>
                <p><b>Capital:     </b>{countries.capital}</p> 
              
            </div>
        </div>
</div>
    
  )
}

export default CountryCard