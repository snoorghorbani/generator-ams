angular
    .module('<%= moduleName.underscored %>')
        .directive('<%= name.camelize%>', ['$compile', function ($compile) {

            var controller = ['$scope', '$element', '$attrs', '$compile', 'share_module_config', "_", function ($scope, element, attrs, $compile, share_module_config, _) {

            }]
            var pre = function ($scope, element, attrs, ctrls, $transclude) { };
            var post = function ($scope, element, attrs, ctrls, $transclude) { };


            return  directive = {
                restrict: 'EA',
                priority: 1500,
                transclude: false,
                template: '',
                require: [],
                scope: false,
                controller: controller,
                compile: function CompilingFunction($templateElement, $templateAttributes) {
                    return {
                        pre: pre,
                        post: post
                    }
                }
            }

        }])
;