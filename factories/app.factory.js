var BASEURL = 'http://localhost:8080';

var services = assignment.config(function () {
});

function generalModule($resource, resource, queryParam) {
    var url = BASEURL + '/' + resource;

    var Bulk = $resource(url, {}, {
        get: {
            method: 'GET',
            params: queryParam,
            isArray: false
        },

        create: {
            method:'POST'
        }
    });


    var ById = $resource(url + '/:id', {}, {
        get: {
                method: 'GET'
        },

        update: {
                method: 'PUT'
        },

        delete: {
                method: 'DELETE'
        }
    })


    return {
        Bulk: Bulk,
        ById: ById
    }

}



