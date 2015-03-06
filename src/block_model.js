var _ = require('lodash');

function BlockModel(x, y, color, id) {
	this.id = id || _.uniqueId();
	this.x = x;
	this.y = y;
	this.color = color;
}

BlockModel.prototype.collides = function(b) {
	return b.x == this.x && b.y == this.y;
};

BlockModel.prototype.right = function() {
	return new BlockModel(this.x + 1, this.y, this.color, this.id);
};

BlockModel.prototype.left = function() {
	return new BlockModel(this.x - 1, this.y, this.color, this.id);
};

BlockModel.prototype.down = function() {
	return new BlockModel(this.x, this.y + 1, this.color, this.id);
};

module.exports = BlockModel;
