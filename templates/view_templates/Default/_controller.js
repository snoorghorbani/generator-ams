/*
 *	view template   :   <%= viewTemplate %>
 */
angular
    .module('<%= moduleName %>')
    .controller('<%= fullName %>.controller', [
        '$rootScope',
        '$scope',
        'locale',
        '$http',
        function ($rootScope, $scope, locale, $http) {
            var $scopeManager = new $scope.$scopeManager($scope);

            //$scope.searchAction = $scope.$$$api.{backendControllerName}.{actionName}.$init(invoke_on_init = true);
        }
    ])
;