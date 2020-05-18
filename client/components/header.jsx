import React, { Component } from "react";

export default class Header extends Component {

  render() {
    let handleSignInClick = () => {
      // Authenticate using via passport api in the backend
      // Open Twitter login page
      // Upon successful login, a cookie session will be stored in the client
      window.open(`auth/twitter`, "_self");
    };

    let handleLogoutClick = () => {
      // Logout using Twitter passport api
      // Set authenticated state to false in the HomePage
      window.open("auth/logout", "_self");
      this.props.handleNotAuthenticated();
    };
    return (
      <div className="menu">
        {this.props.authenticated ? (
          <button className = "logInOrOut" onClick={() => handleLogoutClick()}>Log Out</button>
          
        ) : (
            <div id="disclaimer">
              <button className = "logInOrOut" onClick={() => handleSignInClick()}>Log In</button>
              <h1>Hello, and Welcome to Twitter Top Dogs</h1>
              <h2>By logging in with Twitter, you grant access for this app to simply acquire and read tweets from your homepage</h2>
            </div>
          )}
      </div>
    );
  }


}