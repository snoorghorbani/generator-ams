'use strict';

var util = require('util');
var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var _ = require('underscore.string');
var __ = require('underscore');
var global = require("./global.json");
var jsonfile = require('jsonfile');
module.exports = {
    add_select_module_to_questions: function userInteractions(generator, prompts) {
        prompts.push({
            "name": 'moduleName',
            "type": 'rawlist',
            "choices": getDirectories('./' + generator.config.get(global.directory)),
            "message": 'Choose Module :'
        });
    },
    fill_generator_with_answers: function fill_generator_with_answers(generator, answers) {
        for (var k in answers) {
            if (__.isObject(answers[k])) {
                generator[k] = answers[k];
            }
            else {
                generator[k] = {
                    origin: answers[k],
                    camelize: _.camelize(answers[k]),
                    underscored: _.underscored(answers[k]),
                    titleize: _.titleize(_.humanize(_.underscored(answers[k]))),
                    paskalize: _.classify(answers[k])
                }
            };
        }
    },
    add_message_to_language: function add_message_to_language(generator) {
        var destinationRoot = generator.destinationRoot();
        for (var i in generator.i18n) {
            var temp = generator.i18n[i].split('.');
            var i18n = {
                path: temp.shift(),
                text: temp.join('.'),
            }
            var path = destinationRoot + '/languages/fa-IR/' + i18n.path + '.lang.json';
            var glossery = require(path);

            glossery[i18n.text] = (glossery[i18n.text]) ? glossery[i18n.text] : i18n.text;

            jsonfile.writeFile(path, glossery);
        }
    }
}

function getDirectories(srcpath) {
    return fs.readdirSync(srcpath).filter(function (file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
    function getDirectories(srcpath) {
        return fs.readdirSync(srcpath).filter(function (file) {
            return fs.statSync(path.join(srcpath, file)).isDirectory();
        });
    }
}
function dir(srcpath) {
    return fs.readdirSync(srcpath);
}