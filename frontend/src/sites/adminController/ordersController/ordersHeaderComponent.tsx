import React from 'react';
import { Row, Col, FormGroup, Form, Button, Navbar, Container, NavbarBrand, NavItem, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../../css.css';
export const OrdersHeaderComponent = () => {
	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<NavbarBrand href="/">Orders</NavbarBrand>
				<Nav>
					<NavItem>
						<Link className="btn btn-primary" to="../Orders/Add">
							Add Order
						</Link>
					</NavItem>
				</Nav>
			</Container>
		</Navbar>
	);
};
