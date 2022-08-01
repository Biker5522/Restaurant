import React, { useState, SyntheticEvent } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import '../stylesheets/login.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export const LoginPage = () => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	let [ errorMsg, setError ] = useState('');
	const [ cookies, setCookie ] = useCookies([ 'token', 'refresh_token' ]);
	let navigate = useNavigate();
	const SubmitHandler = async (e: SyntheticEvent) => {
		e.preventDefault();
		//Api connect POST User
		await axios
			.post(
				'/login',
				{
					email,
					password
				},
				{ withCredentials: true }
			)
			//Set Cookie
			.then((res) => {
				setCookie('token', res.data);
				console.log(res.data);
				navigate('/');
			})
			.catch((error) => {
				if (error.response) {
					setError(error.response.data);
				}
			});
	};
	return (
		<div>
			<Row className="m-0 p-0">
				<Col sm={2} />
				<Col sm={8}>
					<div className="d-flex justify-content-center align-items-center">
						<div className="LoginCard">
							<h2>Login</h2>
							<h5 className="alert-danger">{errorMsg}</h5>
							<Form onSubmit={SubmitHandler}>
								{/* Email Form */}
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Label>Adres Email</Form.Label>
									<Form.Control
										type="email"
										placeholder="Wpisz email"
										value={email}
										onChange={(e: any) => setEmail(e.target.value)}
									/>
								</Form.Group>
								{/* Password Form */}
								<Form.Group className="mb-3" controlId="formBasicPassword">
									<Form.Label>Hasło</Form.Label>
									<Form.Control
										type="password"
										placeholder="Hasło"
										value={password}
										onChange={(e: any) => setPassword(e.target.value)}
									/>
								</Form.Group>
								<Link to="/Register">You don't have an account? </Link>
								<div className="ButtonsContainer">
									{/* Button */}
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
						<div className="LoginCard">
							<h2>Login to admin</h2>
							<p className="mt-5">Login: dawid@gmail.com</p>
							<p>Password: qwerty</p>
						</div>
					</div>
				</Col>
				<Col sm={2} />
			</Row>
		</div>
	);
};
