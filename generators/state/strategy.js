var Strategy = function () {
    var templatesFolder = '../../../templates/';
    this.execute = function (generator) {

        var getName = function () {
            return generator.moduleName + "_" + generator.stateName;
        }

        var destination_path = function () {
            return generator.DIRECTORY + '/' + generator.moduleName + '/' + generator.stateName + '/' + getName();
        }

        generator.template(templatesFolder + '_state_child.js', destination_path() + '.state.js');
        if (generator.haveView)
            generator.template(templatesFolder + '_template.html', destination_path() + '.template.html');
        if (generator.addToMenu)
            generator.template(templatesFolder + '_menu.js', destination_path() + '.menu.js');
        if (generator.haveController)
            generator.template(templatesFolder + '_controller.js', destination_path() + '.controller.js');
    }
};

module.exports = new Strategy();