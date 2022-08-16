import React, { useCallback, useEffect, useState } from 'react'
import arrow from "../../assets/arrow-left.svg"
import NavBar from '../../components/reusbales/NavBar'
import germany from "../../assets/Flag_of_Germany.svg"
import "./details.css"
import { api } from "../../util/api";
import {useParams} from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import { TailSpin } from "react-loader-spinner";


const Details = () => {
    const {name} = useParams();
    const countryDetailsUrl = `${api.baseUrl}/name/${name}?fullText=true`
    const [countryDetails ,setCountryDetails] = useState(null)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const getCountryDetails = useCallback(async ()=>{
        setLoading(true);
            const res = await fetch(countryDetailsUrl, {
                method: 'GET'
            })

            if(res.ok){
                const info  = await res.json();
                setLoading(false);
                setCountryDetails(info[0])
                console.log(info);
            }
    },[countryDetailsUrl])

    useEffect(()=>{
        getCountryDetails()
    },[getCountryDetails])


    if(loading || countryDetails === null){
        return (
          <div style={{
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            justifyContent : 'center',
            alignItems: 'center',
            backgroudColor: 'red'
          }}>
            <TailSpin color="red" height={100} width={100} />
          </div>
        )
      }


  return (
    <div>
        <NavBar/>
        <div className="details-body">
            <div className="back-button" onClick={ () => navigate ("/")}><button> <img src={arrow} width={10 }  alt="arrowback"/> Back</button></div>
            <div className= "detials_">
                <img src={countryDetails.flags.svg} width={600}  alt="germany"/>
                <div className="country-details">
                   <div className='infos'>
                        <div className="country-info1">
                                <h2>{name}</h2>
                                <p><span>Native Name:</span>{countryDetails.name.nativeName.eng.official}</p>
                                <p><span>Population:</span>{countryDetails.population}</p>
                                <p><span>Region:</span>{countryDetails.region}</p>
                                <p><span>Sub Region:</span>{countryDetails.subregion}</p>
                                <p><span>Capital:</span>{countryDetails.capital}</p>
                            </div>

                            <div className="country-info2">
                                <p><span>Top Level Domain:</span>be</p>
                                <p><span>Currencies:</span>{countryDetails.currency}</p>
                                <p><span>Langauge:</span>Dutch, French, German</p>
                            </div>
                   </div>

                    <div className="border-countries">
                        <p>Border Countries:</p>
                        <div className="buttons">
                            <button>France</button>
                            <button>Germany</button>
                            <button>Netherlands</button>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Details