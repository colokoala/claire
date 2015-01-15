'use strict';

// Groups controller
angular.module('groups').filter('formatText', function () {
	return function (text) {
		if (text !== undefined) return text.replace(/\n/g, '<br />');
	};
}).controller('GroupsController', ['$scope', '$stateParams', '$location', 'Authentication',
	'Groups', 'Orders', 'GroupComments', '$modal',
	function($scope, $stateParams, $location, Authentication, Groups, Orders, GroupComments, $modal) {
		$scope.authentication = Authentication;

		// Create new Group
		$scope.create = function() {
			// Create new Group object
			var group = new Groups ({
				name: this.name,
				desc: this.desc,
				price: this.price,
				unit: this.unit,
				targetQty: this.targetQty,
				minQty: this.minQty,
				expiration: this.expiration,
				address: this.address,
				imgUrl: this.imgUrl,
				orders: this.orders
			});

			// Redirect after save
			group.$save(function(response) {
				$location.path('groups/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.desc = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Group
		$scope.remove = function(group) {
			if ( group ) { 
				group.$remove();

				for (var i in $scope.groups) {
					if ($scope.groups [i] === group) {
						$scope.groups.splice(i, 1);
					}
				}
			} else {
				$scope.group.$remove(function() {
					$location.path('groups');
				});
			}
		};

		// Update existing Group
		$scope.update = function() {
			var group = $scope.group;

			group.$update(function() {
				$location.path('groups/' + group._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Groups
		$scope.find = function() {
			$scope.groups = Groups.query();
		};

		// Find existing Group
		$scope.findOne = function() {
			$scope.group = Groups.get({ 
				groupId: $stateParams.groupId
			});
		};

		$scope.showBuyDialog = function() {
			var modalInstance = $modal.open({
				templateUrl: 'modules/groups/views/order-dialog.client.view.html',
				controller: function ($scope, $modalInstance) {
					$scope.ok = function () {
						$modalInstance.close();
					};

					$scope.cancel = function () {
						$modalInstance.dismiss('cancel');
					};
				},
				resolve: {
					qty: function() {
						return $scope.orderQty;
					}
				}
			});

			modalInstance.result.then(function () {
				$scope.placeOrder();
			});
		};

		// Place an order to the group
		$scope.placeOrder = function() {

			var o = {
				groupId: this.group._id,
				qty: this.orderQty,
				userDisplayName: this.authentication.user.displayName,
				user: this.authentication.user
			};
			var i = 0;
			for (; i < this.group.orders.length; i++) {
				if (this.group.orders[i].user == this.authentication.user._id) {
					this.group.orders[i].qty = o.qty;
					o = this.group.orders[i];
					o.groupId = this.group._id;
					Orders.update(o);
					return;
				}
			}
			if (i === this.group.orders.length) {
				this.group.orders.push(o);
			}

			Orders.save(o);
		};

		$scope.isMyOrder = function(order) {
			return order.user === this.authentication.user._id;
		};

		$scope.markPaid = function(order) {
			order.paymentStatus = 'Paid';
		};

		// Get the total order quantity
		$scope.getTotalOrderQty = function() {
			var qty = 0;
			for (var i = 0; i < $scope.group.orders.length; i++) {
				qty += $scope.group.orders[i].qty;
			}
			return qty;
		};

		// Submit a comment
		$scope.submitComment = function() {
			var comment = {
				userName: this.authentication.user.displayName,
				content: this.newComment,
				groupId: this.group._id,
				time: Date.now()
			};
			if (!this.group.comments) {
				this.group.comments = [];
			}
			this.group.comments.push(comment);
			GroupComments.save(comment);
			this.newComment = '';
		};

	}
]);

