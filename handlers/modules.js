const fs = require('fs');
const chalk = require('chalk')
var AsciiTable = require('ascii-table')
var table = new AsciiTable()
table.setHeading('Modules', 'Stats').setBorder('|', '=', "0", "0")

module.exports = (client) => {
	fs.readdirSync('./modules/').filter((file) => file.endsWith('.js')).forEach((event) => {
		require(`../modules/${event}`);
  table.addRow(event.split('.js')[0], '✅')
  })
	console.log(chalk.greenBright(table.toString()))
};