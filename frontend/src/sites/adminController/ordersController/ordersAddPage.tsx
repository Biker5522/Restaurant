import axios from 'axios';
import React, { SyntheticEvent, useState, useEffect } from 'react';
import { Row, Col, FormGroup, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../../../css.css';

export const OrdersAddPage = () => {
	const [ employeeName, setEmployeeName ] = useState('');
	const [ employeeSurname, setEmployeeSurname ] = useState('');
	let [ position, setPosition ] = useState<any>();
	const [ positions, setPositions ] = useState<any[]>([]);
	let navigate = useNavigate();

	//GetDishes
	const [ backendData, setBackendData ] = useState([]);

	useEffect(() => {
		axios('/Menu').then((res) => {
			setBackendData(res.data.dishes);
		});
	}, []);

	const AddPosition = async (e: SyntheticEvent) => {
		e.preventDefault();
		positions.push(position);
		console.log(positions);
	};
	const SubmitHandler = async (e: SyntheticEvent) => {
		e.preventDefault();
		//Api connect POST User
		await axios.post('/Orders', {
			employename: employeeName,
			employeSurname: employeeSurname
		});
		navigate('/Employees/List');
	};
	return (
		<div className="">
			<Row>
				<Col sm={2} />

				<Col sm={8} className="MainRow">
					<Form onSubmit={SubmitHandler}>
						<Form.Group>
							<Form.Label>New Order</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter employee name"
								value={employeeName}
								onChange={(e: any) => setEmployeeName(e.target.value)}
							/>
							<Form.Control
								type="text"
								placeholder="Enter employee surname"
								value={employeeSurname}
								onChange={(e: any) => setEmployeeSurname(e.target.value)}
							/>
							<Form.Control
								type="text"
								placeholder="Enter table"
								value={employeeSurname}
								onChange={(e: any) => setEmployeeSurname(e.target.value)}
							/>
							<Form.Select value={position} onChange={(e: any) => setPosition(e.target.value)}>
								<option>Positions</option>
								{backendData.map((item: any) => {
									return (
										<option key={item._id} value={item.name}>
											{item.name} {item.price}$
										</option>
									);
								})}
							</Form.Select>
							<Button
								type="submit"
								variant="success"
								onClick={(e: any) => {
									e.preventDefault();
									setPositions((positions) => [ ...positions, position ]);
								}}
							>
								Submit
							</Button>
							<Form.Control
								type="date"
								placeholder="Enter date*"
								value={employeeSurname}
								onChange={(e: any) => setEmployeeSurname(e.target.value)}
							/>
							<Form.Control
								type="number"
								placeholder="Enter price*"
								value={employeeSurname}
								onChange={(e: any) => setEmployeeSurname(e.target.value)}
							/>
							<p>{JSON.stringify(positions)}</p>
						</Form.Group>

						<Button type="submit" variant="success">
							Submit
						</Button>
						<Link to="/Orders/List" className="btn btn-danger ml-2">
							Cancel
						</Link>
					</Form>
				</Col>

				<Col sm={2} />
			</Row>
		</div>
	);
};
