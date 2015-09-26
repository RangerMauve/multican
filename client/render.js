"use strict";
var svg = require("virtual-dom/virtual-hyperscript/svg");

var renderSegments = require("./renderSegments");
var renderPlayers = require("./renderPlayers");
var renderCurrent = require("./renderCurrent");

module.exports = render;

function render(data) {
	return svg("g", [
		renderSegments(data.segments),
		renderCurrent(data.currentSegment, data.makingSegment),
		renderPlayers(data.players)
	]);
}
