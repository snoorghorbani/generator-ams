/**set action modal and data contract
 *  maybe : 
 *            apiGateway
 *              .context(controllerName)
                .action(actionName)
 *              .type(POST/PUT/DELETE?GET)
 *              .model(function(){})
 *              .schema({
 *					name:{
 *	 					IsRequired
 *	 					Default
 *	 					Type
 *	 					MaxLength
 *					}	 
 *              })
 *              .virtual(property_name , default_value)
 *              .getter(value_path,function(){})
 *              .setter(value_path,function(){})
 *              .notification(message);
 **/
angular
    .module('<%= moduleName.underscored %>')
        .run(['apiGateway', function (apiGateway) {

            apiGateway
                .context('<%= moduleName.camelize %>')
                .action("<%= actionName.origin %>")
                .type('<%= methodType.origin %>')
                .schema({
                    "Result": [{}]
                })
                .done()
            ;
        }])
;