var fs = require('fs');
var ncp = require('ncp').ncp;
var spawn = require('child_process').spawn;
var chalk = require('chalk'),
    chalk_error = chalk.bold.red,
    title = chalk.bgBlack.white.bold,
    log = chalk.white.bold;
var ghd = require('github-download');
var mv = require('mv');
var bower = require('bower');
var inquirer =  require('inquirer');


var init = function () {
    var templatesFolder = '../../../templates/';
    var AMS_bower_dir;
    var project_dir;



    var get_ams_file_path = function (path) {
        return (AMS_bower_dir + '\\' + path);
    }
    var get_ams_file = function (path) {
        return require(get_ams_file_path(path));
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

    var create_yo_config_file = function (generator, config) {
        const FILE = '.yo-rc.json';
        fs.createWriteStream(get_project_file_path(FILE));
    }
    var init_bower = function(generator, config){
      console.log(title("                               "));
      console.log(title(" initialize bower              "));
      console.log(title("                               "));
      bower.commands.init(null,null,{ interactive: true })
        .on('prompt', function (prompts, callback) {
            inquirer.prompt(prompts, callback);
        });
    }
    var download_AMS_from_github= function(generator, config,next){
      console.log(title("                               "));
      console.log(title(" downloading AMS from github..."));
      console.log(title("                               "));

      if(fs.existsSync(get_project_file_path('bower_components/angular-modular-structure'))){
          console.log(log(" angular-modular-structure exists! "));
          return next(generator, config);
      }

      generator.spawnCommand('git', ["clone","https://github.com/snoorghorbani/angular-modular-structure.git"])
        .on('close', function(){
          mv("angular-modular-structure", "bower_components/angular-modular-structure", {mkdirp: true}, function(err) {
            next(generator, config);
          });
        });
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

        fs.writeFile(get_project_file_path(FILE), JSON.stringify(project_package, null, ' '));
    }
    var update_project_bower = function (generator, config) {
        const FILE = 'bower.json';

        var ams_bowerPkg = get_ams_file(FILE);
        var project_bowerPkg = get_project_file(FILE) || {};

        project_bowerPkg.dependencies = project_bowerPkg.dependencies || {};
        project_bowerPkg.resolutions = project_bowerPkg.resolutions || {};

        for (var i in ams_bowerPkg.dependencies)
            project_bowerPkg.dependencies[i] = ams_bowerPkg.dependencies[i];
        for (var i in ams_bowerPkg.resolutions)
            project_bowerPkg.resolutions[i] = ams_bowerPkg.resolutions[i];

        fs.writeFile(get_project_file_path(FILE), JSON.stringify(project_bowerPkg, null, ' '));
    }
    var update_project_bower_config = function (generator, config) {
        const FILE = '.bowerrc';

        fs.createReadStream(get_ams_file_path(FILE))
            .pipe(fs.createWriteStream(get_project_file_path(FILE)));
    }
    var create_public_and_client_folder = function (generator, config) {
      !fs.existsSync(get_project_file_path('client'))
          && fs.mkdir(get_project_file_path('client'));
      !fs.existsSync(get_project_file_path('public'))
          && fs.mkdir(get_project_file_path('public'));
    }
    var copy_gulp_file_to_project = function (generator, config) {
        const FILE = 'gulpfile.js';

        var project_gulpFile = fs.existsSync(get_project_file_path(FILE));

        var destinationFileName = (!project_gulpFile) ? FILE : FILE + '.tmp';
        fs.createReadStream(get_ams_file_path(FILE))
            .pipe(fs.createWriteStream(get_project_file_path(destinationFileName)));
    }
    var copy_server_file_to_project = function (generator, config) {
      const FILE = 'server.js';

      var project_gulpFile = fs.existsSync(get_project_file_path(FILE));

      var destinationFileName = (!project_gulpFile) ? FILE : FILE + '.tmp';
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
    var copy_public_directories_to_project = function(){
      // console.log('///////////////////////////////////////////////')
      // console.log(get_ams_file_path('public/assets'))
      // console.log(get_project_file_path('public/assets'))
      ncp('./bower_components/angular-modular-structure/public/assets','./public/assets',function (err) {
         if (err) {
           return console.error(err);
         }
      });
      ncp('./bower_components/angular-modular-structure/public/data','./public/data',function (err) {
         if (err) {
           return console.error(err);
         }
      });
      // ncp(get_ams_file_path('assets'),get_project_file_path('assets'));
    }
    var install_bower_packages = function(generator, config,next){
      console.log(title("                               "));
      console.log(title(" install bower packages        "));
      console.log(title("                               "));

      bower.commands.install(null,null,{ interactive: true })
        .on('log', function (log) {
          if(log.level == "action" && log.id == "install" ){
            console.log("installed : " + log.message);
          }
          else if(log.level == "conflict" && log.id != "solved"){
            console.log(log.message);
            if(log.data.picks){
              for (var i = 0; i < log.data.picks.length; i++) {
                console.log(log.data.picks[i].pkgMeta.version);
              }
            }
          }
        })
        .on('prompt', function (prompts, callback) {
            inquirer.prompt(prompts, callback);
        })
        .on('end',function(){
          next(generator,config);
        });
    }
    var install_npm_packages = function(generator, config,next){
      // console.log(chalk.gray("-----------------------------------------------------"));
      console.log(title("                               "));
      console.log(title(" install npm packages          "));
      console.log(title("                               "));
      generator.spawnCommand('npm', ["install"]).on('close', function(){
        next(generator, config);
      });
    }
    var run_default_gulp_task = function(generator, config){
      // console.log(chalk.gray("-----------------------------------------------------"));
      console.log(title("                               "));
      console.log(title(" run gulp default task         "))
      console.log(title("                               "));
      generator.spawnCommand('gulp', ["default"]).on('close', done);
    }
    var done = function(){
      console.log(title("                                                       "));
      console.log(title("*******************************************************"));
      console.log(title("*******************************************************"));
      console.log(title("**                                                   **"));
      console.log(title("** angular modular structure Initialization Done :-) **"));
      console.log(title("**                                                   **"));
      console.log(title("*******************************************************"));
      console.log(title("*******************************************************"));
      console.log(title("                                                       "));
    }

    this.execute = function (generator, config) {
        project_dir = generator.destinationRoot();
        AMS_bower_dir = [project_dir,config.AMS_bower_dir].join('\\');

        // create_yo_config_file();
        // init_bower(generator, config);
        download_AMS_from_github(generator, config,function(){
          console.log(title("                               "));
          console.log(title(" copy and update project files "));
          console.log(title("                               "));
          console.log("   - copy gulp file to project");
          copy_gulp_file_to_project();
          console.log("   - update project package file");
          update_project_package(generator, config);
          console.log("   - update project bower file");
          update_project_bower(generator, config);
          console.log("   - update project bower config file");
          update_project_bower_config(generator, config);
          console.log("   - create public and client folder");
          create_public_and_client_folder(generator, config);
          console.log("   - copy public directories to project");
          copy_public_directories_to_project(generator, config);
          copy_server_file_to_project(generator, config);
          //copy_index_html_file_to_project(generator, config);
          // generator.destinationRoot()
          install_npm_packages(generator, config,function(generator, config){
            install_bower_packages(generator, config,function(){
              run_default_gulp_task(generator, config);
            });
          });
        });
    }
};

module.exports = new init();
