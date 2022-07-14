import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import { Row, Col, FormGroup, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../../../css.css';

export const EmployeesAddPage = () => {
	const [ name, setName ] = useState('');
	const [ surname, setSurname ] = useState('');
	const [ position, setPosition ] = useState('');

	let navigate = useNavigate();
	const SubmitHandler = async (e: SyntheticEvent) => {
		e.preventDefault();
		//Api connect POST User
		await axios.post('/Employees', {
			name: name,
			surname: surname,
			position: position
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
							<Form.Label>New Employee</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter name"
								value={name}
								onChange={(e: any) => setName(e.target.value)}
							/>
							<Form.Control
								type="text"
								placeholder="Enter surname"
								value={surname}
								onChange={(e: any) => setSurname(e.target.value)}
							/>
							<Form.Control
								type="text"
								placeholder="Enter Position"
								value={position}
								onChange={(e: any) => setPosition(e.target.value)}
							/>
						</Form.Group>
						<Button type="submit" variant="success">
							Submit
						</Button>
						<Link to="/Employees/List" className="btn btn-danger ml-2">
							Cancel
						</Link>
					</Form>
				</Col>

				<Col sm={2} />
			</Row>
		</div>
	);
};
