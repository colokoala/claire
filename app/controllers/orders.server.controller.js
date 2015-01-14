'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Order = mongoose.model('Order'),
	_ = require('lodash');

/**
 * Create a Order
 */
exports.create = function(req, res) {
	var group = req.group;

	var order = new Order({
		qty: req.body.qty,
		user: req.body.user._id,
		userDisplayName: req.body.user.displayName
	});

	order.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
	});

	group.orders.addToSet(order._id);
	group.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(order);
		}
	});
};

/**
 * Show the current order
 */
exports.read = function(req, res) {
	res.jsonp(req.order);
};

/**
 * Update a order
 */
exports.update = function(req, res) {
	var order = req.order ;

	order = _.extend(order , req.body);

	order.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(order);
		}
	});
};

/**
 * Update a order
 */
exports.order = function(req, res) {
	var order = req.order ;

	order = _.extend(order , req.body);

	order.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(order);
		}
	});
};

/**
 * Delete an order
 */
exports.delete = function(req, res) {
	var order = req.order ;

	order.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(order);
		}
	});
};

/**
 * List of orders
 */
exports.list = function(req, res) { 
	//order.find().sort('-created').populate('user', 'displayName').exec(function(err, orders) {
	//	if (err) {
	//		return res.status(400).send({
	//			message: errorHandler.getErrorMessage(err)
	//		});
	//	} else {
	//		res.jsonp(orders);
	//	}
	//});
};

/**
 * order middleware
 */
exports.orderByID = function(req, res, next, id) { 
	//order.findById(id).populate('user', 'displayName').exec(function(err, order) {
	//	if (err) return next(err);
	//	if (! order) return next(new Error('Failed to load order ' + id));
	//	req.order = order ;
	//	next();
	//});
};

/**
 * order authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.order.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
