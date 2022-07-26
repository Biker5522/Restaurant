import mongoose from 'mongoose';
const OrderSchema = new mongoose.Schema({
	table: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Table',
		required: false
	},
	employee: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Employee',
		required: false
	},
	status: {
		type: String,
		enum: [ 'submitted', 'processing', 'completed' ],
		default: 'submitted'
	},
	price: {
		type: Number,
		default: 0
	},
	isOnline: {
		type: Boolean,
		default: false
	},
	positions: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Dish'
		}
	],
	date: {
		type: Date,
		default: Date.now()
	},
	email: {
		type: String,
		required: false
	},
	street: {
		type: String,
		required: false
	},
	flatNumber: {
		type: String,
		required: false
	},
	phone: {
		type: Number,
		required: false
	}
});

module.exports = mongoose.model('Order', OrderSchema);
