var Strategy = function () {
    var templatesFolder = '../../../templates/';
    this.execute = function (generator) {
        var templatesFolder_according_views = templatesFolder + 'view_templates/Resource management/';
        var getName = function () {
            return generator.moduleName + "_" + generator.stateName;
        }

        var destination_path = function () {
            return ('./' + generator.directory + '/' + generator.moduleName + '/' + generator.stateName + '/' + getName());
        }

        generator.template(templatesFolder_according_views + '_state_child.js', destination_path() + '.state.js');
        if (generator.haveView)
            generator.template(templatesFolder_according_views + '_template.html', destination_path() + '.template.html');
        if (generator.haveController)
            generator.template(templatesFolder_according_views + '_controller.js', destination_path() + '.controller.js');
        if (generator.addToMenu)
            generator.template(templatesFolder + '_menu.js', destination_path() + '.menu.js');
    }
};

module.exports = new Strategy();