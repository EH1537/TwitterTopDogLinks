import React from 'react';
import ReactDOM from "react-dom";

const ModalPortal = (props) => {
  let renderModal
  let domains
  let users
  // Render nothing if the "show" prop is false
  function sortTops(topObj, topic) {
    let sortable = [];
    let output = []
    output.push(<h4>{topic}:</h4>)
    for (var entry in topObj) {
      sortable.push([entry, topObj[entry]]);
    }
    sortable.sort(function (a, b) {
      return b[1] - a[1];
    });
    sortable.forEach(entry => {
      output.push(<p>{entry[0]} occured {`${entry[1]}`} time(s)</p>)
    })
    return output
  }

  domains = sortTops(props.topDomains, "Top Domains Shared")
  users = sortTops(props.topUsers, "Top Users Sharing")

  document.getElementById("modal").style.height = "100%"
  document.getElementById("modal").style.width = "100%"
  document.getElementById("modal").style.opacity = "100%"

  if (!props.renderModal) {
    domains = []
    users = []
    document.getElementById("modal").style.opacity = "0%"
    setTimeout(() => {
      document.getElementById("modal").style.height = "0%"
      document.getElementById("modal").style.width = "0%"
      renderModal = null
    }, 100)
  }
  renderModal = (
    <div className="modalBackdrop">
      <div className="modalContent">
        <div className="displayTops">
          {domains}
        </div>
        <div className="displayTops">
          {users}
        </div>
      </div>
      <button onClick={() => props.displayModal()}>
        Go Back
            </button>
    </div>
  );

  return ReactDOM.createPortal(renderModal, document.querySelector("#modal"));
};

export default ModalPortal;