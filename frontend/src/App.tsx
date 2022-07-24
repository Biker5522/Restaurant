import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sites/homePage';
import NavbarRestaurant from './components/navbarRestaurant';
import { Row, Col } from 'react-bootstrap';
import Footer from './components/footerRestaurant';
function App() {
	return (
		<div className="App">
			<NavbarRestaurant />
			<Footer />
		</div>
	);
}

export default App;
