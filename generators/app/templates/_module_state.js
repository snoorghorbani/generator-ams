angular.module('<%= ModuleName %>', [])
    .config(
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
            .state("restricted.<%= ModuleName %>", {
                url: "/<%= ModuleName %>",
                template: '<div ui-view autoscroll="false"/>',
                abstract: true

            })
            .state("restricted.<%= ModuleName %>.Management", {
                url: "/management",
                templateUrl: 'client/<%= ModuleName %>/<%= ModuleName %>_management.template.html',
                controller: 'suppliers_list.controller',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'lazy_parsleyjs',
                            'lazy_masked_inputs',
                            'lazy_character_counter',
                            '/client/<%= ModuleName %>/suppliers_list.controller.js',
                            '/client/<%= ModuleName %>/supplier.service.js'
                        ]);
                    }],
                },
                data: {
                    pageTitle: '<%= ModuleName %> Management'
                }

            })
        })
;