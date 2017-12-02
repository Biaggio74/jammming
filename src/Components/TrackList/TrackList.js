import React from 'react';
import Track from '../Track/Track.js';
import './TrackList.css';

class TrackList extends React.Component {
  render(){
    return (
      <div className="TrackList">
      { this.props.tracks.map(track => {
        return (
          <Track onAdd={this.props.onAdd} name={track.name} artist={track.artist} album={track.album}/>)

      })
    }
      </div>
    )
  };
};

export default TrackList;
