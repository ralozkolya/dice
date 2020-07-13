$(init);

var app = {};

function init() {
	app.dice = $('.dice');
	app.buttons = $('.roll-btn');
	app.buttons.click(roll);
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
	$(app.dice[0]).css('background-position', (roll[0] / 5 * 100) + '% 0');
	$(app.dice[1]).css('background-position', (roll[1] / 5 * 100) + '% 0');
}

function retrieveRolls() {
	app.rolls = app.rolls || [];

	$.get('/api/random', function(data) {
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
	for (var i = 0; i < 16; i++) {
		rolls.push(Math.floor(Math.random() * 6));
	}
	return rolls;
}