'use strict';

var irc = require("tmi.js");

var clientOptions = {
  // options: {
  //     debug: true
  // },
  connection: {
    cluster: "aws",
    reconnect: true,
  },
  // channels: [""]
};

var client = irc.client(clientOptions);

client.connect().then((data) => {
  console.log(data);
}).catch((err) => {
  console.log("ERR: " + err);
});

client.on("action", function(channel, user, message, self) {
  // Do your mysql stuff.
});

client.on("chat", function(channel, user, message, self) {
  // Do your mysql stuff.
  // console.info('Channel: ', channel);
  // console.info('User name: ', user.username);
  // console.info('User Id: ', user['user-id']);
  // console.info('Mod: ', user.mod);
  // console.info('User subscription: ', user.subscriber);
  // console.info('Message: ', message);
  console.info(user.username + ':', message);
});
