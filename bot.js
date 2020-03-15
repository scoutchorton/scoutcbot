var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
	colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
	token: auth.token,
	autorun: true
});
bot.on('ready', function (evt) {
	logger.info('Connected');
	logger.info('Logged in as: ');
	logger.info(bot.username + ' - (' + bot.id + ')');
});

//Time
function formatAMPM(date) {
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;
	return strTime;
}

bot.on('message', function (user, userID, channelID, message, event) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ').splice(1);
        var cmd = message.substring(1).split(' ')[0];

        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
    	        break;
	    case 'scout':
			if(args[0]==='time'){
				bot.sendMessage({
					to: channelID,
					message: 'Current server time is: ' + formatAMPM(new Date())
				});
			}else if(args[0]==='ip'){
				bot.sendMessage({
					to: channelID,
					message: 'IP: scoutchorton.io\nPort: 19132'
				});
			}else if(args[0]==='cat'){
				bot.uploadFile({
					to: channelID,
					file: './images/cat.jpg',
					message: 'Judgemental cat is judging you for waking the beast...'
				});
			}else{
				bot.sendMessage({
					to: channelID,
					message: 'What did you want me to do?'
				});
			}
			break;
	    default:
			bot.sendMessage({
			    to: channelID,
			    message: 'Unknown command: '+cmd
			});
		}
	}
});
