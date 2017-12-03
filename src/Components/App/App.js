import React, { Component } from 'react';
import './App.css';
import SearchResults from '../SearchResults/SearchResults.js';
import PlayList from '../PlayList/PlayList.js';
import SearchBar from '../SearchBar/SearchBar.js';
import Spotify from '../../util/Spotify.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: "My new playlist",
      playlistTracks: [
        {name: "Down to the river", artist: "Bruce Sprinsgteen", album: "River"},{name: "Down to the river", artist: "Bruce Sprinsgteen", album: "River"}],
      searchResultTracks: [
        {name: "New song", artist: "James Blunt", album: "New age"}]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  };

  addTrack(track){
    if (!this.state.playistTracks.includes(track)){
      this.setState({playlistTracks: this.state.playlistTracks.push(track)})
    }
  };

  removeTrack(track){
    this.setState({playlistTracks: this.state.playlistTracks.filter(tr => tr !== track)  });
  };

  updatePlaylistName(name){
    this.setState({playlistName: name})
  };

  savePlaylist(){
    const trackURIs = this.state.playlistTracks.map(track => track.uri)
  };

  search(term){
    console.log(term);
  }


  render() {
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={this.search} />
    <div className="App-playlist">
      <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResultTracks} />
      <PlayList onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} />
      </div>
      </div>
      </div>
    );
  }
}

export default App;
