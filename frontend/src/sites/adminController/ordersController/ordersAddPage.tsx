import axios from 'axios';
import React, { SyntheticEvent, useState, useEffect } from 'react';
import { Row, Col, FormGroup, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../../../css.css';

export const OrdersAddPage = () => {
	const [ employeeName, setEmployeeName ] = useState('');
	const [ employeeSurname, setEmployeeSurname ] = useState('');
	const [ positions, setPositions ] = useState([]);

	let navigate = useNavigate();
	//GetDishes
	const [ backendData, setBackendData ] = useState([]);

	useEffect(() => {
		axios('/Menu').then((res) => {
			setBackendData(res.data.dishes);
		});
	}, []);

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
							<Form.Select aria-label="Default select example">
								<option value="1">Two</option>
							</Form.Select>
							<Form.Select value={positions}>
								<option>Positions</option>
								{backendData.map((item: any) => {
									return (
										<option key={item._id} value={item.name}>
											{item.name} {item.price}$
										</option>
									);
								})}
							</Form.Select>
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
