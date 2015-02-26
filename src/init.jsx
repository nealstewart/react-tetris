var React = require('react');
var Tetris = require('./tetris.jsx');

var Dispatcher = require('./dispatcher');

React.render(
	<Tetris />,
	document.getElementById('app')
);
