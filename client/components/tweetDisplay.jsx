import React from "react";
import Tweet from "./tweets"

const TweetDisplay = (props) => {

  let lastWeek = (Date.now() - 7 * 24 * 60 * 60 * 1000)

  function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum;
  }

  let displayTweet = props.tweetsArr.map((tweet, idx) => {
    console.log(idx)
    return <Tweet id={idx} key={idx} data={tweet} />
  })

  // function sortBy(category)

  return (
    <div> 
      {displayTweet}
    </div>
  );
}

export default TweetDisplay