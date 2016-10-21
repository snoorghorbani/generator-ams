'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var _ = require('underscore.string');

var global = require("./global.json");

module.exports = {
    define_questions: function userInteractions(generator) {
        // Have Yeoman greet the user.
        generator.log(yosay('Welcome to the Angular Modular Structure(AMS) generator!'));
        generator.log(chalk.blue.bgRed.bold('Lets Rock!!!'));

        var prompts = [];

        /**
         * at the first run of generator
         * ask for some strunture parameter
         * like:
         * directory : place that module directory save there.
         */
        if (!generator.config.get(global.directory))
            prompts.push({
                name: global.directory,
                message: "Enter your modules directory?",
                "default": "Client"
            });

        if (!generator.config.get("postGuplTask"))
            prompts.push({
                name: "postGuplTask",
                default:"js_app",
                message: "Enter Gulp Task that you want to run after done?"
            });
        if (!generator.config.get("metadata_list_route"))
            prompts.push({
                name: "metadata_list_route",
                message: "Enter action route for get metadata list?"
            });
        if (!generator.config.get("url"))
            prompts.push({
                name: "url",
                message: "Enter site develpement URL?"
            });
        if (!generator.config.get("main_module"))
            prompts.push({
                name: "main_module",
                default:"states",
                message: "Enter the main module name for injecet generated module to that?"
            });
        if (!generator.config.get("languages_directory"))
            prompts.push({
                name: "languages_directory",
                default:"\\public\\languages",
                message: "Enter the main module name for injecet generated module to that?"
            });

        return prompts
    },
    proccess_user_interactions: function (generator, answers) {
        var global_properties = ["directory", "metadata_list_route", "url", "postGuplTask", "main_module", "languages_directory"];
        for (var i = 0, item; item = global_properties[i]; i++) {
            if (answers[item]) {
                generator.config.set(item, answers[item]);
            }
            generator[item] = generator.config.get(item);
        }
    }
}
