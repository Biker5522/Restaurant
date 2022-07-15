import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import { Row, Col, FormGroup, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../../../css.css';
export const OrdersReportPage = () => {
	const [ start, setStart ] = useState('');
	const [ end, setEnd ] = useState('');
	const [ price, setPrice ] = useState('');

	let navigate = useNavigate();
	const SubmitHandler = async (e: SyntheticEvent) => {
		e.preventDefault();
		//Api connect POST User
		await axios.post(`/Reports/Orders:${start}/:${end}`).then((res) => {
			setPrice(res.data);
			console.log(res.data);
		});
	};
	return (
		<div className="">
			<Row>
				<Col sm={2} />

				<Col sm={8} className="MainRow">
					<Form onSubmit={SubmitHandler}>
						<Form.Group>
							<Form.Label>Summary of income in set of time </Form.Label>
							<Form.Control
								type="date"
								placeholder="Enter start date"
								value={start}
								onChange={(e: any) => setStart(e.target.value)}
							/>
							<Form.Control
								type="date"
								placeholder="Enter end date"
								value={end}
								onChange={(e: any) => setEnd(e.target.value)}
							/>
						</Form.Group>
						<Button type="submit" variant="success">
							Submit
						</Button>
						<Link to="/Menu/List" className="btn btn-danger ml-2">
							Cancel
						</Link>
					</Form>
				</Col>

				<Col sm={2} />
			</Row>
		</div>
	);
};
