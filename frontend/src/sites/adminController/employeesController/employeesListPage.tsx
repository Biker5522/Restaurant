import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Stack, ListGroupItem, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { EmployeesHeaderComponent } from './employeesHeaderComponent';
import '../../../css.css';
import '../../../stylesheets/adminPanels.css';
import axios from 'axios';
import { Console } from 'console';

export const EmployeesListPage = () => {
	const [ backendData, setBackendData ] = useState<any>([]);
	//Get Employees
	useEffect(() => {
		axios('/Employees').then((res) => {
			console.log(res);
			setBackendData(res.data);
		});
	}, []);

	//Delete Employee
	const removeEmployee = (_id: any) => {
		let id: String = _id;
		console.log(id);
		axios
			.delete(`/Employees/${_id}`)
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
							<EmployeesHeaderComponent />
							<ListGroup>
								{backendData.map((employee: any) => (
									<ListGroupItem className="d-grid">
										<p>
											{employee.name} &nbsp; {employee.surname} &nbsp;{employee.position} &nbsp;
										</p>
										<div>
											<Link
												className="btn btn-warning ml-10 "
												to={`../Employees/Edit/${employee._id}`}
											>
												Edit
											</Link>
											<Button
												className="btn btn-warning ml-10 "
												onClick={() => removeEmployee(employee._id)}
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
