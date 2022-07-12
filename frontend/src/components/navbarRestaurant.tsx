import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css.css';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';
import { Home } from '../sites/homePage';
import { Menu } from '../sites/menuPage';
import { LoginPage } from '../sites/loginPage';
import { RegisterPage } from '../sites/registerPage';
import { MenuListPage } from '../sites/adminController/menuController/menuListPage';
import { MenuAddPage } from '../sites/adminController/menuController/menuAddPage';
import { MenuEditPage } from '../sites/adminController/menuController/menuEditPage';
import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';

function NavbarRestaurant() {
	//Get token from cookies
	const [ cookies, setCookie, removeCookie ] = useCookies([ 'token' ]);
	let token = cookies.token;
	console.log(token);

	//Logout
	function Logout() {
		removeCookie('token');
	}
	//Check is User Logged
	if (token != null) {
		//Decode JWT Token
		let decodedToken: any = jwt_decode(token);
		//Check Role of User
		//Admin
		if (decodedToken._role == 'admin') {
			return (
				<Router>
					<div className="Navbar">
						<Navbar bg="light" variant="light">
							<Container>
								<Navbar.Brand href="#home">Apollo Restaurant</Navbar.Brand>
								<Nav className="me-auto">
									<Nav.Link as={Link} to={'/'}>
										Home
									</Nav.Link>
									<NavDropdown title="Menu" id="basic-nav-dropdown">
										<NavDropdown.Item as={Link} to={'/Menu'}>
											User Menu
										</NavDropdown.Item>
										<NavDropdown.Item as={Link} to={'/Menu/List'}>
											List of Dishes
										</NavDropdown.Item>
										<NavDropdown.Item as={Link} to={'/Menu/Add'}>
											Add Dish
										</NavDropdown.Item>
									</NavDropdown>
									<Nav.Link as={Link} to={'/Stoliki'}>
										Stoliki
									</Nav.Link>
								</Nav>
								<Nav>
									<Nav.Link as={Link} to={'/'} onClick={Logout} className="d-flex">
										Wyloguj
									</Nav.Link>
								</Nav>
							</Container>
						</Navbar>
					</div>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/Menu" element={<Menu />} />
						<Route path="/Stoliki" />
						<Route path="/Login" element={<LoginPage />} />
						<Route path="/Menu/List" element={<MenuListPage />} />
						<Route path="/Menu/Add" element={<MenuAddPage />} />
						<Route path="/Menu/Edit/:id" element={<MenuEditPage />} />
						<Route path="/Register" element={<RegisterPage />} />
					</Routes>
				</Router>
			);
			//User
		} else {
			return (
				<Router>
					<div className="Navbar">
						<Navbar bg="light" variant="light">
							<Container>
								<Navbar.Brand href="#home">Apollo Restaurant</Navbar.Brand>
								<Nav className="me-auto">
									<Nav.Link as={Link} to={'/'}>
										Home
									</Nav.Link>
									<Nav.Link as={Link} to={'/Menu'}>
										Menu
									</Nav.Link>
									<Nav.Link as={Link} to={'/Stoliki'}>
										Stoliki
									</Nav.Link>
								</Nav>
								<Nav>
									<Nav.Link as={Link} to={'/'} onClick={Logout} className="d-flex">
										Wyloguj
									</Nav.Link>
								</Nav>
							</Container>
						</Navbar>
					</div>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/Menu" element={<Menu />} />
						<Route path="/Stoliki" />
						<Route path="/Login" element={<LoginPage />} />
						<Route path="/Register" element={<RegisterPage />} />
					</Routes>
				</Router>
			);
		}
	} else
		return (
			<Router>
				<div className="Navbar">
					<Navbar bg="light" variant="light">
						<Container>
							<Navbar.Brand href="#home">Apollo Restaurant</Navbar.Brand>
							<Nav className="me-auto">
								<Nav.Link as={Link} to={'/'}>
									Home
								</Nav.Link>
								<Nav.Link as={Link} to={'/Menu'}>
									Menu
								</Nav.Link>
								<Nav.Link as={Link} to={'/Stoliki'}>
									Stoliki
								</Nav.Link>
							</Nav>
							<Nav>
								<Nav.Link as={Link} to={'/Login'}>
									Login
								</Nav.Link>
								<Nav.Link as={Link} to={'/Register'}>
									Register
								</Nav.Link>
							</Nav>
						</Container>
					</Navbar>
				</div>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/Menu" element={<Menu />} />
					<Route path="/Stoliki" />
					<Route path="/Login" element={<LoginPage />} />
					<Route path="/Register" element={<RegisterPage />} />
				</Routes>
			</Router>
		);
}
export default NavbarRestaurant;
