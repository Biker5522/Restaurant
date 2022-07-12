import React, { useState, useRef, SyntheticEvent } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import '../stylesheets/login.css';
import axios from 'axios'
import { resolve } from 'node:path/win32';
import { Dish } from '../interfaces';
import { useNavigate } from 'react-router-dom';
import {LoginPage} from '../sites/loginPage'


export const RegisterPage = () => {
	const [ email, setEmail ] = useState('');
	const [ password, setPass ] = useState('');

	let navigate = useNavigate();
	const SubmitHandler = async (e: SyntheticEvent) => {
		e.preventDefault();
		//Api connect POST User
		await axios.post('/register', {
				email: email,
				password: password
		});
		navigate("/Login");
	};

	return (
		<div>
			<Row>
				<Col sm={2} />
				<Col sm={8}>
					<div>
						{/* Email Form */}
						<div className="LoginCard">
						<h2>Register</h2>
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
										onChange={(e: any) => setPass(e.target.value)}
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="formBasicCheckbox">
									<Form.Check type="checkbox" label="Zapamiętaj mnie" />
								</Form.Group>

								{/* Button */}
								<div className="ButtonsContainer">
									<Button
										className="Button"
										variant="primary"
										type="submit"
										style={{ margin: '0.5rem auto ' }}
									>
										Zaloguj
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
