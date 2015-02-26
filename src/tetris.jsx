var React = require('react');
var Board = require('./board.jsx');
var Score = require('./score.jsx');
var NextPiece = require('./next_piece.jsx');

var Tetris = React.createClass({
	render: function() {
		return (
			<div className="tetris">
				<Board />
				<div className="menu">
					<Score />
					<NextPiece />
				</div>
			</div>
		);
	}
});

module.exports = Tetris;
