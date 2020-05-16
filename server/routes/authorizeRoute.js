const router = require("express").Router();
const passport = require("passport");
const clientHomeURL = "http://localhost:3437";
const Twitter = require('twit');
const secretsAndKeys = require("../secretConfig/secretsAndKeys")
const models = require("../models/userModel");

router.get("/login/success", (req, res) => {
  if (req.user) {
    console.log("login success")
    res.cookie('idNumber', req.user.twitterId)
    res.cookie('t', req.user.t)
    res.cookie('ts', req.user.ts)
    const { user } = req;
    const { cookies } = req;
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: user,
      cookies: cookies
    });
  }
});

// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
});

// When logout, redirect to client
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(clientHomeURL);
});

// auth with twitter
router.get("/twitter", passport.authenticate("twitter"));

// redirect to home page after successfully login via twitter
router.get("/twitter/redirect", passport.authenticate("twitter", {
    successRedirect: clientHomeURL,
    failureRedirect: "/auth/login/failed"
  })
);


//grab the tweets themselves
router.get("/tweets", (req, res, next) => {
  const { idNumber } = req.cookies
  const params = { /*user_id: idNumber,*/ count: 200 };
  const client = new Twitter({
    //another bad move, saving this token to a cookie for future ease of use when getting the tweets themselves
    access_token: req.cookies.t,
    access_token_secret: req.cookies.ts,
    consumer_secret: secretsAndKeys.TWITTER_CONSUMER_SECRET,
    consumer_key: secretsAndKeys.TWITTER_CONSUMER_KEY,
  });
  client.get('statuses/home_timeline', params)
    .then(tweets => {
      console.log("got tweets")
      models.Tweets.findOne({
        twitterId: idNumber
      })
        .then((currentTimeline) => {
          console.log('getting current timeline')
          if (!currentTimeline) {
            console.log('no timeline in DB')
            let Timeline = new models.Tweets({
              twitterId: idNumber,
              topTweets: tweets.data
            })
            console.log("made a TimeLine schema")
            Timeline.save()
              .then(document => {
                console.log("made a new TimeLine Doc, sending to Front")
                res.send(document);
              })
              .catch(err => {
                console.log(err)
                res.status(400).send("unable to save to database");
              });
          }
          else {
            console.log("already have Timeline, sending to Front")
            res.send(currentTimeline);
          }
        }).catch(error => {
          console.log(error)
          res.status(400).send("unable to save to database");
        })
    }).catch(error => {
      console.log(error)
      res.status(400).send("unable to save to database");
    })
})

module.exports = router;