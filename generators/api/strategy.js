var Strategy = function () {
    var templatesFolder = '../../../templates/';
    this.execute = function (generator) {
        var API_DIRECTORY = "api";
        var getName = function () {
            return generator.moduleName + "_" + generator.actionName;
        }

        var destination_path = function () {
            return generator.DIRECTORY + '/' + generator.moduleName + '/' + API_DIRECTORY + '/' + getName();
        }

        generator.template(templatesFolder + '_api_service.js', destination_path() + '.api.js');
    }
};

module.exports = new Strategy();