var Tick = require('./tick');
var PieceStore = require('./piece_store');

function Dispatcher() {
	this.tick = new Tick();
	this.tick.start();

	this.tick.on('tick', function() {
		PieceStore.tick();
	});
}

module.exports = new Dispatcher();
