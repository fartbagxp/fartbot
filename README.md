# fartbot
A twitch bot for interacting with chat.

## Twitch Chat OAuth Password Generator

Go [here](http://twitchapps.com/tmi/) to get your oauth password.
Make sure you are logged into your bot's account, before generating it.

## Logging

Run this command on Windows to see the log output
```js
set DEBUG=twitch*
```

Run this command on MacOS or Linux
```js
export DEBUG=twitch*
```

## Updating Third Party Dependencies

-   `npm install --production`
-   `npm dedupe`
-   `npm shrinkwrap`
