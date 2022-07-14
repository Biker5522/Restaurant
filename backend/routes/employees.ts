import { Express, Router, Response, Request } from 'express';
import { appendFile } from 'fs';
const express = require('express');
const router = express.Router();
const Employee = require('../Models/EmployeeModel');
const verify = require('../routes/users/authToken');

//GET List of Employees
router.get('/', async (req: Request, res: Response) => {
	try {
		const pracownicy = await Employee.find();
		return res.status(200).json(pracownicy);
	} catch (err) {
		const result = (err as Error).message;
		return res.status(400).json({ result });
	}
});

//POST Add Employee
router.post('/', async (req: Request, res: Response) => {
	const employee = new Employee({
		name: req.body.name,
		surname: req.body.surname,
		position: req.body.position
	});
	//save
	try {
		const savedEmployee = await employee.save();
		return res.status(200).json(savedEmployee);
	} catch (err) {
		const result = (err as Error).message;
		return res.status(400).json({ result });
	}
});

//GET get particular employee
router.get('/:id', async (req: Request, res: Response) => {
	try {
		const pracownik = await Employee.findById(req.params.id);
		return res.status(200).json(pracownik);
	} catch (err) {
		const result = (err as Error).message;
		return res.status(400).json({ result });
	}
});

//Delete employee
router.delete('/:id', async (req: Request, res: Response) => {
	try {
		const removedEmployee = await Employee.deleteOne({ _id: req.params.id });
		return res.status(200).json('Deleted');
	} catch (err) {
		const result = (err as Error).message;
		return res.status(400).json({ result });
	}
});

//PUT modify employee
router.put('/:id', async (req: Request, res: Response) => {
	try {
		const updatedEmployee = await Employee.findByIdAndUpdate(
			{ _id: req.params.id },
			{
				name: req.body.name,
				surname: req.body.surname,
				position: req.body.position
			}
		);
		return res.status(200).json('Updated');
	} catch (err) {
		const result = (err as Error).message;
		return res.status(400).json({ result });
	}
});

module.exports = router;
