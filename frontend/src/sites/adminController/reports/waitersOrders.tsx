import React, { useEffect, useState } from 'react';
import { Row, Col, ListGroupItem, ListGroup } from 'react-bootstrap';
import '../../../css.css';
import '../../../stylesheets/adminPanels.css';
import axios from 'axios';

export const WaitersOrdersPage = () => {
	const [ backendData, setBackendData ] = useState<any>([]);
	//Get Reports from Menu
	useEffect(() => {
		axios('/Reports/WaitersOrders').then((res) => {
			setBackendData(res.data);
			console.log(res.data);
		});
	}, []);

	//Get Employees
	const employees = backendData.map((backendData: any) => {
		return <p>{backendData.name}</p>;
	});
	const positions = employees.map((backendData: any) => {
		return <p>{backendData.name}</p>;
	});
	return (
		<div className="">
			<Row>
				<Col sm={2} />
				<Col sm={8} className="MainRow">
					<div className="col-md-5 Panel">
						<div className="MenuCrudMain">
							<ListGroup>
								{employees.map((report: any) => (
									<ListGroupItem className="d-flex">{report.name}</ListGroupItem>
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
