'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var groups = require('../../app/controllers/groups.server.controller');
	var orders = require('../../app/controllers/orders.server.controller');

	// Groups Routes
	app.route('/groups')
		.get(groups.list)
		.post(users.requiresLogin, groups.create);

	app.route('/groups/:groupId')
		.get(groups.read)
		.put(users.requiresLogin, groups.hasAuthorization, groups.update)
		.delete(users.requiresLogin, groups.hasAuthorization, groups.delete);

	app.route('/groups/:groupId/comment')
		.post(users.requiresLogin, groups.addComment);

	app.route('/groups/:groupId/orders')
		.post(users.requiresLogin, orders.create);

	app.route('/groups/:groupId/orders/:orderId')
		.put(users.requiresLogin, orders.hasAuthorization, orders.update);

	// Finish by binding the Group middleware
	app.param('groupId', groups.groupByID);
	app.param('orderId', orders.orderByID);
};
