/**set action modal and data contract
 *  maybe : 
 *            apiGateway
 *              .context(controllerName)
 *              .action(actionName)
 *              .route(route)
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
                .schema(<%= schema %>)
                .virtual("all", [])
                .getter("all", function (current) { return current.concat(this.Result.Items); })
                .method("load next page", function () {
                    //return if we have all items right now
                    if (this.PagingInfo.PageNo * this.PagingInfo.PageSize >= this.Result.TotalFoundItems) return;
                    this.PagingInfo.PageNo++
                    this.$invoke()
                })
                .notification("<%= i18n.api_message %>")
                .done()
            ;
        }])
;