import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import { Row, Col, FormGroup, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../../../css.css';
import'../../../stylesheets/adminController.css';
export const MenuAddPage = () => {
	const [ name, setName ] = useState('');
	const [ category, setCategory ] = useState('');
	const [ price, setPrice ] = useState('');

	let navigate = useNavigate();
	const SubmitHandler = async (e: SyntheticEvent) => {
		e.preventDefault();
		//Api connect POST User
		await axios.post('/Menu', {
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
				<Col sm={8} className="MainRow">
					<div className="Card">
						<h2>Add Position</h2>
					<Form onSubmit={SubmitHandler}>
						<Form.Group>
							<Form.Label>Product</Form.Label>
							<label>Name</label>
							<Form.Control
								type="text"
								placeholder="Enter name"
								value={name}
								onChange={(e: any) => setName(e.target.value)}
							/>
							<label>Category</label>
							<Form.Control
								type="text"
								placeholder="Enter category"
								value={category}
								onChange={(e: any) => setCategory(e.target.value)}
							/>
							<label>Price</label>
							<Form.Control
								type="number"
								placeholder="Enter Price"
								value={price}
								onChange={(e: any) => setPrice(e.target.value)}
							/>
						</Form.Group>
						<div className='pt-3'>
						<Button type="submit" variant="success">
							Submit
						</Button>
						<Link to="/Menu/List" className="btn btn-danger ml-2">
							Cancel
						</Link>
						</div>
					</Form>
					</div>
				</Col>

				<Col sm={2} />
			</Row>
		</div>
	);
};
