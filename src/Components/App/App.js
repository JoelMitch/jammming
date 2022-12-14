import './App.css';
import {SearchBar} from '../SearchBar/SearchBar.js';
import {SearchResults} from '../SearchResults/SearchResults.js';
import {Playlist} from '../Playlist/Playlist.js';
import React from 'react';
import Spotify from '../../Util/Spotify';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'playlist1', 
      playlistTracks: []
};
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(song => song.id === track.id)) {
      return;
    }

    let tracks = this.state.playlistTracks;

    if (tracks.find(song => song.id === track.id)) {
      return;
    }

    tracks.push(track);

    this.setState({playlistTracks: tracks});
    console.log(this.state.playlistTracks)

  }

  removeTrack(track) {

   let newPlaylist = this.state.playlistTracks.filter(song => song.id !== track.id);
    
    this.setState({playlistTracks: newPlaylist})

  }

  updatePlaylistName(newName) {
    this.setState({playlistName: newName});
  }

  savePlaylist() {
    let trackURIs = []

    for (let track in this.state.playlistTracks) {
      trackURIs.push(track.uri);
    }

    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: [],
      })
    })
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }

  render () {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
        <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            {console.log(this.state.searchResults)}
          < Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} 
          onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
