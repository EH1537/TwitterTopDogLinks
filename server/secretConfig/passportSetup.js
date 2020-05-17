const passport = require("passport");
const TwitterStrategy = require("passport-twitter");
const secretsAndKeys = require("./secretsAndKeys");
const models = require("../models/userModel");
const crypto = require('crypto');

function encrypt(text) {
  let iv = crypto.randomBytes(16);
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretsAndKeys.CRYPTO_KEY), iv);
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize the cookieUserId to user in the database
passport.deserializeUser((id, done) => {
  models.User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(e => {
      done(new Error("Failed to deserialize an user"));
    });
});


passport.use(
  new TwitterStrategy(
    {
      consumerKey: secretsAndKeys.TWITTER_CONSUMER_KEY,
      consumerSecret: secretsAndKeys.TWITTER_CONSUMER_SECRET,
      callbackURL: "/auth/twitter/redirect"
    },
    async (token, tokenSecret, profile, done) => {
      //this is wrapped in a trycatch block since node hates unhandled promises
      try {
        //look for user, create a new on otherwise
        const currentUser = await models.User.findOne({
          twitterId: profile._json.id_str
        });
        // create new user if the database doesn't have this user

        //encrypting tokenSecret from twitter to be stored on database
        if (!currentUser) {
          tokenSecret = encrypt(tokenSecret)
          const newUser = await new models.User({
            name: profile._json.name,
            screenName: profile._json.screen_name,
            twitterId: profile._json.id_str,
            profileImageUrl: profile._json.profile_image_url,
            t: token,
            ts: tokenSecret
          }).save()
            .then((newUser) => {
              if (newUser) {
                console.log("made a new user for database")
                done(null, newUser);
              }
            }).catch((error) => {
              console.log(error)
            });
        }
        else {
          done(null, currentUser);
        }
      } catch (error) {
        console.log(error)
      }

    }
  )
);