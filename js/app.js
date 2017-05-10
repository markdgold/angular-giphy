/*globals angular*/
var giphyApp = angular.module('GiphyApp', ['infinite-scroll']).value('THROTTLE_MILLISECONDS', 250);

giphyApp.controller('Main', ['$scope', '$http', function($scope, $http) {
    $scope.gifList = [];
    $scope.search = function() {
        var req = {
            url: 'http://api.giphy.com/v1/gifs/search',
            method: 'GET',
            params: {
                q: $scope.searchText,
                limit: 25,
                api_key: 'dc6zaTOxFJmzC'
            }

        };
        $http(req).then(function(response) {
            $scope.gifList = response.data.data;
            console.log('search', $scope.gifList);
        });
    };
    $scope.myPagingFunction = function() {
        console.log('paging');
        var req = {
            url: 'http://api.giphy.com/v1/gifs/search',
            method: 'GET',
            params: {
                q: $scope.searchText,
                limit: 5,
                offset: $scope.gifList.length,
                api_key: 'dc6zaTOxFJmzC'
            }
        };
        $http(req).then(function(response) {
            $scope.gifList = $scope.gifList.concat(response.data.data);
            console.log('page', $scope.gifList);
        });
    };
}]);
