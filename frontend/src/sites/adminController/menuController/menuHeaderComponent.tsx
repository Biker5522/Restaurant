import React from 'react';
import { Row, Col, FormGroup, Form, Button, Navbar, Container, NavbarBrand, NavItem, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../../css.css';
export const MenuHeaderComponent = () => {
	return (
		
		<Navbar bg="dark" variant="dark" >
			<Container>
				<NavbarBrand href="/">Products</NavbarBrand>
				<Nav>
					<NavItem>
						<Link className="btn btn-primary" to="../Menu/add">
							Add Product
						</Link>
					</NavItem>
				</Nav>
			</Container>
		</Navbar>
		
	);
};
