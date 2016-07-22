var create_file = function () {
    var templatesFolder = '../../../templates/';
    this.execute = function (generator) {
        var getName = function () {
            return generator.moduleName.underscored + "_" + generator.name.underscored;
        }

        var destination_path = function () {
            return ('./' + generator.directory + '/' + generator.moduleName.underscored + '/directives/' + getName());
        }

        generator.template(templatesFolder + '_directive.js', destination_path() + '.directive.js');
        if (generator.haveView) {
            generator.templateUrl = destination_path() + '.directive.html';
            generator.template(templatesFolder + '_directive.html', generator.templateUrl);
        }
    }
};

module.exports = new create_file();