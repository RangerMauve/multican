"use strict";
var svg = require("virtual-dom/virtual-hyperscript/svg");

var constants = require("./constants");
var maxSegments = constants.maxSegments;

module.exports = renderSegments;

function renderSegments(segments) {
	return svg("g", {}, segments.map(renderSegment));
}

function renderSegment(segment, index, all) {
	var points = segment.points;
	var path = makePath(points)
	var id = segment.id;

	var options = {
		key: id,
		d: path,
		stroke: "#A55FA6",
		"stroke-opacity": makeOpacity(index, all.length),
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		fill: "none"
	};

	return svg("path", options);
}

function makeOpacity(index, length) {
	return (maxSegments - (length - index)) / maxSegments;
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
