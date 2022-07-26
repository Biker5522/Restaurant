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

import { WaitersOrdersPage } from '../sites/adminController/reports/waitersOrders';
import { IncomePage } from '../sites/adminController/reports/incomePage';

import { EmployeesListPage } from '../sites/adminController/employeesController/employeesListPage';
import { EmployeesAddPage } from '../sites/adminController/employeesController/employeesAddPage';
import { EmployeesEditPage } from '../sites/adminController/employeesController/employeesEditPage';

import { OrderPage } from '../sites/orderPage';
import { OrdersListPage } from '../sites/adminController/ordersController/ordersListPage';
import { OrdersAddPage } from '../sites/adminController/ordersController/ordersAddPage';
import { OrdersEditPage } from '../sites/adminController/ordersController/ordersEditPage';

import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';

function NavbarRestaurant() {
	//Get token from cookies
	const [ cookies, setCookie, removeCookie ] = useCookies([ 'token' ]);
	let token = cookies.token;

	//Logout
	function Logout() {
		removeCookie('token');
		window.location.reload();
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
						<Navbar variant="dark" expand="lg">
							<Container>
								<Navbar.Brand href="#home">Apollo Restaurant</Navbar.Brand>
								<Navbar.Toggle aria-controls="basic-navbar-nav" />
								<Navbar.Collapse id="basic-navbar-nav">
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

										<NavDropdown title="Employees" id="basic-nav-dropdown">
											<NavDropdown.Item as={Link} to={'/Employees/List'}>
												Employees List
											</NavDropdown.Item>
											<NavDropdown.Item as={Link} to={'/Employees/Add'}>
												Add Employee
											</NavDropdown.Item>
										</NavDropdown>

										<NavDropdown title="Orders" id="basic-nav-dropdown">
											<NavDropdown.Item as={Link} to={'/Orders/List'}>
												Orders List
											</NavDropdown.Item>
											<NavDropdown.Item as={Link} to={'/Orders/Add'}>
												Add Order
											</NavDropdown.Item>
										</NavDropdown>

										<NavDropdown title="Reports" id="basic-nav-dropdown">
											<NavDropdown.Item as={Link} to={'/Reports/Income'}>
												Income
											</NavDropdown.Item>
										</NavDropdown>
									</Nav>
									<Nav>
										<Nav.Link as={Link} to={'/'} onClick={Logout} className="d-flex">
											Wyloguj
										</Nav.Link>
									</Nav>
								</Navbar.Collapse>
							</Container>
						</Navbar>
					</div>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/Menu" element={<Menu />} />
						<Route path="/Login" element={<LoginPage />} />
						<Route path="/Register" element={<RegisterPage />} />

						<Route path="/Menu/List" element={<MenuListPage />} />
						<Route path="/Menu/Add" element={<MenuAddPage />} />
						<Route path="/Menu/Edit/:id" element={<MenuEditPage />} />

						<Route path="/Reports/WaiterOrders" element={<WaitersOrdersPage />} />
						<Route path="/Reports/Income" element={<IncomePage />} />

						<Route path="/Employees/List" element={<EmployeesListPage />} />
						<Route path="/Employees/Add" element={<EmployeesAddPage />} />
						<Route path="/Employees/Edit/:id" element={<EmployeesEditPage />} />

						<Route path="/Orders/List" element={<OrdersListPage />} />
						<Route path="/Orders/Add" element={<OrdersAddPage />} />
						<Route path="/Orders/Edit" element={<OrdersEditPage />} />
					</Routes>
				</Router>
			);

			//User
		} else {
			return (
				<Router>
					<div className="Navbar">
						<Navbar variant="dark" expand="lg">
							<Container>
								<Navbar.Brand href="#home">Apollo Restaurant</Navbar.Brand>
								<Navbar.Toggle aria-controls="basic-navbar-nav" />
								<Navbar.Collapse id="basic-navbar-nav">
									<Nav className="me-auto">
										<Nav.Link as={Link} to={'/'}>
											Home
										</Nav.Link>
										<Nav.Link as={Link} to={'/Menu'}>
											Menu
										</Nav.Link>
										<Nav.Link as={Link} to={'/Order'}>
											Order Online
										</Nav.Link>
									</Nav>
									<Nav>
										<Nav.Link as={Link} to={'/'} onClick={Logout} className="d-flex">
											Logout
										</Nav.Link>
									</Nav>
								</Navbar.Collapse>
							</Container>
						</Navbar>
					</div>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/Menu" element={<Menu />} />
						<Route path="/Login" element={<LoginPage />} />
						<Route path="/Register" element={<RegisterPage />} />
						<Route path="/Order" element={<OrderPage />} />
					</Routes>
				</Router>
			);
		}
	} else
		return (
			<Router>
				<div className="Navbar">
					<Navbar variant="dark" expand="lg">
						<Container>
							<Navbar.Brand href="#home">Apollo Restaurant</Navbar.Brand>
							<Navbar.Toggle aria-controls="basic-navbar-nav" />
							<Navbar.Collapse id="basic-navbar-nav">
								<Nav className="me-auto">
									<Nav.Link as={Link} to={'/'}>
										Home
									</Nav.Link>
									<Nav.Link as={Link} to={'/Menu'}>
										Menu
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
							</Navbar.Collapse>
						</Container>
					</Navbar>
				</div>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/Menu" element={<Menu />} />
					<Route path="/Login" element={<LoginPage />} />
					<Route path="/Register" element={<RegisterPage />} />
				</Routes>
			</Router>
		);
}
export default NavbarRestaurant;
