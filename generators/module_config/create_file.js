var create_file = function () {
    var templatesFolder = '../../../templates/';
    this.execute = function (generator) {
        var getName = function () {
            return generator.moduleName.underscored + "_" + generator.name.underscored;
        }

        var destination_path = function () {
            return ('./' + generator.directory + '/' + generator.moduleName.underscored + '/' + getName());
        }
        generator.template(templatesFolder + '_module_config.js', destination_path() + '.module_config.js');
    }
};

module.exports = new create_file();