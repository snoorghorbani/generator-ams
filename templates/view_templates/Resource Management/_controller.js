/*
 *	view template   :   <%= viewTemplate %>
 */
angular
    .module('<%= moduleName %>')
    .controller('<%= fullName %>.controller', [
        '$rootScope',
        '$scope',
        'locale',
        function ($rootScope, $scope, locale) {
            var $scopeManager = new $scope.$scopeManager($scope);

            $$$api.<%= moduleName %>.<%= add_action %>
                .$promise
                .then(function (response) {
                    //$scope.newVouchers = response.Result.VoucherCodes;
                    UIkit.modal("#new-<%= moduleName %>s-modal").show();
                    $scope.searchAction.$invoke();
                })
                .catch(function (response) { debugger; });

            $scope.searchAction = $$$api.<%= moduleName %>.<%= search_action %>.$init(invoke_on_init = true);
        }
    ])
;
