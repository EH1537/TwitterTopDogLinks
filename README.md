# Tweet Top Dog

Tweet Top Dog or (TTDOG) is an app that utilizes Twitter OAuth to display and filter the home page of a consenting twitter account (yours when you log in).

## Installation

Clone repo to your own folder, install all dependancies and packages with 

```bash
npm install
```

## Configuration

Generate a .env and .env.development file at the root directory in order to populate all key variables  is a secretsAndKeys.js folder, these fields **must** be completed on your end for the app to function fully:
I recomend visiting Twitters [OAuth](https://developer.twitter.com/en/docs/basics/authentication/oauth-1-0a) page for more information on how to obtatin twitter's consume key for your app.

``` 
TESTER=
MONGO_URI=
CRYPTO_KEY=
TWITTER_CONSUMER_KEY=
TWITTER_CONSUMER_SECRET=
TWITTER_ACCESS_TOKEN=
TWITTER_TOKEN_SECRET=
PORT=
PROXYPORT=>IN DEV MODE THIS IS THE ADDRESS OF THE PROXY SERVER BY WEBPACK (http://localhost:3437), OTHERWISE http://localhost:3437 IN PRODUCTION
```
## Edditing and working within the app

A webpack dev server is set up for front end work, please ensure that you have callback urls for Twitter development set up for both your regular server (default port 3437) and the dev server (default 3434)

To run the dev server for front-end development, run:

```bash
npm run dev
```

After you're done, build the bundle with 
```bash
npm run build
```

To run server in production mode, use the command

```bash
npm run startdev
```

## Usage

To use, simply log in to Twitter with the Login button, and app will do the rest.

## License
No license