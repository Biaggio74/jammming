import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction(isRemoval) {
    if (isRemoval){
      return (<div onClick={this.removeTrack}> - </div>);
    } else {
      return ( <div onClick={this.addTrack} > + </div>);
    };
  };

  addTrack(){
    // something here???
    this.props.onAdd(this.props.track)
  }

  removeTrack(){
    this.props.onRemove(this.props.track)
  }

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
