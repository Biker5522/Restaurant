import axios from 'axios';
import { SyntheticEvent, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../../../css.css';
import '../../../stylesheets/adminController.css';

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

				<Col sm={8} className="CardMain">
					<div className="Card">
						<h2>Add Employee</h2>
						<Form onSubmit={SubmitHandler}>
							<Form.Group>
								<Form.Label>Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter name"
									value={name}
									onChange={(e: any) => setName(e.target.value)}
								/>
								<Form.Label>Surname</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter surname"
									value={surname}
									onChange={(e: any) => setSurname(e.target.value)}
								/>
								<Form.Label>Position</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter Position"
									value={position}
									onChange={(e: any) => setPosition(e.target.value)}
								/>
							</Form.Group>
							<div className="mt-3">
								<Button type="submit" variant="success">
									Submit
								</Button>
								<Link to="/Employees/List" className="btn btn-danger ml-2">
									Cancel
								</Link>
							</div>
						</Form>
					</div>
				</Col>

				<Col sm={2} />
			</Row>
		</div>
	);
};
