"use strict";
var Transform = require("stream").Transform;
var Clf = require("common-log-format");
var f = require("function-tools");
var util = require("util");
var view = require("./view");
var stats = require("./stats");

module.exports = function(options){
    var clf = new Clf(options);
    var statsView = new StatsView(options);
    clf.pipe(statsView);
    return clf;
};

function StatsView(options){
    if (!(this instanceof StatsView)) return new StatsView(options);
    options = options || {};
    Transform.call(this, options);
    this._buffer = "";
    this.throttledRender = f.throttle(view.render, { restPeriod: options.refreshRate || 500 });
}
util.inherits(StatsView, Transform);

StatsView.prototype._transform = function(chunk, enc, done){
    var input = chunk.toString();
    input = this._buffer + input;
    var matches = input.match(/\{.*?\}/g);
    if (matches){
        matches.forEach(function(json){
            var logObject = JSON.parse(json);
            stats.addBytes(logObject.bytes);
            stats.requests++;
            stats.addClient(logObject.remoteHost);
            stats.addResource(logObject.request.split(" ")[1], logObject.bytes);
        });
        this._buffer = input.replace(matches.join(""), "");
        this.throttledRender(stats);
    } else {
        this._buffer = input;
    }
    done();
};
