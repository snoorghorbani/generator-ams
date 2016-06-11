'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var _ = require('underscore.string');

var DIRECTORY = "directory";


/**
 * Initialization Function.
 */
var AMS = module.exports = function Appgenerator(args, options) {
    yeoman.generators.Base.apply(this, arguments);

    // After finishing.
    this.on('end', function () {
        // Will instal dependencies if configured to it.
        //if (!this.options['skip-install']) {
        //    this.installDependencies();
        //}
        this.spawnCommand('gulp', ["js_app"]);
    });

    this.pkg = require('../../package.json');
};

require('util').inherits(AMS, yeoman.generators.Base);

AMS.prototype.askFor = function askFor() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the Angular Modular Structure(AMS) generator!'));
    this.log(chalk.blue.bgRed.bold('Lets Rock!!!'));

    var prompts = [];

    /**
     * at the first run of generator
     * ask for some strunture parameter
     * like:
     * directory : place that module directory save there.
     */
    if (!this.config.get(DIRECTORY))
        prompts.push({
            name: DIRECTORY,
            message: "Enter your modules directory?",
            "default": "Client"
        });
    else if (this.config.get(DIRECTORY))
        this.DIRECTORY = this.config.get(DIRECTORY);

    if (!this.config.get("postGuplTask"))
        prompts.push({
            name: "postGuplTask",
            message: "Enter Gulp Task that you want to run after done?"
        });

    prompts = prompts.concat([{
        name: 'moduleName',
        message: "What's the name of your Module?"
    },
    {
        name: 'files',
        type: 'checkbox',
        choices: [{ name: "Module" }, { name: "Route" }, { name: "State" }, { name: "Controller" }, { name: "Menu" }, { name: "Service" }, { name: "Template" }, { name: "Language" }],
        message: 'Select file that you want to create :'
    }]);

    // Promtp all questions.
    this.prompt(prompts, function (props) {
        var selectedFiles = JSON.stringify(props.files, null, '  ');

        // fill context with user answers
        this.moduleName = props.moduleName;
        this.files = {
            "module": {
                selected: selectedFiles.indexOf("Module") > 0
            },
            "menu": {
                selected: selectedFiles.indexOf("Menu") > 0
            },
            "route": {
                selected: selectedFiles.indexOf("Route") > 0
            },
            "state": {
                selected: selectedFiles.indexOf("State") > 0
            },
            "controller": {
                selected: selectedFiles.indexOf("Controller") > 0
            },
            "service": {
                selected: selectedFiles.indexOf("Service") > 0
            },
            "template": {
                selected: selectedFiles.indexOf("Template") > 0
            },
            "language": {
                selected: selectedFiles.indexOf("Language") > 0
            }
        }

        if (props[DIRECTORY]) {
            this.config.set(DIRECTORY, props[DIRECTORY]);
            this.DIRECTORY = this.config.get(DIRECTORY);
        }
        if (props.postGuplTask)
            this.config.set("postGuplTask", props.postGuplTask);
        // ???
        this.slug = _.slugify(this.moduleName);
        this.validVariableName = _.capitalize(_.slugify(this.moduleName)).replace('-', '');
        this.fullName = this.moduleName;
        this.menuLink = this.moduleName;
        this.menuLink_underlined = this.moduleName;

        done();
    }.bind(this));
};

AMS.prototype.app = function app() {
    //this.sourceRoot("../templates");
    this.mkdir('Client/' + _.slugify(this.moduleName));
    this.moduleName = _.slugify(this.moduleName);
    //this.config.set("ss","sss");
    //this.log(this.config.get("ss"));
    var strategy = require('./strategy.js');

    this.log("destinationRoot : ", this.destinationRoot());
    this.log("source root : ", this.sourceRoot());

    // Execute extrategy configuration.
    strategy.execute(this);
    this.log('create files according your choose...');
};

AMS.prototype.projectfiles = function projectfiles() {
    var templatesFolder = '../../../templates/';

    this.copy(templatesFolder + 'editorconfig', '.editorconfig');
};
AMS.prototype.saveConfig = function saveConfig() {
    this.config.save();
};