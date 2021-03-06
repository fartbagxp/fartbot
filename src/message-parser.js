'use strict';

const _ = require('lodash');
const config = require('./config');
const debug = require('debug');
const mtd = require('./mtd');

const logger = debug('twitch:bot:fartbot:parser');

const parser = {};

/**
 * This function scrapes out the important parts of the message from the bot.
 */
function parseBotMessage(message) {
  if(_.isNil(message) || _.isEmpty(message)) {
    return;
  }

  try {
    const pointRegex = /-?\d+/;
    const counterRegex = /\[(.*?)\]/;

    const points = message.match(pointRegex)[0];
    const counter = message.match(counterRegex)[1];

    logger('Matched: ', points, counter);

    if(_.isNil(points) || _.isNil(counter)) {
      logger('Cannot parse points and counters for message: ', message);
      return;
    }

    if(_.isNil(mtd.count[counter])) {
      mtd.count[counter] = parseInt(points);
    }

    else {
      mtd.count[counter] += parseInt(points);
    }

  } catch(e) {
    logger('Failed at parsing message: ', message);
  }
}

parser.parseLiveResponse = function(user, message) {

  // We only care about broadcaster or mod messages
  if(!user.mod && !_.startsWith(user['badges-raw'], 'broadcaster')) {
    return;
  }

  if(user.username === config.logThisUser) {
    logger(user.username + ':', message);

    parseBotMessage(message);
  } else {
    if(_.startsWith(message, '!')) {
      logger(user.username + '--', message);
    }
  }
};

parser.parseUpdateCount = function(user, message) {

  // We only care about broadcaster or mod messages
  if(!user.mod && !_.startsWith(user['badges-raw'], 'broadcaster')) {
    return;
  }

  try {
    if(_.isNil(message) || _.isEmpty(message)) {
      return;
    }

    const split = _.words(message);
    if(_.size(split) !== 3) {
      logger('Unable to parse update: ', message);
      return;
    }

    const counter = split[1];
    const points = parseInt(split[2]);

    mtd.count[counter] = points;

  } catch(e) {
    logger('Failed to update count: ', message);
  }
};

module.exports = parser;
