/*
 *	view template   :   <%= viewTemplate %>
 */
angular.module('<%= moduleName %>')
    .config(
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
				.state("restricted.<%= moduleName %>.<%= stateName %>", {
					url: "/<%= stateName %>",
					templateUrl: 'public/<%= moduleName %>_<%= stateName %>.template.html',
					controller: '<%= moduleName %>_<%= stateName %>.controller',
					controllerAs: 'vm',
					resolve: {
						deps: ['$ocLazyLoad', function ($ocLazyLoad) {
							return $ocLazyLoad.load([
                'lazy_dropify',
								'lazy_parsleyjs',
								'lazy_masked_inputs',
								'lazy_character_counter',
								'/public/<%= moduleName %>_<%= stateName %>.controller.js',
								'/public/<%= moduleName %>.service.js'
							]);
						}],
					},
					data: {
						pageTitle: '<%= moduleName %> <%= stateName %>'
					}

				})
			})
;
