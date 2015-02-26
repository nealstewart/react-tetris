var React = require('react');
var LandOfBlocks = require('./land_of_blocks.jsx');
var Piece = require('./piece.jsx');

var Board = React.createClass({
	render: function() {
		return (
			<div className="board">
				<LandOfBlocks />
				<Piece />
			</div>
		);
	}
});

module.exports = Board;
