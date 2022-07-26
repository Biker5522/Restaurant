import axios from 'axios';
import React, { SyntheticEvent, useState, useEffect } from 'react';
import { Row, Col, FormGroup, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../../../css.css';

export const OrdersAddPage = () => {
	const [ employeeName, setEmployeeName ] = useState('');
	const [ employeeSurname, setEmployeeSurname ] = useState('');
	let [ table, setTable ] = useState('');
	let [ position, setPosition ] = useState<any>();
	const [ positions, setPositions ] = useState<any[]>([]);
	let [ errorMsg, setError ] = useState('');
	let navigate = useNavigate();

	//GetDishes
	const [ backendData, setBackendData ] = useState([]);
	const [ tables, setTables ] = useState([]);

	useEffect(() => {
		axios('/Menu').then((res) => {
			console.log(res.data.dishes);
			setBackendData(res.data.dishes);
		});
	}, []);

	useEffect(() => {
		axios('/Tables').then((res) => {
			console.log(res.data.tables);
			setTables(res.data.tables);
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
		await axios
			.post('/Orders', {
				employename: employeeName,
				employeSurname: employeeSurname,
				table: table
			})
			.catch((error) => {
				if (error.response) {
					setError(error.response.data);
				}
			});
	};
	return (
		<div className="">
			<Row>
				<Col sm={2} />

				<Col sm={8} className="MainRow">
					<div className="Card">
						<h2>New Order</h2>
						<h5 className="alert-danger">{errorMsg}</h5>
						<Form onSubmit={SubmitHandler}>
							<Form.Group>
								<Form.Label>Employee Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter employee name"
									value={employeeName}
									onChange={(e: any) => setEmployeeName(e.target.value)}
								/>
								<Form.Label>Employee Surname</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter employee surname"
									value={employeeSurname}
									onChange={(e: any) => setEmployeeSurname(e.target.value)}
								/>
								<Form.Label>Table</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter table"
									value={employeeSurname}
									onChange={(e: any) => setEmployeeSurname(e.target.value)}
								/>
								<Form.Label>Table</Form.Label>
								<Form.Select value={table} onChange={(e: any) => setTable(e.target.value)}>
									<option>Tables</option>
									{tables.map((item: any) => {
										return (
											<option key={item._id} value={item.name}>
												{item.name}
											</option>
										);
									})}
								</Form.Select>

								<Form.Label>Date*</Form.Label>
								<Form.Control
									type="date"
									placeholder="Enter date*"
									value={employeeSurname}
									onChange={(e: any) => setEmployeeSurname(e.target.value)}
								/>
								<Form.Label>Price*</Form.Label>
								<Form.Control
									type="number"
									placeholder="Enter price*"
									value={employeeSurname}
									onChange={(e: any) => setEmployeeSurname(e.target.value)}
								/>
								<Form.Label>Add Position</Form.Label>
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
									Add Position
								</Button>
								<h3>Positions</h3>
								<div style={{ border: '1px solid black' }}>
									<p>{JSON.stringify(positions)}</p>
								</div>
							</Form.Group>

							<Button type="submit" variant="success">
								Submit
							</Button>
							<Link to="/Orders/List" className="btn btn-danger ml-2">
								Cancel
							</Link>
						</Form>
					</div>
				</Col>

				<Col sm={2} />
			</Row>
		</div>
	);
};
