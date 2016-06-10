'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var _ = require('underscore.string');


/**
 * Initialization Function.
 */
var AMS = module.exports = function Appgenerator(args, options) {
    yeoman.generators.Base.apply(this, arguments);

    // After finishing.
    this.on('end', function () {
        // Will instal dependencies if configured to it.
        if (!this.options['skip-install']) {
            this.installDependencies();
        }

    });

    this.pkg = require('../../package.json');
};

require('util').inherits(AMS, yeoman.generators.Base);


AMS.prototype.askFor = function askFor() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the Angular Modular Structure(AMS) generator!'));
    this.log(chalk.blue.bgRed.bold('Lets Rock!!!'));

    // Promot - If Dummy, nothing will be asked to user
    var prompts;
    if (this.options.dummy !== true) {
        var prompts = [{
            name: 'ModuleName',
            message: "What's the name of your Module?"
        }, {
            name: 'addToMenu',
            type: 'confirm',
            store: true,
            message: 'do you want to add module to menu?'
        },
        {
            name: 'files',
            type: 'checkbox',
            choices: [{ name: "Module" }, { name: "Route" }, { name: "State" }, { name: "Controller" }, { name: "Menu" }, { name: "Service" }, { name: "Template" }],
            message: 'Select file that you want to create :'
        }];
    } else {
        prompts = [];
    }

    if (!this.config.get('directory'))
        prompts.push({
            name: 'directory',
            message: "Enter your modules directory?",
            "default": "Client"
        });
    // Promtp all questions, if not on dummy mode.
    this.prompt(prompts, function (props) {
        var selectedFiles = JSON.stringify(props.files, null, '  ');

        // fill context with user answers
        this.ModuleName = props.ModuleName;
        this.addToMenu = props.addToMenu;
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
            }
        }

        if (props.directory) {
            this.config.set("directory", props.directory);
        }

        // ???
        this.slug = _.slugify(this.ModuleName);
        this.validVariableName = _.capitalize(_.slugify(this.ModuleName)).replace('-', '');

        done();
    }.bind(this));
};

AMS.prototype.app = function app() {
    this.mkdir('Client/' + _.slugify(this.ModuleName));
    this.ModuleName = _.slugify(this.ModuleName);
    //this.config.set("ss","sss");
    //this.log(this.config.get("ss"));
    var strategy = require('./strategy.js');

    // Execute extrategy configuration.
    strategy.execute(this);
    this.log('create files according your choose...');
};

AMS.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
};
AMS.prototype.saveConfig = function saveConfig() {
    this.config.save();
};