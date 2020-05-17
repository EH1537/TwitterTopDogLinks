import React, { Component } from "react";

export default class Header extends Component {

  render() {
    let handleSignInClick = () => {
      // Authenticate using via passport api in the backend
      // Open Twitter login page
      // Upon successful login, a cookie session will be stored in the client
      window.open("http://localhost:3437/auth/twitter", "_self");
    };

    let handleLogoutClick = () => {
      // Logout using Twitter passport api
      // Set authenticated state to false in the HomePage
      window.open("http://localhost:3437/auth/logout", "_self");
      this.props.handleNotAuthenticated();
    };
    return (
      <ul className="menu">
        {this.props.authenticated ? (
          <button onClick={() => handleLogoutClick()}>Log Out</button>
        ) : (
            <button onClick={() => handleSignInClick()}>Log In</button>

          )}
      </ul>
    );
  }


}