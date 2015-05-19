"use strict";

var ansi = require("ansi-escape-sequences");

module.exports = function(handlebars){
    handlebars.registerHelper("ansi-underline", function(input){
        return ansi.sgr.format(input, "underline");
    });
};
