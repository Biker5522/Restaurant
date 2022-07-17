import React, { Fragment, useEffect, useState } from 'react';
import NavbarRestaurant from '../components/navbarRestaurant';
import { Row, Col } from 'react-bootstrap';
import '../css.css';
import '../stylesheets/menu.css';
import axios from 'axios';
import { resolve } from 'node:path/win32';
import { Dish } from '../interfaces';

export const Menu = () => {
	const [ backendData, setBackendData ] = useState([]);

	useEffect(() => {
		axios('/Menu').then((res) => {
			setBackendData(res.data.dishes);
		});
	}, []);

	//Get Main Dishes
	const mainDishes = backendData.map((backendData: any) => {
		if (backendData.category == 'main-course')
			return (
				<Fragment>
					<p>
						{backendData.name} {backendData.price}$
					</p>
				</Fragment>
			);
	});
	//Get Pizza
	const arrayPizza = backendData.map((backendData: any) => {
		if (backendData.category == 'pizza')
			return (
				<Fragment>
					<p>
						{backendData.name} {backendData.price}$
					</p>
				</Fragment>
			);
	});
	//Get Drinks
	const arrayDrinks = backendData.map((backendData: any) => {
		if (backendData.category == 'drink')
			return (
				<Fragment>
					<p>
						{backendData.name} {backendData.price}$
					</p>
				</Fragment>
			);
	});
	//Get Snacks
	const arraySnacks = backendData.map((backendData: any) => {
		if (backendData.category == 'snack')
			return (
				<Fragment>
					<p>
						{backendData.name} {backendData.price}$
					</p>
				</Fragment>
			);
	});
	//Get Burger
	const arrayBurgers = backendData.map((backendData: any) => {
		if (backendData.category == 'burger')
			return (
				<Fragment>
					<p>
						{backendData.name} {backendData.price}$
					</p>
				</Fragment>
			);
	});
	//Get Desserts
	const arrayDesserts = backendData.map((backendData: any) => {
		if (backendData.category == 'dessert')
			return (
				<Fragment>
					<p>
						{backendData.name} {backendData.price}$
					</p>
				</Fragment>
			);
	});

	return (
		<div>
			<Row className="m-0 p-0">
				<Col sm={2} />
				<Col sm={8} className="MainRow">
					<div className="Menu">
						<Row>
							<h2>THE</h2>
							<h1>MENU</h1>
							<Col sm={4}>
								<div className="menuTable">
									<h2>Burgers</h2>
									<div>{arrayBurgers}</div>
								</div>
								<div className="menuTable">
									<h2>Snacks</h2>
									<div>{arraySnacks}</div>
								</div>
								<Row />
							</Col>
							<Col sm={8}>
								<div className="menuTable">
									<h2>Main Course</h2>
									<div>{mainDishes}</div>
								</div>
								<Row>
									<Col sm>
										<div className="menuTable">
											<h2>Pizza</h2>
											<div>{arrayPizza}</div>
										</div>
									</Col>
									<Col sm>
										<div className="menuTable">
											<h2>Drinks</h2>
											<div>{arrayDrinks}</div>
										</div>
									</Col>
								</Row>
							</Col>
						</Row>
						<Col sm={12}>
							<div className="menuTable">
								<h2>Desserts</h2>
								<div>{arrayDesserts}</div>
							</div>
						</Col>
					</div>
				</Col>
				<Col sm={2} />
			</Row>
		</div>
	);
};
