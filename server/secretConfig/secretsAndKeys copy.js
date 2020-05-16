// add your own keys and rename the file ot secretsAndKeys.js
const TWITTER_TOKENS = {
  TWITTER_CONSUMER_KEY: "Filler",
  TWITTER_CONSUMER_SECRET: "Filler", 
  TWITTER_ACCESS_TOKEN: "Filler", 
  TWITTER_TOKEN_SECRET: "Filler" 
};

const MONGO = {
  MONGO_URI: "Filler" 
};

const SESSION = {
  COOKIE_KEY: "Filler" 
};

const SECRETSKEYS = {
  ...TWITTER_TOKENS,
  ...MONGO,
  ...SESSION
};

module.exports = SECRETSKEYS;