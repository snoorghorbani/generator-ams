'use strict';

var util = require('util');
var fs = require('fs');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var http = require('http');
var chalk = require('chalk');
var _ = require('underscore');
var config = require('./config.json');
var global = require('../global.json');
var global_ask = require("../global_ask");

/**
 * Initialization Function.
 */
module.exports = function (generator) {
    var schema = JSON.parse(generator.schema);
    var res = {};
    var sample;
    var property_model = function () {}
    for (var i = 0, item; item = schema[i]; i++) {
        var name = item.Name
        if (item.Type.toLowerCase() == "array") {
            sample = new property_model;
            update_schema_from_model(sample, item[0]);

            res[name] = [];
            res[name].push(sample);
            //this[i] = _.is.defined(sample.default) ? sample.default : "";
        }
            //else if (isObjectType(item)) {
            //    res[i] = {};
            //    for (var kk in item) {
            //        res[i][kk] = interperate(item[kk])
            //    }
            //}
        else {
            sample = new property_model
            update_schema_from_model(sample, item);

            res[name] = sample;
        }
    }
    generator.schema = JSON.stringify(res);
}

var update_schema_from_model = function (item, model) {
    if (model.IsRequired == true)
        item.IsRequired = model.IsRequired;
    if (model.Default != "")
        item.Default = model.Default;

    var type = '';
    if ('int32'.indexOf(model.Type.toLowerCase() > -1))
        type = "number";
    else if ('string'.indexOf(model.Type.toLowerCase() > -1)) {
        type = "";
    }
    if (type != '')
        item.Type = type;
}