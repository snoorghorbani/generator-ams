/*
 *	view template   :   <%= viewTemplate %>
 */
angular.module('<%= moduleName %>')
    .config(
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
				.state("restricted.<%= moduleName %>.<%= stateName %>", {
					url: "/<%= stateName %>",
					templateUrl: 'client/<%= moduleName %>/<%= stateName %>/<%= moduleName %>_<%= stateName %>.template.html',
					controller: '<%= moduleName %>_<%= stateName %>.controller',
					resolve: {
						deps: ['$ocLazyLoad', function ($ocLazyLoad) {
							return $ocLazyLoad.load([
								'lazy_parsleyjs',
								'lazy_masked_inputs',
								'lazy_character_counter',
								'/client/<%= moduleName %>/<%= stateName %>/<%= moduleName %>_<%= stateName %>.controller.js',
								'/client/<%= moduleName %>/<%= moduleName %>.service.js'
							]);
						}],
					},
					data: {
						pageTitle: '<%= moduleName %> <%= stateName %>'
					}

				})
			})
;