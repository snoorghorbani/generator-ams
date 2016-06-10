angular
    .module('<%= ModuleName %>')
    .controller('<%= ModuleName %>.controller', [
        '$rootScope',
        '$scope',
        'locale',
        '$http',
        '<%= ModuleName %>.service',
        function ($rootScope, $scope, locale, $http, <%= ModuleName %>_service) {
            var $scopeManager = new $scope.$scopeManager($scope);

            $scope.searchAction = $scope.$$$api.supplier.<%= ModuleName %>.$init(invoke_on_init = true);
        }
    ])
;