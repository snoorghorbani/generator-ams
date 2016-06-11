var JavaStrategy = function () {
    var templatesFolder = '../../../templates/';

    this.execute = function (generator) {
        var getName = function () {
            return generator.moduleName;
        }
        var destination_path = function () {
            return generator.DIRECTORY + '/' + generator.moduleName + '/' + getName();
        }
        var language_destination_path = function () {
            //TODO : get language type and language folder
            return "languages" + "/" + "en-US" + '/' + generator.moduleName;
        }

        if (generator.files.module.selected)
            generator.template(templatesFolder + '_module.js', destination_path() + '.module.js');
        if (generator.files.menu.selected)
            generator.template(templatesFolder + '_menu.js', destination_path() + '.menu.js');
        if (generator.files.state.selected)
            generator.template(templatesFolder + '_state_abstract.js', destination_path() + '.state.js');
        if (generator.files.service.selected)
            generator.template(templatesFolder + '_service.js', destination_path() + '.service.js');
        if (generator.files.controller.selected)
            generator.template(templatesFolder + '_controller.js', destination_path() + '.controller.js');
        if (generator.files.template.selected)
            generator.template(templatesFolder + '_template.html', destination_path() + '.template.html');
        if (generator.files.language.selected)
            generator.template(templatesFolder + '_language.json', language_destination_path() + '.lang.json');
    }

};

module.exports = new JavaStrategy();