'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Group Schema
 */
var GroupSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Group name.',
		trim: true
	},
	desc: {
		type: String,
		default: '',
		required: 'Please provide description for your group.',
		trim: false
	},
	price: {
		type: Number
	},
	unit: {
		type: String,
		default: 'unit'
	},
	imgUrl: {
		type: String,
		default: ''
	},
	targetQty: {
		type: Number,
		default: '',
		required: 'Please set your target quantity.'
	},
	minQty: {
		type: Number
	},
	expiration: {
		type: Date
	},
	address: {
		type: String
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	orders: [{
		type: Schema.ObjectId,
		ref: 'Order'
	}]
});


mongoose.model('Group', GroupSchema);
