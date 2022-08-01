import { Response, Request } from 'express';

const express = require('express');
const router = express.Router();
const Order = require('../Models/OrderModel');
const Table = require('../Models/TableModel');
const Employee = require('../Models/EmployeeModel');
const Dish = require('../Models/DishModel');
const verify = require('../routes/users/authToken');

//GET all orders
router.get('/', async (req: Request, res: Response) => {
	try {
		const orders = await Order.find().populate('employee').populate('table').populate('positions');
		return res.status(200).json(orders);
	} catch (err) {
		const result = (err as Error).message;
		return res.status(200).json({ result });
	}
});

//POST order
router.post('/', async (req: Request, res: Response) => {
	//employee
	let employee: any = await Employee.findOne(
		{ name: req.body.employeeName } && { surnname: req.body.employeeSurname }
	);
	//table
	let table: any = await Table.findOne({ name: req.body.table });

	//positions
	let positionsChecked: any[] = [];
	for (const element of req.body.positions) {
		let DishExist: any = await Dish.findOne({ name: element });
		if (!DishExist) return res.status(400).json('No such Dish');
		let returnDish = DishExist;

		positionsChecked.push(returnDish._id);
	}

	const order = new Order({
		table: table,
		employee: employee._id,
		status: req.body.status,
		price: req.body.price,
		positions: positionsChecked,
		date: req.body.date
	});

	//Validation of
	//table
	//const tableExist = await Table.findById(req.body.table);
	//if (!tableExist) return res.status(400).json('No such table');
	//employee
	//const employeeExist = await Employee.findById(req.body.employee);
	//if (!employeeExist) return res.status(400).json('No such employee');
	//dishes
	//for (const element of order.positions) {
	//	const DishExist = await Dish.findById(element);
	//if (!DishExist) return res.status(400).json('No such Dish');
	//}

	//Calculate Price
	if (order.price == 0) {
		for (const element of order.positions) {
			const DishExisting = await Dish.findById(element);
			order.price = order.price + DishExisting.price;
		}
	}
	//Save an order
	try {
		const savedOrder = await order.save();
		return res.status(200).json(savedOrder);
	} catch (err) {
		const result = (err as Error).message;
		return res.status(400).json({ result });
	}
});

//POST order online
router.post('/Online', async (req: Request, res: Response) => {
	//Validation of
	//dishes
	let positionsChecked: any[] = [];
	for (const element of req.body.positions) {
		let DishExist: any = await Dish.findOne({ name: element });
		if (!DishExist) return res.status(400).json('No such Dish');
		let returnDish = DishExist;

		positionsChecked.push(returnDish._id);
	}
	const order = new Order({
		positions: positionsChecked,
		date: req.body.date,
		phone: req.body.phone,
		email: req.body.email,
		street: req.body.street,
		flatNumber: req.body.flatNumber
	});
	order.isOnline = true;

	//calculate price
	if (order.price == null || order.price == 0) {
		order.price = 0;
		for (const element of order.positions) {
			const DishExisting = await Dish.findById(element);
			order.price = order.price + DishExisting.price;
		}
	}
	//Save an order
	try {
		const savedOrder = await order.save();
		return res.status(200).json(savedOrder);
	} catch (err) {
		const result = (err as Error).message;
		return res.status(400).json({ result });
	}
});
//GET specific Order
router.get('/:id', async (req: Request, res: Response) => {
	try {
		const order = await Order.findById(req.params.id);
		return res.status(200).json(order);
	} catch (err) {
		const result = (err as Error).message;
		return res.status(400).json({ result });
	}
});

//Delete Order
router.delete('/:id', async (req: Request, res: Response) => {
	try {
		const removedBooking = await Order.deleteOne({ _id: req.params.id });
		return res.status(200).json('Deleted');
	} catch (err) {
		const result = (err as Error).message;
		return res.status(400).json({ result });
	}
});

//PUT Modify Order
router.patch('/:id', async (req: Request, res: Response) => {
	try {
		const updatedOrder = await Order.findByIdAndUpdate(
			{ _id: req.params.id },
			{
				table: req.body.table,
				employee: req.body.employee,
				price: req.body.price,
				positions: req.body.positions,
				date: req.body.date,
				status: req.body.status
			}
		);
		return res.status(200).json('Updated');
	} catch (err) {
		const result = (err as Error).message;
		return res.status(400).json({ result });
	}
});

module.exports = router;
