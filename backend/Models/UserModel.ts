import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	role: {
		type: String,
		enum: [ 'admin', 'user' ],
		default: 'user'
	},
	email: {
		type: String,
		required: true,
		min: 5
	},
	password: {
		type: String,
		required: true,
		min: 3
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('User', UserSchema);
