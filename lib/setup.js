#!/usr/bin/env node
const gylInit = require('gyl-init');

// Gets the subcommand
let command = process.argv[process.argv.length - 1];

if (!(command === 'setup' || command === 'destruct')) {
	console.log('Must use `growyourlist setup` or `growyourlist destruct`');
	process.exit();
}
else {
	gylInit[command]();
}
