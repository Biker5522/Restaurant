import React, { useEffect, useState } from 'react';
import NavbarRestaurant from '../components/navbarRestaurant';
import { Row, Col } from 'react-bootstrap';
import '../css.css';
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
	const mainDishes = backendData.map((backendData: Dish) => {
		if (backendData.category == 'main-course') return <p>{backendData.name}</p>;
	});
	//Get Pizza
	const arrayPizza = backendData.map((backendData: Dish) => {
		if (backendData.category == 'pizza') return <p>{backendData.name}</p>;
	});
	//Get Drinks
	const arrayDrinks = backendData.map((backendData: Dish) => {
		if (backendData.category == 'drink') return <p>{backendData.name}</p>;
	});
	//Get Snacks
	const arraySnacks = backendData.map((backendData: Dish) => {
		if (backendData.category == 'snack') return <p>{backendData.name}</p>;
	});

	return (
		<div>
			<Row>
				<Col sm={2} />
				<Col sm={8} className="MainRow">
					<div className="Menu">
						<h1>Menu</h1>
						<h2>Main Course</h2>
						<div>{mainDishes}</div>
						<h2>Pizza</h2>
						<div>{arrayPizza}</div>
						<h2>Drinks</h2>
						<div>{arrayDrinks}</div>
						<h2>Snacks</h2>
						<div>{arraySnacks}</div>
					</div>
				</Col>
				<Col sm={2} />
			</Row>
		</div>
	);
};
