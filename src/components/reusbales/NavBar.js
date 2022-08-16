import React from 'react'
import dark from '../../assets/moon.svg'
import './reusable.css'


const NavBar = () => {
  return (
    <div className='nav'>
        <h2>Where in the world</h2>
        <div className='mode'>
            <img src = {dark} width={25} alt ="dark" className="darkimg" />
            <h3 className='darkText'>Dark Mode</h3>
        </div>

    </div>
  )
}

export default NavBar