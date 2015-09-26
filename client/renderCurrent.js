"use strict";
var svg = require("virtual-dom/virtual-hyperscript/svg");

module.exports = renderCurrent;

function renderCurrent(segment, showing) {
	if (!showing) return svg("g");
	return renderSegment(segment);
}

function renderSegment(segment) {
	var points = segment.points;
	var path = makePath(points);

	var options = {
		d: path,
		stroke: "#A55FA6",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		fill: "none"
	};

	return svg("path", options);
}

function makePath(points) {
	if (!points.length) return "";
	var first = points[0];
	var remaining = points.slice(1);

	return "M " +
		first[0] +
		" " +
		first[1] +
		" " +
		(remaining.map(renderRemaining)
			.join(" "));
}

function renderRemaining(point) {
	return "L " + point[0] + " " + point[1];
}
