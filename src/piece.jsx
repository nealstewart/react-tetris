var React = require('react');
var Block = require('./block.jsx');
var PieceStore = require('./piece_store');
var addons = require('react-addons')

var Piece = React.createClass({
	initialState: function() {
		return {
			blocks: PieceStore.blocks
		};
	},

	componentWillMount: function() {
		PieceStore.addListener('change', this._update);
	},
	componentWillUnmount: function() {
		PieceStore.removeListener('change', this._update);
	},

	_update: function() {
		this.setState({
			blocks: PieceStore.blocks
		});
	},

	render: function() {
		var blocks = PieceStore.blocks.map(function(b) {
			return <Block key={b.id} block={b} />
		});

		return (
			<div className="piece">
				{blocks}
			</div>
		);
	}
});

module.exports = Piece;
