import { Express, Router } from 'express';
const express = require('express');
const router = require('express').Router();
const User = require('../../Models/UserModel');
const jwt = require('jsonwebtoken');

//POST dodanie użytkownika
router.post('/register', async (req: any, res: any) => {
	//Dodanie
	const user = new User({
		email: req.body.email,
		password: req.body.password,
		role: req.body.role
	});
	//Walidacja
	const emailExist = await User.findOne({ email: req.body.email });
	if (emailExist) return res.status(400).send('Email exist');
	//zapis
	try {
		const savedUser = await user.save();
		res.send(savedUser);
	} catch (err) {
		res.status(400).send(err);
	}
});

//POST LOGIN
router.post('/login', async (req: any, res: any) => {
	//email validation
	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('Invalid email');
	//password validation
	const passVal = await (user.password == req.body.password);
	if (!passVal) return res.status(400).send('Invalid password');
	//create token and returnc cookie
	const token = jwt.sign({ _id: user._id, _role: user.role }, process.env.TOKEN_SECRET);
	console.log(token);
	res.cookie('token', token).send(token);
});

module.exports = router;
