import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Stack, ListGroupItem, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../../css.css';
import '../../../stylesheets/adminPanels.css';
import axios from 'axios';
import { Console } from 'console';

export const WaitersOrdersPage = () => {
	const [ backendData, setBackendData ] = useState<any>([]);
	//Get Reports from Menu
	useEffect(() => {
		axios('/Reports/WaitersOrders').then((res) => {
			setBackendData(res.data);
			console.log(res.data);
		});
	}, []);

	return (
		<div className="">
			<Row>
				<Col sm={2} />
				<Col sm={8} className="MainRow">
					<div className="col-md-5 Panel">
						<div className="MenuCrudMain">
							<ListGroup>
								{backendData.map((report: any) => (
									<ListGroupItem className="d-flex">
										<p>{report.name} &nbsp;</p>
										<p>{report.surname} &nbsp; </p>
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
