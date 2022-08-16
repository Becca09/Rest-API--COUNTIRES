import React, { useEffect, useCallback, useState } from "react";
import NavBar from "../../components/reusbales/NavBar";
import searchh from "../../assets/search.svg";
import './landingpage.css'
import CountryCard from "../../components/landingPage/CountryCard";
import { api } from "../../util/api";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { TailSpin } from "react-loader-spinner";

 
const LandingPage = () => {
  const allCountriesUrl = `${api.baseUrl}/all`
  const [countries, setCountries] = useState([]);
  const [originalList, setOriginalList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');

  const updateSearchPhrase  =(event) => {
    const value = event.target.value
    setSearchPhrase(value);
    if(value.length === 0){
      setCountries(originalList)
    }
  } 


  const getAllCountries = useCallback( async ()=>{
    setLoading(true);
    const res = await fetch(allCountriesUrl, {
      method: 'GET'
    })
    // console.log(res)
    if (res.ok){
      const data = await res.json();
      setLoading(false);
      setCountries(data);
      setOriginalList(data);
      toast('Success', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      setLoading(false)
      toast('Something went wrong', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  },[allCountriesUrl])


  const search = async()=>{
      // setLoading(true)
      const value =searchPhrase
      const res = await fetch(`https://restcountries.com/v3.1/name/${value}`, {
          margin: 'GET'
      }) 

      if(res.ok){
        const data = await res.json();
        // setCountries(data)
        console.log(data)
      }

      // console.log(res)
  }


  useEffect(()=>{
    getAllCountries();
  },[])

  if(loading){
    return (
      <div style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent : 'center',
        alignItems: 'center'
      }}>
        <TailSpin color="red" height={100} width={100} />
      </div>
    )
  }
  const handleEvent = (event) => {
    console.log(searchPhrase)
    // if (event.key === 'Enter') {
    //   search()
    // }
  }

  return (
    <div className="body">
      <ToastContainer />
      <NavBar />
      <div className="search-filter">
        <div className="search">
          <img src={searchh} width={20} alt="search" />
         
          <input type="search" 
          id="search" 
          name="search" 
          value={searchPhrase}
          placeholder="search for a countiry...."
          onKeyDown={e => e.key === 'Enter' && search() }
          onChange={e=>updateSearchPhrase(e)}
          
          >

          </input>

       


        </div>

        <div className="filter-by">
          <select name="countries" id="country">
            <option className="top-option" value="" selcted > Filter By</option>
            <option value="africa">Africa</option>
            <option value="america">Americ</option>
            <option value="asia">asia</option>
            <option value="europe">europe</option>
            <option value="oceania">Oceania</option>
          </select>
        </div>
      </div>

<div className="list-of-countires">
          {countries.map((data,index) =>(
              <CountryCard countries ={data} key ={index}/>
            ))}


      </div>
   </div>
      
  )
};

export default LandingPage;
