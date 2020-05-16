# Tweet Top Dog

Tweet Top Dog or (TTDOG) is an app that utilizes Twitter OAuth to display and filter the home page of a consenting twitter account (yours when you log in).

## Installation

Clone repo to your own folder, install all dependancies and packages with 

```bash
npm install
```

To run the program, simply type 
```bash
npm start
```

## Configuration

Within the /server/secretConfig is a secretsAndKeys.js folder, these fields **must** be completed on your end for the app to function fully.:
I reccomend visiting Twitters [OAuth](https://developer.twitter.com/en/docs/basics/authentication/oauth-1-0a) page for more information on how to obtatin twitter's consume key for your app.

``` js
const TWITTER_TOKENS = {
  TWITTER_CONSUMER_KEY: "Filler"
  TWITTER_CONSUMER_SECRET: "Filler" 
  TWITTER_ACCESS_TOKEN: "Filler" 
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
```
## Edditing and working within the app

A webpack dev server is set up for front end work, and has issues with proxying a localhost:8080 serving the bundle from Memory and twitter's oauth.  The dev server is set to write to disk.  
This allows hot reloading, but you'll see the Dist folder fill with temporary hot-update files as you edit/update the code.  
Please regularly delete all files within the dist directory aside from Bundle and Index.hmtl.

To run the dev server for front-end development, run:

```bash
npm run dev
```

## Usage

To use, simply log in to Twitter with the Login button, and app will do the rest.

## License
No license