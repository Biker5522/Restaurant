import React, { useState, SyntheticEvent, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/orderOnline.css';

export const OrderPage = () => {
	const [ email, setEmail ] = useState();
	const [ street, setStreet ] = useState();
	const [ phone, setPhone ] = useState();
	const [ flatNumber, setFlatNumber ] = useState();
	let [ errorMsg, setError ] = useState('');
	let [ position, setPosition ] = useState<any>();
	const [ positions, setPositions ] = useState<any[]>([]);
	const [ backendData, setBackendData ] = useState([]);

	let price = 0;
	let navigate = useNavigate();
	let positionsSend: any[] = [];
	//Post Order
	const SubmitHandler = async (e: SyntheticEvent) => {
		e.preventDefault();
		{
			positions.map((position) => {
				positionsSend.push(position.split(',')[0]);
			});
		}
		//Api connect POST User
		await axios
			.post('/Orders/Online', {
				email: email,
				street: street,
				phone: phone,
				flatNumber: flatNumber,
				positions: positionsSend
			})
			.then((res) => {})
			.catch((error) => {
				if (error.response) {
					setError(error.response.data.result);
				}
			});
	};

	useEffect(() => {
		axios('/Menu').then((res) => {
			setBackendData(res.data.dishes);
		});
	}, []);
	return (
		<div>
			<Row className="m-0 p-0">
				<Col sm={2} />
				<Col sm={8}>
					<div>
						<div className="OrderMain">
							<div className="Card">
								<h2>Place an Order</h2>
								<h5 className="alert-danger">{errorMsg}</h5>
								<Form id="orderForm" onSubmit={SubmitHandler}>
									<Form.Group className="mb-3">
										<Form.Label>Email address</Form.Label>
										<Form.Control
											type="email"
											placeholder="Enter Email"
											onChange={(e: any) => setEmail(e.target.value)}
										/>
										<Form.Text className="text-muted" />
									</Form.Group>
									<Form.Group className="mb-3">
										<Form.Label>Phone Number</Form.Label>
										<Form.Control
											type="number"
											placeholder="Enter Phone Number"
											onChange={(e: any) => setPhone(e.target.value)}
										/>
										<Form.Text className="text-muted" />
									</Form.Group>
									<Form.Group className="mb-3">
										<Form.Label>Street and House Number</Form.Label>
										<Form.Control
											type="text"
											placeholder="Enter Street"
											onChange={(e: any) => setStreet(e.target.value)}
										/>
										<Form.Text className="text-muted" />
									</Form.Group>
									<Form.Group className="mb-3">
										<Form.Label>Flat Number*</Form.Label>
										<Form.Control
											type="text"
											placeholder="Enter Flat Number"
											onChange={(e: any) => setFlatNumber(e.target.value)}
										/>
										<Form.Text className="text-muted" />
									</Form.Group>
									<Form.Label>Add Position</Form.Label>
									<Form.Select value={position} onChange={(e: any) => setPosition(e.target.value)}>
										<option value="positions">Products</option>
										{backendData.map((item: any) => {
											let returnDishAndPrice: any[] = [];
											returnDishAndPrice.push(item.name);
											returnDishAndPrice.push(item.price);

											return (
												<option key={item._id} value={returnDishAndPrice}>
													{item.name} {item.price}$
												</option>
											);
										})}
									</Form.Select>
									<Button
										type="submit"
										variant="success"
										className="mt-3"
										onClick={(e: any) => {
											e.preventDefault();
											if (positions.length == 14) {
												setError('To many positions');
											}
											if (position != null && position != 'positions' && positions.length < 14) {
												setPositions((positions) => [ ...positions, position ]);
											}
										}}
									>
										Add Position
									</Button>
								</Form>
							</div>
							<div className="OrderSmallRow">
								<div className="SROrder">
									<h3>Your Order</h3>
									<div>
										{positions.map((position) => {
											price = price + +position.split(',')[1];
											console.log(price);
											return (
												<li>
													{position.split(',')[0]} {position.split(',')[1]}$
												</li>
											);
										})}
									</div>
								</div>
								<p>Price: {price}</p>
								<Button className="SubmitButton" type="submit" variant="success" form="orderForm">
									Submit Order
								</Button>
							</div>
						</div>
					</div>
				</Col>
				<Col sm={2} />
			</Row>
		</div>
	);
};
