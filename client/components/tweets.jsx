import React from "react";

const Tweet = (props) => {

  let displayArr = [];
  if (props.data.user.location) {
    displayArr.push(<p>Location=>{props.data.user.location}</p>)
  }

  displayArr.push(<p>UserName=>{props.data.user.screen_name}</p>)
  displayArr.push(<p>Tweet=>{props.data.text}</p>)
  displayArr.push(<p>Favorites=> {props.data.favorite_count}</p>)
  displayArr.push(<p>Date=> {props.data.created_at}</p>)
  displayArr.push(<p>Retweets=>{props.data.retweet_count}</p>)
  if (props.data.entities.urls.length) {
    displayArr.push(<button className="visitBtn" onClick={() => window.open(`${props.data.entities.urls[0].url}`, '_blank')}> Visit Link</button>)
  }
  if (props.data.entities.media) {
    displayArr.push(<button className="visitBtn" onClick={() => window.open(`${props.data.entities.media[0].media_url}`, '_blank')}> Visit Media</button>)
  }
  return (
    <div className="singleTweetInfo">
      {displayArr}
    </div>
  ) 
}

export default Tweet