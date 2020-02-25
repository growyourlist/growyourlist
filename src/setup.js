const gylInit = require('gyl-init');

const command = process.argv[1];
if (!(command === 'setup' || command === 'destruct')) {
	console.log('Must use growyourlist setup or growyourlist destruct');
	console.log(command);
	process.exit();
}

gylInit[command]();
