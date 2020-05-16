import Header from "./header";
import React, { Component } from "react";
import TweetDisplay from "./tweetDisplay";


export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      error: null,
      authenticated: false,
      tweetsGot: false,
      tweetsArr: []
    };
    this.handleNotAuthenticated = this.handleNotAuthenticated.bind(this);
    this.getTweets = this.getTweets.bind(this);
  }

  handleNotAuthenticated() {
    this.setState({ authenticated: false });
  };

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
        console.log(jsoned)
        this.setState({tweetsGot: true, tweetsArr:jsoned.topTweets})
      })
      .catch(error => {
        console.log(error)
        this.setState({tweetsGot: false})
      });
  }

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

  render() {
    return (
      <div>
        <Header
          authenticated={this.state.authenticated}
          handleNotAuthenticated={this.handleNotAuthenticated}
        />
        <div>
          {!this.state.authenticated ? (
            <h1>Welcome!</h1>
          ) : (
              <div>
                <h1>You have login succcessfully!</h1>
                <button onClick={() => this.getTweets()}>Get Tweets</button>
                <h2>Welcome {this.state.user.name}!</h2>
                {this.state.tweetsGot && <TweetDisplay tweetsArr = {this.state.tweetsArr} />}
              </div>
            )}
      </div>
      </div >
    );
  }


}