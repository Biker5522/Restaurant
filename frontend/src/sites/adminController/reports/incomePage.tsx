import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import { Row, Col, FormGroup, Form, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../../../css.css';
export const IncomePage = () => {
	const [ start, setStart ] = useState('');
	const [ end, setEnd ] = useState('');
	const [ price, setPrice ] = useState('');
	const [ backendData, setBackendData ] = useState<any>([]);
	let navigate = useNavigate();
	const SubmitHandler = async (e: SyntheticEvent) => {
		e.preventDefault();
		//Api connect POST User
		await axios.get(`/Reports/Income/${start}/${end}`).then((res) => {
			console.log(res.data);
			setPrice(res.data);
		});

		await axios.get(`/Reports/Orders/${start}/${end}`).then((res) => {
			console.log(res.data);
			setBackendData(res.data);
		});
	};
	return (
		<div className="">
			<Row>
				<Col sm={2} />

				<Col sm={8} className="MainRow">
					<div className="Card">
						<h2>Orders in specific set of time</h2>
						<Form onSubmit={SubmitHandler}>
							<Form.Group>
								<Form.Label>Start Date </Form.Label>
								<Form.Control
									type="datetime-local"
									placeholder="Enter start date"
									value={start}
									onChange={(e: any) => setStart(e.target.value)}
								/>
								<Form.Label>End Date </Form.Label>
								<Form.Control
									type="datetime-local"
									placeholder="Enter end date"
									value={end}
									onChange={(e: any) => setEnd(e.target.value)}
								/>
							</Form.Group>
							<div style={{ margin: '1rem' }}>
								<Button type="submit" variant="success">
									Submit
								</Button>
								<Link to="/Menu/List" className="btn btn-danger ml-2">
									Cancel
								</Link>
							</div>
						</Form>
						<ListGroup>
							{backendData.map((order: any) => (
								<ListGroupItem className="d-flex">
									<p>{order.price}&nbsp; </p>
									{order.positions.map((positions: any) => <p>{positions.name} &nbsp;</p>)}
									<p>{order.date}</p>
								</ListGroupItem>
							))}
						</ListGroup>
						<div style={{ margin: '1rem' }}>
							<strong>price: {price}</strong>
						</div>
					</div>
				</Col>

				<Col sm={2} />
			</Row>
		</div>
	);
};
