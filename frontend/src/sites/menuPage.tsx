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

	//Get Pizza
	const arrayPizza = backendData.map((backendData: Dish) => {
		if (backendData.category == 'pizza') return <p>{backendData.name}</p>;
	});
	//Get Drinks
	const arrayDrink = backendData.map((backendData: Dish) => {
		if (backendData.category == 'drink') return <p>{backendData.name}</p>;
	});

	return (
		<div>
			<Row>
				<Col sm={2} />
				<Col sm={8} className="MainRow">
					<div className="Menu">
						<h1>Menu</h1>
						<h2>Pizza</h2>
						<div>{arrayPizza}</div>
					</div>
				</Col>
				<Col sm={2} />
			</Row>
		</div>
	);
};
