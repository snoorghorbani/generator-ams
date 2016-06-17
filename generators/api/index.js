'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var http = require('http');
var chalk = require('chalk');
var _ = require('underscore.string');
var config = require('./config.json');
var global = require('../global.json');
var global_fn = require('../global.js');
var global_ask = require("../global_ask");

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
    var prompts = global_ask.define_questions(this);
    global_fn.add_select_module_to_questions(this, prompts);
    prompts = prompts.concat(config.questions);

    this.prompt(prompts, function (props) {

        global_ask.proccess_user_interactions(this, props);
        global_fn.fill_generator_with_answers(this, props);
        done();

    }.bind(this));
};

AMSG.prototype.app = function app() {
    require('./get_schema_from_server.js')(this);

    this.log('create files according your choose...');
    this.i18n = {
        api_message: this.moduleName.underscored + '.' + this.actionName.titleize + ' of ' + this.moduleName.titleize + ' start'
    }
    global_fn.add_message_to_language(this);
};

AMSG.prototype.saveConfig = function saveConfig() {
    this.config.save();
};