import React, { Component } from 'react';
import './App.css';
import SearchResults from '../SearchResults/SearchResults.js';
import PlayList from '../PlayList/PlayList.js';
import SearchBar from '../SearchBar/SearchBar.js';
import Spotify from '../../util/Spotify.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: 'New playlist',
      playlistTracks: [],
      searchResults: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    //this was based on https://github.com/diejessedie/jammming/blob/master/src/components/App/App.js repository. I added into the Spotify.search method
    Spotify.getAccessToken();
  }

  addTrack(track) {
    let array = this.state.playlistTracks;
    let index = array.indexOf(track);
    if (index >= 0) {
      return;
    }

    array.push(track);
    this.setState({ playlistTracks: array });
  }

  removeTrack(track) {
    let array = this.state.playlistTracks.slice();
    let index = array.indexOf(track);
    array.splice(index, 1);
    this.setState({ playlistTracks: array });
  }

  updatePlaylistName(name){
    this.setState({playlistName: name})
  };

  savePlaylist(){
    let trackURIs = this.state.playlistTracks.map(track => {
      return track.uri
    });
    Spotify.savePlaylist(this.state.playlistName, trackURIs)
    this.setState({
      playlistName: 'New playlist',
      searchResults: []
    })
  };

  search(term) {
    console.log(term);
      Spotify.search(term).then(tracks => {
        this.setState({searchResults: tracks});
      });
    }


  render() {
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={this.search} />
    <div className="App-playlist">
      <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
      <PlayList
        onSave={this.savePlaylist}
        onNameChange={this.updatePlaylistName} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}
        onRemove={this.removeTrack} />
      </div>
      </div>
      </div>
    );
  }
}

export default App;
