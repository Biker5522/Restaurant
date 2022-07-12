import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sites/homePage'
import NavbarRestaurant from './components/navbarRestaurant'
import {Row,Col} from 'react-bootstrap'
function App() {
  return (
    <div className="App">
       <NavbarRestaurant/>
  </div>
   
  );
}

export default App;
