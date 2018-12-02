services.factory('RouteFactory', function ($resource) {
    var queryParam = {};

    return generalModule($resource, 'route', queryParam);
});
