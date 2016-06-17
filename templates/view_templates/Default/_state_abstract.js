/*
 *	view template   :   <%= viewTemplate %>
 */
angular.module('<%= moduleName %>')
    .config(
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
            .state("restricted.<%= moduleName %>", {
                url: "/<%= moduleName %>",
                template: '<div ui-view autoscroll="false"/>',
                abstract: true

            })
        })
;