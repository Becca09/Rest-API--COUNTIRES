import './App.css';
import LandingPage from '../src/pages/landingPage/LandingPage'
import Details from './pages/details/Details';
import {Routes, Route} from "react-router-dom"

function App() {
  return (
    <div className="App">
     <Routes>
                <Route path = "/" element ={<LandingPage />}/>
                <Route path = "/country-details/:name" element ={<Details/>}/>
     </Routes>
    </div>
  );
}

export default App;
