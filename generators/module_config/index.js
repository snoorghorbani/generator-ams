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

AMSG.prototype.askFor = function askFor() {
    var done = this.async();
    /**
     * ask question about .yo-rc
     */
    var prompts = global_ask.define_questions(this);

    /**
     * task questions
     */
    global_fn.add_select_module_to_questions(this, prompts);

    prompts = prompts.concat(config.questions);

    // Promtp all questions, if not on dummy mode.
    this.prompt(prompts, function (props) {
        global_ask.proccess_user_interactions(this, props);
        global_fn.fill_generator_with_answers(this, props);
        done();
    }.bind(this));
};
AMSG.prototype.app = function app() {
    if (this.config.get(global.directory))
        this[global.directory] = this.config.get(global.directory);

    require('./create_file.js').execute(this);

    this.log('create files according your choose...');
};

AMSG.prototype.saveConfig = function saveConfig() {
    this.config.save();
};
