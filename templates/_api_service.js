/**set Data and Donnection Contract for single backend controller's action
 *  maybe :
 *            apiGateway
 *              .context(__controllerName)
 *              .action(__actionName)
 *              .post(POST/PUT/DELETE/GET)
 *              .route(__path , __extending)
 *              .model(__function)
 *              .schema({
 *					        name:{
 * 	 					      IsRequired
 * 	 					      Default
 * 	 					      Type
 * 	 					      MaxLength
 * 					      }
 *              })
 *              .options([])
 *              .method(__name,__function)
 *              .virtual(__name,__default)
 *              .getter(__value_path,_-function(){})
 *              .setter(__value_path,__function(){})
 *              .pause_before_send()
 *              .notification(message)
 *              .done();
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
