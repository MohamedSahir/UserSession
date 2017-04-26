

var myApp = angular.module('myApp', ['ui.router']);


myApp.controller('productController',function($scope,$http){
    alert('stop');
    $scope.stop = function() {      
        
    // from here call the api  and the api url is    stopsession
        
            alert("stop session");
         $http({
            method: 'POST',
            url: "stopsession",
            headers: { 'Content-Type': 'application/json' }
        })
       .success(function (response) {
             
               })
       .error(function (response) {
           //result.reject(response);
           alert("error");
       });
    
      
    }
    
});

myApp.run(function ($rootScope, $interval, $timeout, $state) {
  
     $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, $rootScope, $state, $location) {   

        alert('success  Routechange extendmor 5 more minute')
       var lastDigestRun = Date.now();

       var m = lastDigestRun + 5 * 60 * 1000;      
         document.getElementById("demo").innerHTML =new Date(m);
       var idleCheck= setInterval(function () {

              var now = Date.now();
             

                if (now - lastDigestRun > 3 * 60 * 1000) {
                    alert("  Routechange proceed to extend more");
                    proceed();
                    // show the pop up , the pop have continue to extend the time session.

                }
                if (now - lastDigestRun > 5 * 60 * 1000) {
                    alert('logout');
                }
            
        }, 60 * 1000);


    });
});




var configFunction = function ($stateProvider, $httpProvider, $urlRouterProvider, $locationProvider) {
 
    var interceptor = function ($q, $rootScope, $timeout, $location) {
      return {
          request: function (config) {

              alert("alert session stop url");
              console.log(config.url);
              if (config.url == 'stopsession') {  
                     alert("clear Interval session stop url");
                  clearInterval(idleCheck);

              }
              else {

                  lastDigestRun = Date.now();
                  var m = lastDigestRun + 5 * 60 * 1000;
                 var idleCheck = setInterval(function () {

                          var now = Date.now();

                          if (now - lastDigestRun > 3 * 60 * 1000) {
                               alert("http request proceed to extend more");
                  load();
                              
                              // show pop up  to extend the time if click continue another 10 minutes gets added
                          }
                          if (now - lastDigestRun > 10 * 60 * 1000) {
                            // logout functionality
                          }

                  }, 60 * 1000);
                  return config;
              }
          },
            requestError: function (config) {            
                return config;
            },

            response: function (response) {

            },
            responseError: function (rejection) {


            }
        }
    };


    $httpProvider.interceptors.push(interceptor);
    
    
    $urlRouterProvider.otherwise('/login'); //default route
    $stateProvider
      .state('root', {
          url: '/login',   
         template:"<h1> Welcome to Login control</h1>"
      })
        .state('home', {
          url: '/home',   
          template:"<h1> Welcome to home control</h1>"
      })
    
     .state('product', {
          url: '/product',   
          template:'<h1>Welcome to product control</h1><button ng-click="stop()">stop session</button>',
          controller:"productController"
      });
    $locationProvider.html5Mode(false);
}
    
configFunction.$inject = ['$stateProvider', '$httpProvider', '$urlRouterProvider', '$locationProvider'];
myApp.config(configFunction);





proceed = function () {
            $("#myModal").modal('toggle');
            lastDigestRun = Date.now();
            var s = lastDigestRun +5 * 60 * 1000;

    
     
         var idleCheck  = setInterval(function () {

              
                    var now = Date.now();
                    var displaytime = now - lastDigestRun > 5 * 60 * 1000;
                    if (now - lastDigestRun > 3 * 60 * 1000) {
                         alert("  Routechange proceed to extend more");
                  
                       load();
                    }
                    if (now - lastDigestRun > 5 * 60 * 1000) {
                       alert('logout');
                    }
                
            }, 60 * 1000);
        };

load = function () {
    $("#myModal").modal();

}