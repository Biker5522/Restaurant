import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import '../css.css';
import '../stylesheets/menu.css';
import axios from 'axios';

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

	return (
		<div>
			<Row className="m-0 p-0">
				<Col sm={2} />
				<Col sm={8} className="MainRow">
					<div className="Menu">
						<h1>THE</h1>
						<h1>MENU</h1>
						<div className="menuTable">
							<h2>Main Course</h2>
							<div>{mainDishes}</div>
						</div>

						<div className="menuTable">
							<h2>Burgers</h2>
							<div>{arrayBurgers}</div>
						</div>

						<div className="menuTable">
							<h2>Snacks</h2>
							<div>{arraySnacks}</div>
						</div>

						<div className="menuTable">
							<h2>Pizza</h2>
							<div>{arrayPizza}</div>
						</div>

						<div className="menuTable">
							<h2>Drinks</h2>
							<div>{arrayDrinks}</div>
						</div>
					</div>
				</Col>
				<Col sm={2} />
			</Row>
		</div>
	);
};
