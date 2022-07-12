import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Stack, ListGroupItem, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MenuHeaderComponent } from './menuHeaderCompnent';
import '../../../css.css';
import '../../../stylesheets/adminPanels.css';
import axios from 'axios';
import { Console } from 'console';

export const MenuListPage = () => {
	const [ backendData, setBackendData ] = useState<any>([]);
	//Get Product from Menu
	useEffect(() => {
		axios('/Menu').then((res) => {
			setBackendData(res.data.dishes);
		});
	}, []);

	//Delete Product
	const removeDish = (_id: any) => {
		let id: String = _id;
		console.log(id);
		axios
			.delete(`/Menu/${_id}`)
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
						<MenuHeaderComponent />
						<div className="MenuCrudMain">
							<ListGroup>
								{backendData.map((dish: any) => (
									<ListGroupItem className="d-flex">
										<p>{dish.name} &nbsp;</p>
										<strong>{dish.category} &nbsp; </strong>
										<p>{dish.price} </p>
										<div>
											<Link className="btn btn-warning ml-10 " to={`../Menu/Edit/${dish._id}`}>
												Edit
											</Link>
											<Button
												className="btn btn-warning ml-10 "
												onClick={() => removeDish(dish._id)}
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
