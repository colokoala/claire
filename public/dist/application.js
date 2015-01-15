"use strict";var ApplicationConfiguration=function(){var applicationModuleName="mean",applicationModuleVendorDependencies=["ngResource","ngCookies","ngAnimate","ngTouch","ngSanitize","ui.router","ui.bootstrap","ui.utils"],registerModule=function(moduleName,dependencies){angular.module(moduleName,dependencies||[]),angular.module(applicationModuleName).requires.push(moduleName)};return{applicationModuleName:applicationModuleName,applicationModuleVendorDependencies:applicationModuleVendorDependencies,registerModule:registerModule}}();angular.module(ApplicationConfiguration.applicationModuleName,ApplicationConfiguration.applicationModuleVendorDependencies),angular.module(ApplicationConfiguration.applicationModuleName).config(["$locationProvider",function($locationProvider){$locationProvider.hashPrefix("!")}]),angular.element(document).ready(function(){"#_=_"===window.location.hash&&(window.location.hash="#!"),angular.bootstrap(document,[ApplicationConfiguration.applicationModuleName])}),ApplicationConfiguration.registerModule("articles"),ApplicationConfiguration.registerModule("core"),ApplicationConfiguration.registerModule("groups"),ApplicationConfiguration.registerModule("users"),angular.module("articles").run(["Menus",function(){}]),angular.module("articles").config(["$stateProvider",function($stateProvider){$stateProvider.state("listArticles",{url:"/articles",templateUrl:"modules/articles/views/list-articles.client.view.html"}).state("createArticle",{url:"/articles/create",templateUrl:"modules/articles/views/create-article.client.view.html"}).state("viewArticle",{url:"/articles/:articleId",templateUrl:"modules/articles/views/view-article.client.view.html"}).state("editArticle",{url:"/articles/:articleId/edit",templateUrl:"modules/articles/views/edit-article.client.view.html"})}]),angular.module("articles").controller("ArticlesController",["$scope","$stateParams","$location","Authentication","Articles",function($scope,$stateParams,$location,Authentication,Articles){$scope.authentication=Authentication,$scope.create=function(){var article=new Articles({title:this.title,content:this.content});article.$save(function(response){$location.path("articles/"+response._id),$scope.title="",$scope.content=""},function(errorResponse){$scope.error=errorResponse.data.message})},$scope.remove=function(article){if(article){article.$remove();for(var i in $scope.articles)$scope.articles[i]===article&&$scope.articles.splice(i,1)}else $scope.article.$remove(function(){$location.path("articles")})},$scope.update=function(){var article=$scope.article;article.$update(function(){$location.path("articles/"+article._id)},function(errorResponse){$scope.error=errorResponse.data.message})},$scope.find=function(){$scope.articles=Articles.query()},$scope.findOne=function(){$scope.article=Articles.get({articleId:$stateParams.articleId})}}]),angular.module("articles").factory("Articles",["$resource",function($resource){return $resource("articles/:articleId",{articleId:"@_id"},{update:{method:"PUT"}})}]),angular.module("core").config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){$urlRouterProvider.otherwise("/"),$stateProvider.state("home",{url:"/",templateUrl:"modules/groups/views/list-groups.client.view.html"})}]),angular.module("core").controller("HeaderController",["$scope","Authentication","Menus",function($scope,Authentication,Menus){$scope.authentication=Authentication,$scope.isCollapsed=!1,$scope.menu=Menus.getMenu("topbar"),$scope.toggleCollapsibleMenu=function(){$scope.isCollapsed=!$scope.isCollapsed},$scope.$on("$stateChangeSuccess",function(){$scope.isCollapsed=!1})}]),angular.module("core").controller("HomeController",["$scope","Authentication",function($scope,Authentication){$scope.authentication=Authentication}]),angular.module("core").service("Menus",[function(){this.defaultRoles=["*"],this.menus={};var shouldRender=function(user){if(!user)return this.isPublic;if(~this.roles.indexOf("*"))return!0;for(var userRoleIndex in user.roles)for(var roleIndex in this.roles)if(this.roles[roleIndex]===user.roles[userRoleIndex])return!0;return!1};this.validateMenuExistance=function(menuId){if(menuId&&menuId.length){if(this.menus[menuId])return!0;throw new Error("Menu does not exists")}throw new Error("MenuId was not provided")},this.getMenu=function(menuId){return this.validateMenuExistance(menuId),this.menus[menuId]},this.addMenu=function(menuId,isPublic,roles){return this.menus[menuId]={isPublic:isPublic||!1,roles:roles||this.defaultRoles,items:[],shouldRender:shouldRender},this.menus[menuId]},this.removeMenu=function(menuId){this.validateMenuExistance(menuId),delete this.menus[menuId]},this.addMenuItem=function(menuId,menuItemTitle,menuItemURL,menuItemType,menuItemUIRoute,isPublic,roles,position){return this.validateMenuExistance(menuId),this.menus[menuId].items.push({title:menuItemTitle,link:menuItemURL,menuItemType:menuItemType||"item",menuItemClass:menuItemType,uiRoute:menuItemUIRoute||"/"+menuItemURL,isPublic:null===isPublic||"undefined"==typeof isPublic?this.menus[menuId].isPublic:isPublic,roles:null===roles||"undefined"==typeof roles?this.menus[menuId].roles:roles,position:position||0,items:[],shouldRender:shouldRender}),this.menus[menuId]},this.addSubMenuItem=function(menuId,rootMenuItemURL,menuItemTitle,menuItemURL,menuItemUIRoute,isPublic,roles,position){this.validateMenuExistance(menuId);for(var itemIndex in this.menus[menuId].items)this.menus[menuId].items[itemIndex].link===rootMenuItemURL&&this.menus[menuId].items[itemIndex].items.push({title:menuItemTitle,link:menuItemURL,uiRoute:menuItemUIRoute||"/"+menuItemURL,isPublic:null===isPublic||"undefined"==typeof isPublic?this.menus[menuId].items[itemIndex].isPublic:isPublic,roles:null===roles||"undefined"==typeof roles?this.menus[menuId].items[itemIndex].roles:roles,position:position||0,shouldRender:shouldRender});return this.menus[menuId]},this.removeMenuItem=function(menuId,menuItemURL){this.validateMenuExistance(menuId);for(var itemIndex in this.menus[menuId].items)this.menus[menuId].items[itemIndex].link===menuItemURL&&this.menus[menuId].items.splice(itemIndex,1);return this.menus[menuId]},this.removeSubMenuItem=function(menuId,submenuItemURL){this.validateMenuExistance(menuId);for(var itemIndex in this.menus[menuId].items)for(var subitemIndex in this.menus[menuId].items[itemIndex].items)this.menus[menuId].items[itemIndex].items[subitemIndex].link===submenuItemURL&&this.menus[menuId].items[itemIndex].items.splice(subitemIndex,1);return this.menus[menuId]},this.addMenu("topbar")}]),angular.module("groups").run(["Menus",function(Menus){Menus.addMenuItem("topbar","Groups","groups","item"),Menus.addMenuItem("topbar","New Group","groups/create","item")}]),angular.module("groups").config(["$stateProvider",function($stateProvider){$stateProvider.state("listGroups",{url:"/groups",templateUrl:"modules/groups/views/list-groups.client.view.html"}).state("createGroup",{url:"/groups/create",templateUrl:"modules/groups/views/create-group.client.view.html"}).state("viewGroup",{url:"/groups/:groupId",templateUrl:"modules/groups/views/view-group.client.view.html"}).state("editGroup",{url:"/groups/:groupId/edit",templateUrl:"modules/groups/views/edit-group.client.view.html"})}]),angular.module("groups").filter("formatText",function(){return function(text){return void 0!==text?text.replace(/\n/g,"<br />"):void 0}}).controller("GroupsController",["$scope","$stateParams","$location","Authentication","Groups","Orders","GroupComments","$modal",function($scope,$stateParams,$location,Authentication,Groups,Orders,GroupComments,$modal){$scope.authentication=Authentication,$scope.create=function(){var group=new Groups({name:this.name,desc:this.desc,price:this.price,unit:this.unit,targetQty:this.targetQty,minQty:this.minQty,expiration:this.expiration,address:this.address,imgUrl:this.imgUrl,orders:this.orders});group.$save(function(response){$location.path("groups/"+response._id),$scope.name="",$scope.desc=""},function(errorResponse){$scope.error=errorResponse.data.message})},$scope.remove=function(group){if(group){group.$remove();for(var i in $scope.groups)$scope.groups[i]===group&&$scope.groups.splice(i,1)}else $scope.group.$remove(function(){$location.path("groups")})},$scope.update=function(){var group=$scope.group;group.$update(function(){$location.path("groups/"+group._id)},function(errorResponse){$scope.error=errorResponse.data.message})},$scope.find=function(){$scope.groups=Groups.query()},$scope.findOne=function(){$scope.group=Groups.get({groupId:$stateParams.groupId})},$scope.showBuyDialog=function(){var modalInstance=$modal.open({templateUrl:"modules/groups/views/order-dialog.client.view.html",controller:["$scope","$modalInstance",function($scope,$modalInstance){$scope.ok=function(){$modalInstance.close()},$scope.cancel=function(){$modalInstance.dismiss("cancel")}}],resolve:{qty:function(){return $scope.orderQty}}});modalInstance.result.then(function(){$scope.placeOrder()})},$scope.placeOrder=function(){for(var order=new Orders({groupId:this.group._id,qty:this.orderQty,userDisplayName:this.authentication.user.displayName,user:this.authentication.user}),o={groupId:this.group._id,qty:this.orderQty,userDisplayName:this.authentication.user.displayName,user:this.authentication.user},i=0;i<this.group.orders.length;i++)this.group.orders[i].user._id===this.authentication.user._id&&(this.group.orders[i]=o);i===this.group.orders.length&&this.group.orders.push(o),order.$save()},$scope.isMyOrder=function(order){return order.user===this.authentication.user._id},$scope.markPaid=function(order){order.paymentStatus="Paid"},$scope.getTotalOrderQty=function(){for(var qty=0,i=0;i<$scope.group.orders.length;i++)qty+=$scope.group.orders[i].qty;return qty},$scope.submitComment=function(){var comment={userName:this.authentication.user.displayName,content:this.newComment,groupId:this.group._id,time:Date.now()};this.group.comments||(this.group.comments=[]),this.group.comments.push(comment),GroupComments.save(comment)}}]),angular.module("groups").factory("Groups",["$resource",function($resource){return $resource("groups/:groupId",{groupId:"@_id"},{update:{method:"PUT"}})}]).factory("Orders",["$resource",function($resource){return $resource("groups/:groupId/order",{groupId:"@groupId"})}]).factory("GroupComments",["$resource",function($resource){return $resource("groups/:groupId/comment",{groupId:"@groupId"})}]),angular.module("users").config(["$httpProvider",function($httpProvider){$httpProvider.interceptors.push(["$q","$location","Authentication",function($q,$location,Authentication){return{responseError:function(rejection){switch(rejection.status){case 401:Authentication.user=null,$location.path("signin");break;case 403:}return $q.reject(rejection)}}}])}]),angular.module("users").config(["$stateProvider",function($stateProvider){$stateProvider.state("profile",{url:"/settings/profile",templateUrl:"modules/users/views/settings/edit-profile.client.view.html"}).state("password",{url:"/settings/password",templateUrl:"modules/users/views/settings/change-password.client.view.html"}).state("accounts",{url:"/settings/accounts",templateUrl:"modules/users/views/settings/social-accounts.client.view.html"}).state("signup",{url:"/signup",templateUrl:"modules/users/views/authentication/signup.client.view.html"}).state("signin",{url:"/signin",templateUrl:"modules/users/views/authentication/signin.client.view.html"}).state("forgot",{url:"/password/forgot",templateUrl:"modules/users/views/password/forgot-password.client.view.html"}).state("reset-invalid",{url:"/password/reset/invalid",templateUrl:"modules/users/views/password/reset-password-invalid.client.view.html"}).state("reset-success",{url:"/password/reset/success",templateUrl:"modules/users/views/password/reset-password-success.client.view.html"}).state("reset",{url:"/password/reset/:token",templateUrl:"modules/users/views/password/reset-password.client.view.html"})}]),angular.module("users").controller("AuthenticationController",["$scope","$http","$location","Authentication",function($scope,$http,$location,Authentication){$scope.authentication=Authentication,$scope.authentication.user&&$location.path("/"),$scope.signup=function(){$http.post("/auth/signup",$scope.credentials).success(function(response){$scope.authentication.user=response,$location.path("/")}).error(function(response){$scope.error=response.message})},$scope.signin=function(){$http.post("/auth/signin",$scope.credentials).success(function(response){$scope.authentication.user=response,$location.path("/")}).error(function(response){$scope.error=response.message})}}]),angular.module("users").controller("PasswordController",["$scope","$stateParams","$http","$location","Authentication",function($scope,$stateParams,$http,$location,Authentication){$scope.authentication=Authentication,$scope.authentication.user&&$location.path("/"),$scope.askForPasswordReset=function(){$scope.success=$scope.error=null,$http.post("/auth/forgot",$scope.credentials).success(function(response){$scope.credentials=null,$scope.success=response.message}).error(function(response){$scope.credentials=null,$scope.error=response.message})},$scope.resetUserPassword=function(){$scope.success=$scope.error=null,$http.post("/auth/reset/"+$stateParams.token,$scope.passwordDetails).success(function(response){$scope.passwordDetails=null,Authentication.user=response,$location.path("/password/reset/success")}).error(function(response){$scope.error=response.message})}}]),angular.module("users").controller("SettingsController",["$scope","$http","$location","Users","Authentication",function($scope,$http,$location,Users,Authentication){$scope.user=Authentication.user,$scope.user||$location.path("/"),$scope.hasConnectedAdditionalSocialAccounts=function(){for(var i in $scope.user.additionalProvidersData)return!0;return!1},$scope.isConnectedSocialAccount=function(provider){return $scope.user.provider===provider||$scope.user.additionalProvidersData&&$scope.user.additionalProvidersData[provider]},$scope.removeUserSocialAccount=function(provider){$scope.success=$scope.error=null,$http.delete("/users/accounts",{params:{provider:provider}}).success(function(response){$scope.success=!0,$scope.user=Authentication.user=response}).error(function(response){$scope.error=response.message})},$scope.updateUserProfile=function(isValid){if(isValid){$scope.success=$scope.error=null;var user=new Users($scope.user);user.$update(function(response){$scope.success=!0,Authentication.user=response},function(response){$scope.error=response.data.message})}else $scope.submitted=!0},$scope.changeUserPassword=function(){$scope.success=$scope.error=null,$http.post("/users/password",$scope.passwordDetails).success(function(){$scope.success=!0,$scope.passwordDetails=null}).error(function(response){$scope.error=response.message})}}]),angular.module("users").factory("Authentication",[function(){var _this=this;return _this._data={user:window.user},_this._data}]),angular.module("users").factory("Users",["$resource",function($resource){return $resource("users",{},{update:{method:"PUT"}})}]);