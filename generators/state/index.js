'use strict';

var util = require('util');
var fs = require('fs');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var _ = require('underscore.string');

var DIRECTORY = "directory";

/**
 * Initialization Function.
 */
var AMSG = module.exports = function Appgenerator(args, options) {
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

require('util').inherits(AMSG, yeoman.generators.Base);


AMSG.prototype.askFor = function askFor() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the Angular Modular Structure(AMSG) generator!'));
    this.log(chalk.blue.bgRed.bold('Lets Rock!!!'));

    var prompts = [];

    /**
     * at the first time of generator run 
     * ask for some strunture parameter
     * like:
     * directory : place that module directory save there.
     * gulp action that must be run after generating end.
     */
    if (!this.config.get(DIRECTORY)) prompts.push({
        name: DIRECTORY,
        message: "Enter your modules directory?",
        "default": "Client"
    });
    else if (this.config.get(DIRECTORY)) this.DIRECTORY = this.config.get(DIRECTORY);

    var _modules = getDirectories('./' + this.config.get(DIRECTORY));
    prompts.push({
        name: 'moduleName',
        type: 'list',
        choices: _modules,
        message: 'Choose Module :'
    });

    prompts = prompts.concat([{
        name: 'stateName',
        message: "What is your state name ?"
    }, {
        name: 'haveView',
        type: 'confirm',
        message: 'Do you want to create view for this ?'
    }, {
        name: 'addToMenu',
        type: 'confirm',
        message: 'Do you want to add to menu ?'
    }, {
        name: 'haveController',
        type: 'confirm',
        message: 'Do you want to add controller to this state ?'
    }]);

    // Promtp all questions, if not on dummy mode.
    this.prompt(prompts, function (props) {
        if (props.directory) {
            this.config.set("directory", props.directory);
            this.DIRECTORY = this.config.get(DIRECTORY);
        }
        if (props.postGuplTask)
            this.config.set("postGuplTask", props.postGuplTask);

        // fill context with user answers
        this.moduleName = props.moduleName;
        this.stateName = props.stateName;
        this.haveView = props.haveView;
        this.addToMenu = props.addToMenu;
        this.haveController = props.haveController;

        // ???
        this.slug = _.slugify(this.moduleName);
        this.validVariableName = _.capitalize(_.slugify(this.moduleName)).replace('-', '');
        this.fullName = [this.moduleName, this.stateName].join('_');
        this.menuLink = [this.moduleName, this.stateName].join('.');
        this.menuLink_underlined = [this.moduleName, this.stateName].join('_');

        done();
    }.bind(this));
};

AMSG.prototype.app = function app() {
    this.mkdir('Client/' + _.slugify(this.moduleName));
    this.moduleName = _.slugify(this.moduleName);

    require('./strategy.js').execute(this);

    this.log('create files according your choose...');
};

AMSG.prototype.projectfiles = function projectfiles() {

};
AMSG.prototype.saveConfig = function saveConfig() {
    this.config.save();
};

function getDirectories(srcpath) {
    return fs.readdirSync(srcpath).filter(function (file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
}