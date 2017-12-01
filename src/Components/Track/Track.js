import React from 'react';
import './Track.css';

class Track extends React.Component {
  renderAction(isRemoval) {
    if (isRemoval){
      return ('-');
    } else {
      return ('+');
    };
  };

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>Dolce vitaaaa</h3>
          <p>James Blunt | In the Army</p>
        </div>
        <a className="Track-action">{this.renderAction(false)}</a>
      </div>

    )
  }
};

export default Track;
