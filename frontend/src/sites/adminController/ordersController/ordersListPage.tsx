import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Stack, ListGroupItem, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { OrdersHeaderComponent } from './ordersHeaderComponent';
import '../../../css.css';
import '../../../stylesheets/adminPanels.css';
import axios from 'axios';
import { Console } from 'console';

export const OrdersListPage = () => {
	const [ backendData, setBackendData ] = useState<any>([]);
	//Get Orders
	useEffect(() => {
		axios('/Orders').then((res) => {
			setBackendData(res.data);
		});
	}, []);

	//Delete Order
	const removeOrder = (_id: any) => {
		let id: String = _id;
		axios
			.delete(`/Orders/${_id}`)
			.then(function(response) {
				window.location.reload();
			})
			.catch(function(error) {
				console.log(error);
			});
	};

	return (
		<div className="">
			<Row>
				<Col sm={2} />

				<Col sm={8} className="MainRow">
					<div className="col-md-5 Panel">
						<div className="MenuCrudMain">
							<OrdersHeaderComponent />
							<ListGroup>
								{backendData.map((order: any) => (
									<ListGroupItem className="d-grid">
										<p>
											<strong>Id: </strong>
											{order._id}
										</p>
										<p>
											<strong>Status: </strong>
											{order.status}
										</p>

										<h4>Positions:</h4>
										{order.positions.map((position: any) => <p>{position.name} &nbsp;</p>)}
										<p>
											<strong>Date:</strong> {order.date}
											&nbsp;
										</p>
										<div>
											<Link className="btn btn-warning ml-10 " to={`../Order/Edit/${order._id}`}>
												Edit
											</Link>
											<Button
												className="btn btn-warning ml-10 "
												onClick={() => removeOrder(order._id)}
												variant="danger"
											>
												Delete
											</Button>
										</div>
									</ListGroupItem>
								))}
							</ListGroup>
						</div>
					</div>
				</Col>
				<Col sm={2} />
			</Row>
		</div>
	);
};
