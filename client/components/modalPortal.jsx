import React from 'react';
import ReactDOM from "react-dom";

const ModalPortal = (props) => {
  let renderModal
  let domains
  let users
  // Render nothing if the "show" prop is false
  function sortTops(topObj) {
    let sortable = [];
    for (var entry in topObj) {
      sortable.push([entry, topObj[entry]]);
    }
    sortable.sort(function (a, b) {
      return b[1] - a[1];
    });
    return sortable.map(entry => {
      return (<p>user/domain: {entry[0]}  times tweeted: {`${entry[1]}`}</p>)
    })
  }

  domains = sortTops(props.topDomains)
  users = sortTops(props.topUsers)

  document.getElementById("modal").style.height = "100%"
  document.getElementById("modal").style.opacity = "100%"

  if (!props.renderModal) {
    domains = []
    users = []
    document.getElementById("modal").style.opacity = "0%"
    setTimeout(() => {
      document.getElementById("modal").style.height = "0%"
      renderModal = null
    }, 100)
  }
  renderModal = (
    <div className="backdrop">
      <div className="modalInner" id={"innermodal"}>
      </div>
      <div className="modalFooter">what
        {domains}
        {users}
        </div>
      <button onClick={() => props.displayModal()}>
        Go Back
            </button>
    </div>
  );

  return ReactDOM.createPortal(renderModal, document.querySelector("#modal"));
};

export default ModalPortal;