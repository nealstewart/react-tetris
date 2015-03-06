var _ = require('lodash');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

function LandOfBlocksStore() {
	this.blocks = [];
	this.width = 10;
	this.height = 20;
}
util.inherits(LandOfBlocksStore, EventEmitter);

LandOfBlocksStore.prototype.collides = function(blocks) {
	var that = this;
	return _.any(blocks, function(pieceB) {
		return _.find(that.blocks, function(landB) {
			return pieceB.collides(landB);
		});
	});
};

LandOfBlocksStore.prototype.merge = function(blocks) {
	this.blocks = this.blocks.concat(blocks);
	this.emit('change');
};

module.exports = new LandOfBlocksStore();
