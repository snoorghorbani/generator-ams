var Strategy = function () {
    var templatesFolder = '../../../templates/';
    this.execute = function (generator) {
        //console.log(JSON.stringify(generator.schema))
        var API_DIRECTORY = "api";
        var getName = function () {
            return generator.moduleName.underscored + "_" + generator.actionName.underscored;
        }

        var destination_path = function () {
            return generator.directory + '/' + generator.moduleName.underscored + '/' + API_DIRECTORY + '/' + getName();
        }

        generator.template(templatesFolder + '_api_service.js', destination_path() + '.api.js');
    }
};

module.exports = new Strategy();
