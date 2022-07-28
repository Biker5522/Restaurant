import express, { response } from 'express';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import path from 'path';
let cookieParser = require('cookie-parser');
require('dotenv').config();

const bodyParser = require('body-parser');
const app = express();
app.set('json spaces', 2);
app.use(express.json());
app.use(cookieParser());

//Routes
//Restaurant
const routerRestaurant = require('../routes/restaurant');
app.use('/Restauracja', routerRestaurant);

//Employees
const routerEmployees = require('../routes/employees');
app.use('/Employees', routerEmployees);

//Users
const routerUsers = require('../routes/users/auth');
app.use('/', routerUsers);

//Menu
const routerDishes = require('../routes/dishes');
app.use('/Menu', routerDishes);

//Tables
const routerTables = require('../routes/tables');
app.use('/Tables', routerTables);

//Products
const routerProducts = require('../routes/products');
app.use('/Magazyn', routerProducts);

//Reservation
const routerBookings = require('../routes/bookings');
app.use('/Reservations', routerBookings);

//Orders
const routerOrders = require('../routes/orders');
app.use('/Orders', routerOrders);

//Reports
const routerReports = require('../routes/reports');
app.use('/Reports', routerReports);



//Deployment 

__dirname=path.resolve();
let production=true;

if(production==true){
	app.use(express.static(path.join(__dirname,"/frontend/build")))
	app.get('*',(req,res)=>{
		res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
	})
}
	else{
		app.use('/', (req, res) => {
			res.send("Restaurant World");
			
		  })

	}


//Database
mongoose.connect('mongodb+srv://dawid:cichy@rest.xarzi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', () =>
	console.log('Connected to Database')
);
app.listen(5000, () => console.log('Server Running'));
