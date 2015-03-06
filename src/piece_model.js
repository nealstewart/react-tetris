var _ = require('lodash');
var BlockModel = require('./block_model');

function PieceModel(blocks, origin) {
	this.id = _.uniqueId();
	this.blocks = blocks;
}

PieceModel.prototype.add = function(point) {
	_.each(this.blocks, function(b) {
		b.x += point.x;
		b.y += point.y;
	});
};

PieceModel.prototype.moveDown = function() {
	return new PieceModel(_.map(this.blocks, function(block) {
		return new BlockModel(block.x, block.y + 1, block.color);
	}));
};

PieceModel.prototype.moveRight = function() {
	return new PieceModel(_.map(this.blocks, function(block) {
		return new BlockModel(block.x + 1, block.y, block.color);
	}));
};

PieceModel.prototype.moveLeft = function() {
	return new PieceModel(_.map(this.blocks, function(block) {
		return new BlockModel(block.x - 1, block.y, block.color);
	}));
};

PieceModel.prototype.rotate = function() {
	
};

module.exports = PieceModel;
