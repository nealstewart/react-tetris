var _ = require('lodash');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

var BlockModel = require('./block_model');
var LandOfBlocksStore = require('./land_of_blocks_store');

function PieceStore() {
	this.blocks = [
		new BlockModel(0, 0, 'red'),
		new BlockModel(0, 1, 'red'),
		new BlockModel(1, 0, 'red'),
		new BlockModel(2, 0, 'red')
	];
}
util.inherits(PieceStore, EventEmitter);

function moveDown(blocks) {
	return _.map(blocks, function(block) {
		return new BlockModel(block.x, block.y + 1, block.color);
	});
}

function isPastBoundary(blocks) {
	return _.any(blocks, function(b) {
		return b.y >= LandOfBlocksStore.height;
	});
}

PieceStore.prototype.tick = function() {
	var downBlocks = moveDown(this.blocks);

	if (this.canMoveDown(downBlocks)) {
		this.blocks = downBlocks;
		this.emit('change');

	} else {
		return;
		this.mergeWithLand();
	}
};

PieceStore.prototype.mergeWithLand = function() {
	this.blocks = [];
	LandOfBlocksStore.blocks = LandOfBlocksStore.concat(this.blocks);
};

PieceStore.prototype.canMoveDown = function(blocks) {
	return !isPastBoundary(blocks) && !LandOfBlocksStore.collides(blocks);
};

module.exports = new PieceStore();
