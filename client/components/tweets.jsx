import React from "react";

const Tweet = (props) => {

  let displayArr = [];


  displayArr.push(<p>Tweet=>{props.id} {props.data.text}</p>)
  displayArr.push(<p>Favorites=> {props.data.favorite_count}</p>)
  displayArr.push(<p>Date=> {props.data.created_at}</p>)
  if (props.data.entities.urls.length) {
    displayArr.push(<button class="visitBtn" onClick={()=> window.open(`${props.data.entities.urls[0].url}`,'_blank')}> Visit</button>
)
  }
  return(
    <div className = "singleTweetInfo">
      {displayArr}
    </div>
  )
}

export default Tweet