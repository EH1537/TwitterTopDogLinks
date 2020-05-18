import React, { Component } from "react";

export default class Header extends Component {

  render() {
    let handleSignInClick = () => {
      // Authenticate using via passport api in the backend
      // Open Twitter login page
      // Upon successful login, a cookie session will be stored in the client
      window.open(`https://topdogtwitterlinks.herokuapp.com/auth/twitter`, "_self");
    };

    let handleLogoutClick = () => {
      // Logout using Twitter passport api
      // Set authenticated state to false in the HomePage
      window.open("https://topdogtwitterlinks.herokuapp.com/auth/logout", "_self");
      this.props.handleNotAuthenticated();
    };
    return (
      <ul className="menu">
        {this.props.authenticated ? (
          <button onClick={() => handleLogoutClick()}>Log Out</button>
        ) : (
        <div id="disclaimer">
          <button onClick={() => handleSignInClick()}>Log In</button>
          <h1>Hello, and Welcome to Twitter Top Dogs</h1>
          <h2>By logging in with Twitter, you grant access for this app to simply acquire and read tweets from your homepage</h2>
        </div>
          )}
      </ul>
    );
  }


}