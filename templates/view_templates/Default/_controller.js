/*
 *	view template   :   <%= viewTemplate %>
 */
angular
    .module('<%= moduleName %>')
    .controller('<%= fullName %>.controller', [
        '$scope',
        'locale',
        '_',
        function ($scope, locale, _) {
            var $scopeManager = new $scope.$scopeManager($scope);

            //$scope.searchAction = $scope.$$$api.{backendControllerName}.{actionName}.$init(invoke_on_init = true);
        }
    ])
;