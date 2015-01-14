'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var OrderSchema = new Schema ({
	qty: {
		type: Number,
		required: 'Please provide quantity.'
	},
	paymentStatus: {
		type: String,
		default: 'Not Paid'
	},
	userDisplayName: {
		type: String
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});


mongoose.model('Order', OrderSchema);
