angular.module('route.module', [])
.config(stateProvider);



function stateProvider($stateProvider, $urlRouterProvider){
    $stateProvider.state('routes',{
        url: '/routes',
        templateUrl: 'pages/route/route.html',
        controller: 'routeCtrl'
    })

    $urlRouterProvider.otherwise('/routes');
}