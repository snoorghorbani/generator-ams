angular
    .module('<%= moduleName.underscored %>')
    .controller('<%= fullName %>.controller', [
        '$scope',
        '<%= fullName %>.service',
        'locale',
        'locale',
        '_',
        function ($scope,<%= fullName %>_service locale, _) {
            var $scopeManager = new $scope.$scopeManager($scope);

        }
    ])
;