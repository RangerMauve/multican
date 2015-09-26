"use strict";
var mainLoop = require("main-loop");
var Freezer = require("freezer-js");
var getBounds = require("bounding-client-rect");
var getOffset = require("mouse-event-offset");
var delegate = require("dom-delegate");
var flyd = require("flyd");
var uid = require("uid");

var render = require("./render");

var constants = require("./constants");
var maxSegments = constants.maxSegments;

var main = document.querySelector("svg");
var domEvents = delegate(main);

var store = new Freezer({
	segments: [{
		id: uid(),
		points: [
			[25, 25],
			[75, 25]
		]
	}, {
		id: uid(),
		points: [
			[25, 75],
			[75, 75]
		]
	}],
	players: [{
		name: "Mauve",
		position: [50, 50]
	}],
	currentSegment: {
		id: uid(),
		points: []
	},
	makingSegment: false
});

window.store = store;

var loop = mainLoop(store.get(), render, {
	create: require("virtual-dom/create-element"),
	diff: require("virtual-dom/diff"),
	patch: require("virtual-dom/patch")
});

store.on("update", function(state) {
	loop.update(state);
});

main.appendChild(loop.target);

var moves = flyd.stream();

domEvents.on("mousemove", moves);
domEvents.on("mousedown", startDrawing);
domEvents.on("mouseup", stopDrawing);
domEvents.on("mouseleave", stopDrawing);

moves.map(getPosition).map(handleUpdatePosition);

function getPosition(event) {
	var bounds = main.getBoundingClientRect();
	var offset = getOffset(event, {
		clientRect: bounds
	});

	var x = offset.x / bounds.width * 100;
	var y = offset.y / bounds.height * 100;

	return [x, y];
}

function handleUpdatePosition(position) {
	var makingSegment = store.get().makingSegment;
	store.get().players.set(0, {
		name: "Mauve",
		position: position
	});

	if (makingSegment)
		store.get()
		.currentSegment
		.points
		.push(position);
}

function startDrawing() {
	store.get().set({
		makingSegment: true
	});
}

function stopDrawing() {
	var state = store.get();

	var makingSegment = state.makingSegment;
	if (!makingSegment) return;

	var currentSegment = state.currentSegment.toJS();

	state.set({
		makingSegment: false,
		currentSegment: {
			id: uid(),
			points: []
		}
	});

	var segments = state.segments.push(currentSegment);
	while (segments.length > maxSegments)
		segments = segments.shift();
}
