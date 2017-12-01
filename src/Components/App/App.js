import React, { Component } from 'react';
import './App.css';
import SearchResults from '../SearchResults/SearchResults.js';
import PlayList from '../PlayList/PlayList.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: "My new playlist",
      playlistTracks: [
        {name: "Down to the river", artist: "Bruce Sprinsgteen", album: "River"},{name: "Down to the river", artist: "Bruce Sprinsgteen", album: "River"}],
      searchResults: [
        {name: "New song", artist: "James Blunt", album: "New age"}]
    }
  }
  addTrack(track){
    if (this.state.playistTracks){

    }
  }


  render() {
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
    Add a SearchBar component
    <div className="App-playlist">
      <SearchResults searchResults={this.state.searchResults} />
      <PlayList playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
      </div>
      </div>
      </div>
    );
  }
}

export default App;
