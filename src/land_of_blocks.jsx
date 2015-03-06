var React = require('react');
var Block = require('./block.jsx');
var LandOfBlocksStore = require('./land_of_blocks_store');

var LandOfBlocks = React.createClass({
	getInitialState: function() {
		return {
			blocks: LandOfBlocksStore.blocks
		};
	},

	componentWillMount: function() {
		LandOfBlocksStore.addListener('change', this._update);
	},
	componentWillUnmount: function() {
		LandOfBlocksStore.removeListener('change', this._update);
	},

	_update: function() {
		this.setState({
			blocks: LandOfBlocksStore.blocks
		});
	},

	render: function() {
		var blocks = this.state.blocks.map(function(b) {
			return <Block key={b.id} block={b} />
		});

		return (
			<div className="piece">
				{blocks}
			</div>
		);
	}
});

module.exports = LandOfBlocks;
