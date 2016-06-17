'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var _ = require('underscore.string');
var config = require('./config.json');
var global = require('../global.json');
var global_ask = require("../global_ask");
var global_fn = require('../global.js');

/**
 * Initialization Function.
 */
var AMSG = module.exports = function Appgenerator(args, options) {
    yeoman.generators.Base.apply(this, arguments);

    // After finishing.
    this.on('end', function () {
        this.spawnCommand('gulp', [this.postGuplTask]);
    });

    this.pkg = require('../../package.json');
};

require('util').inherits(AMSG, yeoman.generators.Base);

AMSG.prototype.userInteractions = function userInteractions() {
    var done = this.async();

    var prompts = global_ask.define_questions(this);

    /**
     * task questions
     */
    prompts = prompts.concat(config.questions);

    // Promtp all questions.
    this.prompt(prompts, function (props) {
        global_ask.proccess_user_interactions(this, props);
        global_fn.fill_generator_with_answers(this, props);

        this.validVariableName = _.capitalize(_.slugify(this.moduleName)).replace('-', '');
        this.fullName = this.moduleName.underscored;
        this.menuLink = this.moduleName.underscored;
        this.menuLink_underlined = this.moduleName.underscored;

        done();
    }.bind(this));
};
AMSG.prototype.app = function app() {
    //if (this.config.get(global.directory))
    //    this[global.directory] = this.config.get(global.directory);

    require('./create_file.js').execute(this);

    this.log('create files according your choose...');
};
AMSG.prototype.saveConfig = function saveConfig() {
    this.config.save();
};