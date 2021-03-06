angular.module('<%= moduleName.underscored %>')
    .config(
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
            .state("restricted.<%= moduleName.underscored %>", {
                url: "/<%= moduleName.underscored %>",
                template: '<div ui-view autoscroll="false"/>',
                abstract: true
            })
        })
;