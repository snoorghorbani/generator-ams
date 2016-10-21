var JavaStrategy = function () {
    var templatesFolder = '../../../templates/';

    this.execute = function (generator) {
        var getName = function () {
            return generator.moduleName.underscored;
        }
        var destination_path = function () {
            return generator.directory + '/' + generator.moduleName.underscored + '/' + getName();
        }
        var language_destination_path = function () {
            //TODO : get language type and language folder
            return "public/languages" + "/" + "fa-IR" + '/' + generator.moduleName.underscored;
        }
        var is_this_file_selected = function (name) {
            return generator.files.indexOf(name) > -1;
        }

        if (is_this_file_selected('Module'))
            generator.template(templatesFolder + '_module.js', destination_path() + '.module.js');
        if (is_this_file_selected('Menu'))
            generator.template(templatesFolder + '_menu_module.js', destination_path() + '.menu.js');
        if (is_this_file_selected('State'))
            generator.template(templatesFolder + '_state_abstract.js', destination_path() + '.state.js');
        if (is_this_file_selected('Service'))
            generator.template(templatesFolder + '_service.js', destination_path() + '.service.js');
        if (is_this_file_selected('Controller'))
            generator.template(templatesFolder + '_controller.js', destination_path() + '.controller.js');
        if (is_this_file_selected('Template'))
            generator.template(templatesFolder + '_template.html', destination_path() + '.template.html');
        if (is_this_file_selected('Language'))
            generator.template(templatesFolder + '_language.json', language_destination_path() + '.lang.json');
    }

};

module.exports = new JavaStrategy();
