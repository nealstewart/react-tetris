var _ = require('lodash');

function BlockModel(x, y, color) {
	this.id = _.uniqueId();
	this.x = x;
	this.y = y;
	this.color = color;
}

BlockModel.prototype.collides = function(b) {
	return b.x == this.x && b.y == this.y;
};

module.exports = BlockModel;
