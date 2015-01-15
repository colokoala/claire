'use strict';

//Groups service used to communicate Groups REST endpoints
angular.module('groups')
	.factory('Groups', ['$resource',
		function($resource) {
			return $resource(
				'groups/:groupId',
				{
					groupId: '@_id'
				},
				{
				update: {
					method: 'PUT'
					}
				}
			);
		}
	])
	.factory('Orders', ['$resource',
		function($resource) {
			return $resource(
				'groups/:groupId/order/:orderId',
				{
					groupId: '@groupId',
					orderId: '@_id'
				},
				{
					update: {
						method: 'PUT'
					}
				}
			);
		}
	])
	.factory('GroupComments', ['$resource',
		function($resource) {
			return $resource(
				'groups/:groupId/comment',
				{
					groupId: '@groupId'
				}
			);
		}
	]);
