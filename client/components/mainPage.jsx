import Header from "./header";
import React, { Component } from "react";
import TweetDisplay from "./tweetDisplay";
import ModalPortal from "./modalPortal";


export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      error: null,
      authenticated: false,
      tweetsGot: false,
      renderModal: false,
      tweetsFromDB: [],
      filteredTweets: [],
      topUsers: {},
      topDomains: {}
    };
    this.handleNotAuthenticated = this.handleNotAuthenticated.bind(this);
    this.getTweets = this.getTweets.bind(this);
    this.filterByHash = this.filterByHash.bind(this);
    this.resetFilters = this.resetFilters.bind(this)
    this.filterByTime = this.filterByTime.bind(this)
    this.filterByLocation = this.filterByLocation.bind(this)
    this.displayModal = this.displayModal.bind(this)
  }

  handleNotAuthenticated() {
    this.setState({ authenticated: false });
    return
  };

  componentDidMount() {
    // Fetch does not send cookies. So add credentials: 'include'
    fetch("http://localhost:3437/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    }).then(response => {
      if (response.status === 200) return response.json();
      throw new Error("Failed to authenticate user");
    }).then(responseJson => {
      this.setState({
        authenticated: true,
        user: responseJson.user
      });
    }).catch(error => {
      this.setState({
        authenticated: false,
        error: "Failed to authenticate user"
      });
    });
  }

  getTweets() {
    fetch("http://localhost:3437/auth/tweets", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then((jsoned) => {
        console.log(jsoned.topTweets)
        let tweetsFromDB = jsoned.topTweets
        this.filterByTime(jsoned.topTweets)
        this.setState({
          tweetsFromDB: tweetsFromDB,
          tweetsGot: true,
        })
      })
      .catch(error => {
        console.log(error)
        this.setState({ tweetsGot: false })
      });
    return
  }

  filterByTime(tweets) {
    function toTimeStamp(strDate) {
      let datum = Date.parse(strDate);
      return datum;
    }
    let topUsers = {}
    let topDomains = {}
    tweets.forEach((tweet) => {
      if (tweet.entities.urls.length) {
        let begin = 0
        let end = 0
        let first = true
        //for loop to slice out the domain, and example of this would be www.google.com or twitter.com
        for (let i = 0; i < tweet.entities.urls[0].expanded_url.length; i++) {
          if (first) {
            if (tweet.entities.urls[0].expanded_url[i] + tweet.entities.urls[0].expanded_url[i - 1] == "//") {
              begin = i + 1
              first = false
            }
          }
          else {
            if (tweet.entities.urls[0].expanded_url[i] == "/") {
              end = i
              break
            }
          }
        }
        let domain = tweet.entities.urls[0].expanded_url.slice(begin, end)
        let userName = tweet.user.screen_name
        //load up top users object, the key being user name, the value being number of times they've posted a link
        topDomains.hasOwnProperty(domain) ? topDomains[domain] += 1 : topDomains[domain] = 1
        topUsers.hasOwnProperty(userName) ? topUsers[userName] += 1 : topUsers[userName] = 1
      }
    })

    //this is filtering for the last 24 hours, rather than last week, stil need to get timezones fixed
    //to filter out to the last 7 days, change the 1 to a 7
    let lastDay = (Date.now() - 1 * 24 * 60 * 60 * 1000)
    let fTweets = tweets.filter((tweet) => {
      return (toTimeStamp(tweet["created_at"]) > lastDay)
    })

    this.setState({
      filteredTweets: fTweets,
      topUsers: topUsers,
      topDomains: topDomains
    })
    return
  }

  filterByHash() {
    let hashT = prompt("Enter a hashtag", "#UnexpectedlyGood");
    if (!hashT || hashT == null) {
      return
    }
    hashT = hashT.toLowerCase();
    if (hashT[0] == "#") {
      hashT = hashT.slice(1)
    }
    let filteredHashTweets = this.state.tweetsFromDB.filter((tweet) => {
      if (tweet.entities.hashtags.length) {
        for (let hashtagObj of tweet.entities.hashtags) {
          if (hashtagObj.text.toLowerCase() == hashT) {
            return tweet
          }
        }
      }
    })
    console.log(filteredHashTweets)
    this.filterByTime(filteredHashTweets)
    console.log(hashT)
    return
  }

  filterByLocation() {
    let location = prompt("Enter a Location", "Cleveland, OH");
    let commaId = 0
    if (!location || location == null) {
      return
    }
    location = location.toLowerCase();
    for (let i = 0; i < location.length; i++) {
      if (location[i] == ',') {
        commaId = i
        location = location.slice(0, commaId)
        break
      }
    }
    //this a very rudimentary search, requires that you get the spelling right and fill out all the town name up to the , before the state
    let filteredLocationTweets = this.state.tweetsFromDB.filter((tweet) => {
      if (tweet.user.location) {
        let searchLoc = tweet.user.location.toLowerCase()
        if (commaId == 0) {
          for (let i = 0; i < searchLoc.length; i++) {
            if (searchLoc[i] == ',') {
              commaId = i
              searchLoc = searchLoc.slice(0, commaId)
              console.log(searchLoc)
              breakm
            }
          }
          if (location == searchLoc) {
            return tweet
          }
          else {
            commaId = 0
          }
        }
        else {
          if (location == searchLoc.slice(0, commaId)) {
            return tweet
          }
        }
      }
    })
    console.log(filteredLocationTweets)
    this.filterByTime(filteredLocationTweets)
    return
  }


  resetFilters() {
    this.filterByTime(this.state.tweetsFromDB)
    return
  }

  displayModal() {
    let renderModal = !this.state.renderModal
    console.log("rendering modal")
    this.setState({ renderModal: renderModal })
    return
  }

  render() {
    return (
      <div>
        <Header
          authenticated={this.state.authenticated}
          handleNotAuthenticated={this.handleNotAuthenticated}
        />
        <div>
          {!this.state.authenticated ? (
            <h1>Please Sign In</h1>
          ) : (
              <div>
                <h2>Welcome {this.state.user.name}!</h2>
                <div className="outerMenu">

                  {!this.state.tweetsGot && <button onClick={() => this.getTweets()}>Get Tweets</button>}
                  <br></br>
                  {this.state.tweetsGot &&
                    <div className="tweetBlock">
                      <div className="innerMenu">
                        <button onClick={() => this.filterByHash()}>Filter By Hashtag</button>
                        <button onClick={() => this.filterByLocation()}>Filter By Location</button>
                        <button onClick={() => this.displayModal()}>Display Top Data</button>
                        <button onClick={() => this.resetFilters()}>Reset Filters</button>
                      </div>

                      <TweetDisplay filteredTweets={this.state.filteredTweets} />
                    </div>}
                </div>
              </div>
            )}
        </div>
        <ModalPortal
          topDomains={this.state.topDomains}
          topUsers={this.state.topUsers}
          renderModal={this.state.renderModal}
          displayModal={this.displayModal}
        />
      </div >
    );
  }


}