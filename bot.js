var irc = require('irc');
var commands = require('./commands');
var config = require('./config').config;

var client = new irc.Client(config.twitchHost, config.botLogin, {

	port: config.twitchPort,
	userName: config.botLogin,
	realName: config.botLogin,
	password:config.botOAuth,
	channels: [config.botChannel],
	secure: false,
	sasl: false,
	autoConnect: false
});

client.addListener('message', function(from, to, message){

	if(message.charAt(0) == "!"){

		var response = commands.execute(from, message);

		if(response != undefined){

			client.say(config.botChannel, response);
		}		
	}
});

client.addListener('error', function(message){

});

client.connect(function(message){

	console.log("Connected");
});