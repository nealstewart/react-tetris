var _ = require('lodash');

function BlockModel(x, y, color) {
	this.id = _.uniqueId();
	this.x = x;
	this.y = y;
	this.color = color;
}

module.exports = BlockModel;
