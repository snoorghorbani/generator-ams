'use strict';

var util = require('util');
var fs = require('fs');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var http = require('http');
var chalk = require('chalk');
var _ = require('underscore.string');
var config = require('./config.json');
var global = require('../global.json');
var global_ask = require("../global_ask");

/**
 * Initialization Function.
 */
module.exports = function (generator) {
    var done = generator.async();
    http.get([generator.url, generator.metadata_list_route, generator.moduleName, generator.actionName].join('/'), function (response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            // Data reception is done, do whatever with it!
            generator.schema = JSON.stringify(JSON.parse(body || {}));
            require('./convert_schema.js')(generator);
            require('./create_file.js').execute(generator);

            done();
        });
    });
}