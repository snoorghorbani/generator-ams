'use strict';

var util = require('util');
var fs = require('fs');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var _ = require('underscore.string');
var states = require('./states.json');
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

    prompts.push({
        name: 'viewTemplate',
        type: 'list',
        choices: states.view_templates,
        message: 'Choose state template :'
    });

    prompts = prompts.concat(config.questions);

    // Promtp all questions, if not on dummy mode.
    this.prompt(prompts, function (props) {
        global_ask.proccess_user_interactions(this, props);

        // fill context with user answers
        this.moduleName = _.underscored(props.moduleName);
        this.viewTemplate = props.viewTemplate;
        this.stateName = _.underscored(props.stateName);
        this.stateName = _.underscored(this.stateName);
        this.haveView = props.haveView;
        this.addToMenu = props.addToMenu;
        this.haveController = props.haveController;
        // ???
        this.slug = _.slugify(this.moduleName);
        this.validVariableName = _.capitalize(_.slugify(this.moduleName)).replace('-', '');
        this.fullName = [this.moduleName, this.stateName].join('_');
        this.menuLink = [this.moduleName, this.stateName].join('.');
        this.menuLink_underlined = [this.moduleName, this.stateName].join('_');
        this.menuLink_titleize = _.titleize(_.humanize(_.underscored([this.stateName, 'of', this.moduleName].join(' '))));

        //#region ask questions related to selected view template.
        if (!(states[this.viewTemplate] && states[this.viewTemplate].require_API)) return;

        this.prompt(states[this.viewTemplate].require_API, function (answers) {
            //global_fn.fill_generator_with_answers(this, props);
            this.search_action = (answers.search_action == '.') ? null : answers.search_action;
            this.add_action = (answers.add_action == '.') ? null : answers.add_action;
            this.edit_action = (answers.edit_action == '.') ? null : answers.edit_action;
            this.detail_action = (answers.detail_action == '.') ? null : answers.detail_action;
            this.delete_action = (answers.delete_action == '.') ? null : answers.delete_action;
            this.have_action = (answers.delete_action && answers.detail_action && answers.edit_action);
            done();
        }.bind(this));
        //#endregion
    }.bind(this));
};
AMSG.prototype.app = function app() {
    this.moduleName = _.underscored(this.moduleName);
    if (this.config.get(global.directory))
        this[global.directory] = this.config.get(global.directory);

    require('./create_file.js').execute(this);
    this.i18n = {
        "menu_link": [this.menuLink_titleize].join('.'),
        "new_item_modal": 'New ' + this.moduleName + ' Item',
        "items":  this.moduleName + 's',
        "item":  this.moduleName,
        "delete_item":'Delete ' + this.moduleName,
        "edit_item": 'Edit ' + this.moduleName
    }
    global_fn.add_message_to_language(this,this.moduleName);

    this.log('create files according your choose...');
};

AMSG.prototype.saveConfig = function saveConfig() {
    this.config.save();
};
