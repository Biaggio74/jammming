import React from 'react';
import './PlayList.css';
import './TrackList';


class PlayList extends Component {
  render(){
    return (
      <div className="Playlist">
  <input defaultValue={'New Playlist'}/>
  Add a TrackList component
  <a className="Playlist-save">SAVE TO SPOTIFY</a>
</div>
    )
  }
};

export default PlayList;
