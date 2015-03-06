var Tick = require('./tick');
var PieceStore = require('./piece_store');

function Dispatcher() {
	this.tick = new Tick();
	this.tick.start();

	this.tick.on('tick', function() {
		PieceStore.tick();
	});

	document.body.addEventListener('keydown', function(evt) {
		if (evt.which === 39) {
			PieceStore.right();
		} else if (evt.which === 37) {
			PieceStore.left();
		} else if (evt.which === 40) {
			PieceStore.down();
		} else if (evt.which === 38) {
			PieceStore.rotate();
		} else if (evt.which === 32) {
			PieceStore.drop();
		}
	});
}

module.exports = new Dispatcher();
