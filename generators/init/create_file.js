var fs = require('fs');

var init = function () {
    var templatesFolder = '../../../templates/';
    var AMS_bower_dir;
    var project_dir;



    var get_ams_file_path = function (path) {
        return (AMS_bower_dir + '\\' + path);
    }
    var get_ams_file = function (path) {
        return require(AMS_bower_dir + '\\' + path);
    }
    var get_project_file_path = function (path) {
        return project_dir + '\\' + path;
    }
    var get_project_file = function (path) {
        var filepath = project_dir + '\\' + path;

        if (fs.existsSync(filepath))
            return require(project_dir + '\\' + path);
        else
            return false
    }

    var update_project_package = function (generator, config) {
        const FILE = 'package.json';

        var ams_package = get_ams_file(FILE);
        var project_package = get_project_file(FILE) || {};

        project_package.dependencies = project_package.dependencies || {};
        project_package.devDependencies = project_package.devDependencies || {};

        for (var i in ams_package.dependencies) {
            project_package.dependencies[i] = ams_package.dependencies[i];
        }
        for (var i in ams_package.devDependencies) {
            project_package.devDependencies[i] = ams_package.devDependencies[i];
        }

        fs.writeFile(get_project_file_path(FILE), JSON.stringify(project_package));
    }
    var update_project_bower = function (generator, config) {
        const FILE = 'bower.json';

        var ams_bowerPkg = get_ams_file(FILE);
        var project_bowerPkg = get_project_file(FILE) || {};

        project_bowerPkg.dependencies = project_bowerPkg.dependencies || {};

        for (var i in ams_bowerPkg.dependencies)
            project_bowerPkg.dependencies[i] = ams_bowerPkg.dependencies[i];

        fs.writeFile(get_project_file_path(FILE), JSON.stringify(project_bowerPkg));
    }
    var update_project_bower_config = function (generator, config) {
        const FILE = '.bowerrc';

        fs.createReadStream(get_ams_file_path(FILE))
            .pipe(fs.createWriteStream(get_project_file_path(FILE)));
    }
    var create_public_folder = function (generator, config) {
        !fs.existsSync(get_project_file_path('client'))
            && fs.mkdir(get_project_file_path('client'));
    }
    var copy_gulp_file_to_project = function (generator, config) {
        const FILE = 'gulpfile.js';

        var project_gulpFile = fs.existsSync(get_project_file_path(FILE));

        var destinationFileName = (!project_gulpFile) ? FILE : FILE + '.tmp';
        console.log(destinationFileName)
        fs.createReadStream(get_ams_file_path(FILE))
            .pipe(fs.createWriteStream(get_project_file_path(destinationFileName)));

    }
    var copy_index_html_file_to_project = function (generator, config) {
        const FILE = 'index.html';

        var project_gulpFile = fs.existsSync(get_project_file_path(FILE));

        var destinationFileName = (!project_gulpFile) ? FILE : FILE + '.tmp';
        console.log(destinationFileName)
        fs.createReadStream(get_ams_file_path(FILE))
            .pipe(fs.createWriteStream(get_project_file_path(destinationFileName)));

    }

    this.execute = function (generator, config) {
        project_dir = generator.destinationRoot();
        AMS_bower_dir = generator.destinationRoot(config.AMS_bower_dir);

        update_project_package(generator, config);
        update_project_bower(generator, config);
        update_project_bower_config(generator, config);
        create_public_folder(generator, config);
        copy_gulp_file_to_project(generator, config);
        //copy_index_html_file_to_project(generator, config);

    }

};

module.exports = new init();