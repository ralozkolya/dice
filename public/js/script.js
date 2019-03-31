$(init);

var app = {};

function init() {
	app.dice = $('.dice');
	app.buttons = $('.roll-btn');
	app.buttons.click(roll);
	retrieveRolls();
}

function roll() {
	displayRoll([app.rolls.shift(), app.rolls.shift()]);

	if (app.rolls.length < 100) {
		retrieveRolls();
	}

	if (app.rolls.length === 0) {
		app.buttons.attr('disabled', 'disabled');
	}
}

function displayRoll(roll) {
	$(app.dice[0]).css('background-position', (roll[0] / 5 * 100) + '% 0');
	$(app.dice[1]).css('background-position', (roll[1] / 5 * 100) + '% 0');
}

function retrieveRolls() {
	app.rolls = app.rolls || [];

	$.get('random.php', function(data) {
		if (Array.isArray(data)) {
			app.rolls = app.rolls.concat(data);
			app.buttons.removeAttr('disabled');
			app.buttons.html('Roll!');
		} else {
			console.error('Error retrieving rolls');
		}
	});
}