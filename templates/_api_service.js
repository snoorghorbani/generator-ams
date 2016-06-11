/**set action modal and data contract
 *  maybe : apiGateway.db('voucher')
 *              .route("/voucher/search")
 *              .post()
 *              .model()
 *              .datacontract()
 *              .getter()
 *              .setter()
 *              .notification();
 **/
angular
    .module('<%= moduleName %>')
        .run(['$resource', 'locale', 'apiGateway', function ($resource, locale, apiGateway) {

            apiGateway
                .context('<%= moduleName %>')
                .action("<%= actionName %>")
                .method('<%= methodType %>')
                .model(function () {
                    this.SampleProp = "TestValue";
                    this.ObjProp = {
                        ArrayProp: [{
                            ChildProp: ''
                        }]
                    }
                })
                .getter("ObjProp.ArrayProp.ChildProp", function (value) {
                    return value.toString();
                })
                .getter("SampleProp", function (value) {
                    return value.toString();
                })
                .setter("SampleProp", function (value) {
                    return value.toUpperCase();
                })
                .notification("<%= actionName %> of <%= moduleName %> start !")
                .done()
            ;
        }])
;