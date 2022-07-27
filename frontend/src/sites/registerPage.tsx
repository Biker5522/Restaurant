import React, { useState, useRef, SyntheticEvent } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import '../stylesheets/login.css';
import axios from 'axios';
import { resolve } from 'node:path/win32';
import { Dish } from '../interfaces';
import { Link, useNavigate } from 'react-router-dom';
import { LoginPage } from '../sites/loginPage';

export const RegisterPage = () => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ errorMsg, setErrorMsg ] = useState('');

	let navigate = useNavigate();
	const SubmitHandler = async (e: SyntheticEvent) => {
		e.preventDefault();
		//Api connect POST User
		await axios
			.post('/register', {
				email: email,
				password: password
			})
			.then(() => {
				navigate('/Login');
			})
			.catch((error) => {
				if (error.response) {
					setErrorMsg(error.response.data);
				}
			});
	};

	return (
		<div>
			<Row className="m-0 p-0">
				<Col sm={2} />
				<Col sm={8}>
					<div>
						{/* Email Form */}
						<div className="LoginCard">
							<h2>Register</h2>
							<h5 className="alert-danger">{errorMsg}</h5>
							<Form onSubmit={SubmitHandler}>
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Label>Adres Email</Form.Label>
									<Form.Control
										type="email"
										placeholder="Wpisz email"
										value={email}
										onChange={(e: any) => setEmail(e.target.value)}
									/>
								</Form.Group>

								{/* Password */}
								<Form.Group className="mb-3" controlId="formBasicPassword">
									<Form.Label>Hasło</Form.Label>
									<Form.Control
										type="password"
										placeholder="Hasło"
										value={password}
										onChange={(e: any) => setPassword(e.target.value)}
									/>
								</Form.Group>
								<Link to="/Login">Already have an account?</Link>
								{/* Button */}
								<div className="ButtonsContainer">
									<Button
										className="Button"
										variant="primary"
										type="submit"
										style={{ margin: '0.5rem auto ' }}
									>
										Zarejestruj
									</Button>
								</div>
							</Form>
						</div>
					</div>
				</Col>
				<Col sm={2} />
			</Row>
		</div>
	);
};
