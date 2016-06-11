angular
    .module('<%= moduleName %>')
        .service('<%= moduleName %>.service', ['$resource', 'locale', 'apiGateway', function ($resource, locale, apiGateway) {

            var api = $resource('/<%= moduleName %>/:action', { action: '@action' }, {
                sampleAction: { method: 'POST', params: { action: 'sampleAction' } }
            });

            var context = apiGateway.db('<%= moduleName %>');
            context.api(api);

            context.model(['sampleAction'], function () {
			//compelete action model here
			this.Result = {
			};
            }, {
                concrete: true, 
				required: [], 
				returnModel: 'sampleAction',
				getter:{},
				setter:{}
            });


            context.notification(['sampleAction'], 'در حال جستجوی اطلاعات');
        }]);