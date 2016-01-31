// script.js

// create the module and name it scotchApp
	// also include ngRoute for all our routing needs
var scotchApp = angular.module('scotchApp', ['ngFileUpload','ngRoute']);

// configure our routes
scotchApp.config(function( $routeProvider, $locationProvider ) {
	$routeProvider

		// route for the home page
		.when('/', {
			templateUrl : 'pages/home.html',
			controller  : 'mainController'
		})

		// route for the about page
		.when('/about', {
			templateUrl : 'pages/about.html',
			controller  : 'aboutController'
		})
	
		// route for the contact page
		.when('/contact', {
			templateUrl : 'pages/contact.html',
			controller  : 'contactController'
		})
		.when('/crud', {
			templateUrl : 'pages/crud.html',
			controller  : 'CRUDController'
		})
		.when('/fileupload', {
			templateUrl : 'pages/fileupload.html',
			controller  : 'fileUploadController'
		});
		// $locationProvider.html5Mode(true);
});

// create the controller and inject Angular's $scope
scotchApp.controller('mainController', function($scope) {
	// create a message to display in our view
	$scope.message = 'Everyone come and see how good I look!';
});

scotchApp.controller('aboutController', function($scope) {
	$scope.message = 'Look! I am an about page.';
});

scotchApp.controller('contactController', function($scope) {
	$scope.message = 'Contact us! JK. This is just a demo.';
});
scotchApp.controller('fileUploadController', function($scope, $http, Upload, $timeout) {
	$scope.message = 'An Example of file uploading using node server.';
	$scope.uploadFiles = function(files, errFiles) {
        $scope.files = files;
        $scope.errFiles = errFiles;
        angular.forEach(files, function(file) {
            file.upload = Upload.upload({
                url: '/fileupload',
                data: {userPhoto: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        });
    }
});

scotchApp.controller('CRUDController', function($scope, $http, CRUDService) {
	$scope.message = 'An Example of CRUD operations.';
	
	$scope.usersList = [];
	loadRemoteData();

	$scope.addUser = function(){                
		CRUDService.addUser( $scope.user.username).then(loadRemoteData, function(errorMessage ){ 
			console.warn( errorMessage );
		});
		clearform();
	}
	$scope.deleteUser = function( user ){
		CRUDService.deleteUser( user.id ).then(loadRemoteData, function(errorMessage ){ 
			console.warn( errorMessage );
		});
		clearform();
	}

	function clearform(){
		$scope.user = {};
	}

	function applyRemoteData( list ) {
        $scope.usersList = list;
    }
    function loadRemoteData() {
        CRUDService.getUsers().then(function( response ) {
            applyRemoteData( response );
        });
    }
});

scotchApp.service("CRUDService", function($http, $q){
	return({
        addUser: addUser,
        getUsers: getUsers,
        deleteUser: deleteUser
    });

	function addUser( username ){
		var request = $http({
            method: "post",
            url: "/crud",
            params: {
                action: "add"
            },
            data: {
                username: username
            }
        });
        return( request.then( handleSuccess, handleError ) );
	}

	function getUsers() {
        var request = $http({
            method: "get",
            url: "/crud",
            params: {
                action: "get"
            }
        });
        return( request.then( handleSuccess, handleError ) );
    }
    function deleteUser( id ) {
        var request = $http({
            method: "delete",
            url: "/crud/" + id,
            params: {
                action: "delete"
            },
            data: {
                id: id
            }
        });
        return( request.then( handleSuccess, handleError ) );
    }
    function handleError( response ) {
        if (
            ! angular.isObject( response.data ) ||
            ! response.data.message
            ) {
            return( $q.reject( "An unknown error occurred." ) );
        }
        // Otherwise, use expected error message.
        return( $q.reject( response.data.message ) );
    }
    function handleSuccess( response ) {
	    return( response.data );
	}


});