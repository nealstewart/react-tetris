var _ = require('lodash');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

var TICK_INTERVAL = 1000;

function Tick() {
	this.intervalId = null;
}
util.inherits(Tick, EventEmitter);

Tick.prototype.start = function() {
	var that = this;
	this.intervalId = setInterval(function() {
		that.emit('tick');
	}, TICK_INTERVAL)
};

Tick.prototype.stop = function() {
	clearInterval(this.intervalId);
};

module.exports = Tick;
