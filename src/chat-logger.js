'use strict';

const _ = require('lodash');
const config = require('./config');
const debug = require('debug');
const irc = require('tmi.js');
const mtd = require('./mtd');
const parser = require('./message-parser');

const logger = debug('twitch:bot:fartbot');

const clientOptions = {
  // options: {
  //     debug: true
  // },
  connection: {
    cluster: 'aws',
    reconnect: true,
  },
  identity: {
    username: config.username,
    password: config.password
  },
  channels: [config.channel]
};

const client = irc.client(clientOptions);

client.connect().then(function (data) {
  logger(data);
}).catch(function (err) {
  logger('ERR: ' + err);
});

client.on('logon', function () {
  client.say(config.channel, 'hello');
});

client.on("action", function (channel, userstate, message, self) {
    if (self) {
      return;
    }

    parser.updateCount(userstate, message);
});

client.on('chat', function (channel, user, message, self) {

  // Don't bother catching your own messages
  if (self) {
    return;
  }

  // If it's a special command, listen to it, and reply
  if (message === '!!count') {
    let message = '';
    _.forEach(mtd.count, function(value, key) {
      message += key + ':' + value;
    });

    client.say(config.channel, message);
    return;
  }

  // Attempt to update the count with the message
  parser.updateCount(user, message);

  // console.info('Channel: ', channel);
  // console.info('User name: ', user.username);
  // console.info('User Id: ', user['user-id']);
  // console.info('Mod: ', user.mod);
  // console.info('User subscription: ', user.subscriber);
  // console.info('Message: ', message);
  // logger(user.username + ':', message);
});
