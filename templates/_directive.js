angular
    .module('<%= moduleName.underscored %>')
        .directive('<%= name.camelize%>.directive', ['$compile', function ($compile) {
            var directive = {
                restrict: 'EA',
                priority: 1500,
                transclude: false,
                template: '',
                require: [],
                scope: false,
                controller: ['$scope', '$element', '$attrs', '$compile', 'share_module_config', "_", function ($scope, element, attrs, $compile, share_module_config, _) {

                }],
                compile: function CompilingFunction($templateElement, $templateAttributes) {
                    return {
                        pre: function ($scope, element, attrs, ctrls, $transclude) {},
                        post: function ($scope, element, attrs, ctrls, $transclude) {}
                    }
                }
            }

            return directive;
        }]);