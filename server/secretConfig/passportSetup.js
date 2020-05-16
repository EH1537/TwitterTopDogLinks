const passport = require("passport");
const TwitterStrategy = require("passport-twitter");
const secretsAndKeys = require("./secretsAndKeys");
const models = require("../models/userModel");

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
      //look for user, create a new on otherwise
      const currentUser = await models.User.findOne({
        twitterId: profile._json.id_str
      });
      // create new user if the database doesn't have this user

      //this is a MASSIVE NO NO, I am saving these tokens/token secrets as plain text on the database, rather than authenticating the proper 3-legged way.  This is a workaround in the interest of time
      //Likewise, these are stored as plain text, also a no no.
      if (!currentUser) {
        const newUser = await new models.User({
          name: profile._json.name,
          screenName: profile._json.screen_name,
          twitterId: profile._json.id_str,
          profileImageUrl: profile._json.profile_image_url,
          t: token,
          ts: tokenSecret
        }).save();
        if (newUser) {

          done(null, newUser);
        }
      }
      done(null, currentUser);
    }
  )
);