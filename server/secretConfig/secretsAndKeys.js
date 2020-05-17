//be sure to fill in your own .env at the root directory
const path = require('path');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '.env.development' });
}
else {
    require('dotenv').config();
}

console.log("node env file", process.env.TESTER)


const PORTS = {
  PORT: process.env.PORT,
  PROXY_PORT: process.env.PROXYPORT,
};

const TWITTER_TOKENS = {
  TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET,
  TWITTER_ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN,
  TWITTER_TOKEN_SECRET: process.env.TWITTER_TOKEN_SECRET
};

const CRYPTO = {
  CRYPTO_KEY: process.env.CRYPTO_KEY,
};

const MONGO = {
  MONGO_URI: process.env.MONGO_URI
};

const SESSION = {
  COOKIE_KEY: "testing123"
};

const SECRETSKEYS = {
  ...PORTS,
  ...TWITTER_TOKENS,
  ...CRYPTO,
  ...MONGO,
  ...SESSION
};

module.exports = SECRETSKEYS; 