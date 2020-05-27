import React, { Component } from "react";

class Schedule extends Component {
  state = {
    data: [],
  };
  render() {
    return (
      <div className="tab-pane-2" id="tab_default_2">
        <p>Howdy, I'm in Tab 2.</p>
        <p>
          Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper
          suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem
          vel eum iriure dolor in hendrerit in vulputate velit esse molestie
          consequat. Ut wisi enim ad minim veniam, quis nostrud exerci tation.
        </p>
        <p>
          <a
            className="btn btn-warning"
            href="http://j.mp/metronictheme"
            target="_blank"
          >
            Click for more features...
          </a>
        </p>
      </div>
    );
  }
}

export default Schedule;
