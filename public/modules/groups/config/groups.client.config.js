'use strict';

// Configuring the Articles module
angular.module('groups').run(['Menus',
	function(Menus) {
		// Set top bar menu items menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position
		Menus.addMenuItem('topbar', 'Groups', 'groups', 'item');
		Menus.addMenuItem('topbar', 'New Group', 'groups/create', 'item');
	}
]);
