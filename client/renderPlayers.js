"use strict";
var svg = require("virtual-dom/virtual-hyperscript/svg");

module.exports = renderPlayers;

function renderPlayers(players) {
	return svg("g", {}, players.map(renderPlayer));
}

function renderPlayer(player) {
	var name = player.name;
	var position = player.position;
	var transform = "translate(" + position[0] + "," + position[1] + ")";

	return svg("g", {
		key: name,
		transform: transform
	}, [
		renderCursor(),
		renderName(name)
	]);
}

function renderCursor() {
	return svg("circle", {
		cx: 0,
		cy: 0,
		fill: "#A55FA6",
		r: 1
	});
}

function renderName(name) {
	return svg("text", {
		x: 0,
		y: -1,
		"text-anchor": "middle",
		"font-size": 2
	}, name);
}
