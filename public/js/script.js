var app = {};

function init() {
	app.dice = $('.dice');
	app.buttons = $('.roll-btn');
	app.buttons.click(roll);
	app.sides = $('#sides');
	app.sideCount = 6;
	app.diceCount = 2;
	retrieveRolls();
}

function roll() {

	app.buttons.attr('disabled', 'disabled');

	showFakeRolls(function () {

		displayRoll([app.rolls.shift(), app.rolls.shift()]);

		if (app.rolls.length) {
			app.buttons.removeAttr('disabled');
		}
	});

	if (app.rolls.length < 100) {
		retrieveRolls();
	}
}

function displayRoll(roll) {

	var x1 = roll[0] % 4 / 3 * 100;
	var y1 = Math.floor(roll[0] / 4) / 4 * 100;
	var x2 = roll[1] % 4 / 3 * 100;
	var y2 = Math.floor(roll[1] / 4) / 4 * 100;

	$(app.dice[0]).css(
		'background-position', x1 + '% ' + y1 + '%'
	);

	$(app.dice[1]).css(
		'background-position', x2 + '% ' + y2 + '%'
	);
}

function retrieveRolls() {
	app.rolls = app.rolls || [];

	$.get('/api/random', { sides: app.sideCount }, function(data) {
		app.rolls = app.rolls.concat(data);
		app.buttons.removeAttr('disabled');
		app.buttons.html('Roll!');
		app.retries = 0;
	}).fail(function(e) {
		setTimeout(retrieveRolls, getTimeout());
	});
}

function getTimeout() {
	app.retries = app.retries || 1;
	return Math.min(app.retries++, 10) * 1000;
}

function showFakeRolls(cb) {

	var fakeRolls = getFakeRolls();

	function show () {

		if (fakeRolls.length) {
			setTimeout(show, 100);
		} else {
			return cb();
		}

		displayRoll([fakeRolls.pop(), fakeRolls.pop()]);
	}

	setTimeout(show, 100);
}

function getFakeRolls() {
	var rolls = [];
	for (var i = 0; i < 8 * app.diceCount; i++) {
		rolls.push(Math.floor(Math.random() * app.sideCount));
	}
	return rolls;
}

init();