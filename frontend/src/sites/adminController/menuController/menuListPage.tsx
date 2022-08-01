import { useEffect, useState } from 'react';
import { Row, Col, Button, ListGroupItem, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MenuHeaderComponent } from './menuHeaderComponent';
import '../../../css.css';
import '../../../stylesheets/adminController.css';
import axios from 'axios';

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
						<div className="MenuCrudMain ">
							<MenuHeaderComponent />
							<ListGroup>
								{backendData.map((dish: any) => (
									<ListGroupItem>
										<div className="d-grid">
											<p>
												{dish.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
												<strong>{dish.category}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </strong>
												{dish.price}$
											</p>
											<div className="listButtons">
												<Link
													className="btn btn-warning  mr-1 "
													to={`../Menu/Edit/${dish._id}`}
												>
													Edit
												</Link>
												<Button
													className="btn btn-warning  mr-1 "
													onClick={() => removeDish(dish._id)}
													variant="danger"
												>
													Delete
												</Button>
											</div>
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
