var _ = require('lodash');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

var BlockModel = require('./block_model');
var PieceModel = require('./piece_model');
var LandOfBlocksStore = require('./land_of_blocks_store');

var TETRIMINOS = {
	I: function() {
		return new PieceModel([
			new BlockModel(0, 0, 'cyan'),
			new BlockModel(1, 0, 'cyan'),
			new BlockModel(2, 0, 'cyan'),
			new BlockModel(3, 0, 'cyan')
		]);
	},
	L: function(color) {
		return new PieceModel([
			new BlockModel(0, 0, 'orange'),
			new BlockModel(0, 1, 'orange'),
			new BlockModel(1, 0, 'orange'),
			new BlockModel(2, 0, 'orange')
		]);
	},
	J: function(color) {
		return new PieceModel([
			new BlockModel(0, 0, 'blue'),
			new BlockModel(2, 1, 'blue'),
			new BlockModel(1, 0, 'blue'),
			new BlockModel(2, 0, 'blue')
		]);
	}
};

var ORIGIN = {
	x: 5,
	y: 0
};

function getPiece() {
	var i = Math.floor(Math.random() * Object.keys(TETRIMINOS).length);
	var piece = _.values(TETRIMINOS)[i]()
	piece.add(ORIGIN);
	return piece;
}

function PieceStore() {
	this.piece = getPiece()
}
util.inherits(PieceStore, EventEmitter);

function isPastBoundary(blocks) {
	return _.any(blocks, function(b) {
		return b.y > LandOfBlocksStore.height + 1 || b.x < 0 || b.x > LandOfBlocksStore.width;
	});
}

PieceStore.prototype.commitIfPossible = function(piece) {
	if (!this.canMove(piece.blocks)) {
		return false;
	}

	this.piece = piece;
	this.emit('change');

	return true;
}

PieceStore.prototype.rotate = function() {
	this.commitIfPossible(this.piece.rotate());
};

PieceStore.prototype.down = function() {
	var downPiece = this.piece.moveDown();

	if (this.commitIfPossible(downPiece)) {
		return true; 

	} else {
		this.mergeWithLand();
		this.emit('change');

		return false;
	}
};
PieceStore.prototype.tick = PieceStore.prototype.down;

PieceStore.prototype.drop = function() {
	while (this.down()) {
	}
};

PieceStore.prototype.right = function() {
	this.commitIfPossible(this.piece.moveRight());
};

PieceStore.prototype.left = function() {
	this.commitIfPossible(this.piece.moveLeft());
};

PieceStore.prototype.rotate = function() {
	this.commitIfPossible(this.piece.rotate());
};

PieceStore.prototype.mergeWithLand = function() {
	LandOfBlocksStore.merge(this.piece.blocks);
	this.piece = getPiece();
};

PieceStore.prototype.canMove = function(blocks) {
	return !isPastBoundary(blocks) && !LandOfBlocksStore.collides(blocks);
};

module.exports = new PieceStore();
