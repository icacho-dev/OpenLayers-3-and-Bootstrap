"use strict";
var dope = require("console-dope");
var byteSize = require("byte-size");
var boil = require("boil");
var fs = require("fs");
var path = require("path");
var ansi = require("ansi-escape-sequences");

exports.render = render;

var visible = false;
var template = fs.readFileSync(path.resolve(__dirname, "..", "template", "view.hbs"), "utf8");
var compiled = boil.compile(template);
var previouslyRenderedLines = 0;

function render(stats){
    stats = addLayoutData(stats);
    var rendered = compiled(stats);
    
    if (visible) {
        dope.cursorLinesUp(previouslyRenderedLines + (process.platform === "win32" ? 1 : 0));
    } else {
        visible = true;
    }
    dope.clearToScreenEnd();
    var lines = rendered.split("\n");

    previouslyRenderedLines = 0;
    for (var i = 0; i < lines.length && i < (process.stdout.rows - 1); i++){
        console.log(lines[i]);
        previouslyRenderedLines++;
    }
}

function addLayoutData(stats){
    var cols = process.stdout.columns;
    stats.table3 = { col1: {}, col2: {}, col3: {} };

    stats.table3.col2.header = ansi.sgr.format("Requests", "underline");
    stats.table3.col2.headerWidth = stats.table3.col2.header.length + 1;
    stats.table3.col2.width = "Requests".length + 1;

    stats.table3.col3.header = ansi.sgr.format("Transferred", "underline");
    stats.table3.col3.headerWidth = stats.table3.col3.header.length + 1;
    stats.table3.col3.width = "Transferred".length + 1;

    stats.table3.col1.header = ansi.sgr.format("Resource", "underline");
    stats.table3.col1.width = cols - stats.table3.col2.width - stats.table3.col3.width;
    stats.table3.col1.headerWidth = stats.table3.col1.width + ansi.sgr.format("", "underline").length;
    stats.table3.col1.clipLeft = stats.table3.col1.width - 2;
    return stats;
}
