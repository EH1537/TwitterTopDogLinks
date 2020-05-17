// copy this file into the same directory, add your own keys and rename the file to secretsAndKeys.js
// keep in my secretsAndKeys.js is currently ignored by GIT
const TWITTER_TOKENS = {
  TWITTER_CONSUMER_KEY: "Filler",
  TWITTER_CONSUMER_SECRET: "Filler", 
  TWITTER_ACCESS_TOKEN: "Filler", 
  TWITTER_TOKEN_SECRET: "Filler" 
};

const CRYPTO = {
  CRYPTO_KEY: "your own 32 char string (keep it one word, lowercase, no numerics for easy typing",
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