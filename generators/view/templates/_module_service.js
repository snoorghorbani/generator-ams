angular
    .module('<%= ModuleName %>')
        .service('<%= ModuleName %>.service', ['$resource', 'locale', 'apiGateway', function ($resource, locale, apiGateway) {

            var api = $resource('/<%= ModuleName %>/:action', { action: '@action' }, {
                sampleAction: { method: 'POST', params: { action: 'sampleAction' } }
            });

            var context = apiGateway.db('<%= ModuleName %>');
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