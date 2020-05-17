import React from "react";
import Tweet from "./tweets"

const TweetDisplay = (props) => {

  let lastWeek = (Date.now() - 7 * 24 * 60 * 60 * 1000)

  function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum;
  }

  let filteredTweets = props.filteredTweets.map((tweet, idx) => {
    return <Tweet id={`tweetID${idx}`} key={`tweet${idx}`} data={tweet} />
  })

  // function sortBy(category)

  return (
    <div className = "tweetDisplay"> 
      {filteredTweets}
    </div>
  );
}

export default TweetDisplay