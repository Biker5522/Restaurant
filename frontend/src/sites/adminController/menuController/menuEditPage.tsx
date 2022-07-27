import axios from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Row, Col, FormGroup, Form, Button } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../../css.css';
export const MenuEditPage = () => {
	let [ name, setName ] = useState('');
	const [ category, setCategory ] = useState('');
	const [ price, setPrice ] = useState('');
	const { id } = useParams();

	useEffect(() => {
		axios(`/Menu/${id}`).then((res: any) => {
			console.log(res);
			setName(res.data.name);
			setCategory(res.data.category);
			setPrice(res.data.price);
		});
	}, []);

	let navigate = useNavigate();
	const SubmitHandler = async (e: SyntheticEvent) => {
		e.preventDefault();

		//Api connect POST User
		await axios.put(`/Menu/${id}`, {
			name: name,
			category: category,
			price: price
		});
		navigate('/Menu/List');
	};
	return (
		<div className="">
			<Row>
				<Col sm={2} />

				<Col sm={8} className="CardMain">
					<div className="Card">
						<Form onSubmit={SubmitHandler}>
							<h2>Edit Product</h2>
							<Form.Group>
								<Form.Label>Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter name"
									value={name}
									onChange={(e: any) => setName(e.target.value)}
								/>
								<Form.Label>Category</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter category"
									value={category}
									onChange={(e: any) => setCategory(e.target.value)}
								/>
								<Form.Label>Price</Form.Label>
								<Form.Control
									type="number"
									placeholder="Enter Price"
									value={price}
									onChange={(e: any) => setPrice(e.target.value)}
								/>
							</Form.Group>
							<Button type="submit" variant="success">
								Submit
							</Button>
							<Link to="/Menu/List" className="btn btn-danger ml-2">
								Cancel
							</Link>
						</Form>
					</div>
				</Col>

				<Col sm={2} />
			</Row>
		</div>
	);
};
