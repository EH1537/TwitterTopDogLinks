const mongoose = require('mongoose');
const { MONGO_URI } = require("../secretConfig/secretsAndKeys");

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'users'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));


const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  screenName: String,
  twitterId: String,
  profileImageUrl: String,
  t: String,
  ts: String,
});

const tweetsSchema = new Schema({
  twitterId: String,
  createdAt: { type: Date, expires: 3600, default: Date.now },
  topTweets: Object,
});

const User = mongoose.model('user', userSchema);
const Tweets = mongoose.model('tweets', tweetsSchema);

module.exports = {
  User,
  Tweets
}