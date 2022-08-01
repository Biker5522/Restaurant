import axios from 'axios';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../../css.css';

export const OrdersEditPage = () => {
	let [ employeeName, setEmployeeName ] = useState('');
	const [ employeeSurname, setEmployeeSurname ] = useState('');
	const { id } = useParams();

	useEffect(() => {
		axios(`/Employees/${id}`).then((res: any) => {
			console.log(res);
			setEmployeeName(res.data.employee.name);
			setEmployeeSurname(res.data.employee.surname);
		});
	}, []);

	let navigate = useNavigate();
	const SubmitHandler = async (e: SyntheticEvent) => {
		e.preventDefault();

		//Modify User
		await axios.put(`/Orders/${id}`, {
			employeeName: employeeName,
			employeeSurname: employeeSurname
		});
		navigate('/Orders/List');
	};
	return (
		<div className="">
			<Row>
				<Col sm={2} />

				<Col sm={8} className="MainRow">
					<Form onSubmit={SubmitHandler}>
						<Form.Group>
							<Form.Label>Edit Employee</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter name"
								value={employeeName}
								onChange={(e: any) => setEmployeeName(e.target.value)}
							/>
							<Form.Control
								type="text"
								placeholder="Enter surname"
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
