import { Request, Response } from 'express';

const express = require('express');
const router = express.Router();
const Pracownik = require('../Models/PracownikModel');
const verify = require('../routes/users/authToken');

//GET employees
router.get('/', verify, async (req: Request, res: Response) => {
	try {
		const pracownicy = await Pracownik.find();
		return res.status(200).json(pracownicy);
	} catch (err) {
		const result = (err as Error).message;
		return res.status(400).json({ result });
	}
});

//POST dodanie pracownika
router.post('/', async (req: Request, res: Response) => {
	const pracownik = new Pracownik({
		imie: req.body.imie,
		nazwisko: req.body.nazwisko,
		stanowisko: req.body.stanowisko
	});
	//zapis
	try {
		const savedPracownik = await pracownik.save();
		return res.status(200).json(savedPracownik);
	} catch (err) {
		const result = (err as Error).message;
		return res.status(400).json({ result });
	}
});

//GET employee
router.get('/add', async (req: Request, res: Response) => {
	try {
		const pracownik = await Pracownik.findById(req.params.id);
		return res.status(200).json(pracownik);
	} catch (err) {
		const result = (err as Error).message;
		return res.status(400).json({ result });
	}
});

//Delete employee
router.delete('/:id', async (req: Request, res: Response) => {
	try {
		const removedPracownik = await Pracownik.deleteOne({ _id: req.params.id });
		return res.status(200).json('Usunieto');
	} catch (err) {
		const result = (err as Error).message;
		return res.status(400).json({ result });
	}
});

//PATCH employee
router.patch('/:id', async (req: Request, res: Response) => {
	try {
		const updatedPracownik = await Pracownik.updateOne(
			{ _id: req.params.id },
			{ Set: { imie: req.body.imie } },
			{ Set: { nazwisko: req.body.nazwisko } },
			{ Set: { stanowisko: req.body.stanowisko } }
		);
		return res.status(200).json(updatedPracownik);
	} catch (err) {
		const result = (err as Error).message;
		return res.status(400).json({ result });
	}
});

module.exports = router;
