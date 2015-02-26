var React = require('react');

var BLOCK_WIDTH = 20;

var Block = React.createClass({
	render: function() {
		var block = this.props.block;
		var style = {
			top: BLOCK_WIDTH * block.y,
			left: BLOCK_WIDTH * block.x,
			backgroundColor: block.color
		};

		return (
			<div className="block" style={style}></div>
		);
	}
});

module.exports = Block;
