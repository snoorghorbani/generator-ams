/**set action modal and data contract
 *  maybe : 
 *            apiGateway
 *              .context(controllerName)
                .action(actionName)
 *              .post(POST/PUT/DELETE?GET)
 *              .model(function(){})
 *              .schema({
 *					name:{
 *	 					IsRequired
 *	 					Default
 *	 					Type
 *	 					MaxLength
 *					}	 
 *              })
 *              .getter(value_path,function(){})
 *              .setter(value_path,function(){})
 *              .notification(message);
 **/
angular
    .module('<%= moduleName.underscored %>')
        .run(['apiGateway', function (apiGateway) {

            apiGateway
                .context('<%= moduleName.underscored %>')
                .action("<%= actionName.underscored %>")
                .method('<%= methodType.origin %>')
                .schema(<%= schema %>)
                .notification("<%= i18n.api_message %>")
                .done()
            ;
        }])
;