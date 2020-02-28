#!/usr/bin/env node
const gylInit = require('gyl-init');

// Gets the subcommand to run when run globally.
let command = process.argv[1];

// Gets the subcommand to run when run with npx growyourlist <subcommand>
if (command === 'growyourlist') {
	command = process.argv[2];
}
if (!(command === 'setup' || command === 'destruct')) {
	console.log('Must use `growyourlist setup` or `growyourlist destruct`');
	process.exit();
}

gylInit[command]();
