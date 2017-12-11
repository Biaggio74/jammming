let userAccessToken;
const clientId = '0c188b81fcb64091bbad6f7c860289d1';
const redirectURI = 'http://localhost:3000'

const Spotify = {
  getAccessToken() {
    if (userAccessToken){
      return userAccessToken;
    }
    //for regular expressions
    const token_reg = /access_token=([^&]*)/;
    const expires_reg = /expires_in=([^&]*)/;
    const accessTokenMatch = window.location.href.match(token_reg);
    const expiresInMatch = window.location.href.match(expires_reg);

    if (accessTokenMatch && expiresInMatch ) {
      userAccessToken = accessTokenMatch[1];
      let expiresIn = Number(expiresInMatch[1]);
      //let now = new Date(Date.now());
      //let expires = new Date(Date.now() + expTime * 1000)
      window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');// This clears the parameters, allowing us to grab a new access token when it i expires
      return userAccessToken;
    } else {
      let accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessUrl;
    }
  },

  search(term){
    //this is moved to app.js
    //userAccessToken = this.getAccessToken();
    //term = encodeURIComponent(term.trim());
    let url = 'https://cors-anywhere.herokuapp.com/' + `https://api.spotify.com/v1/search?type=track&q=${term}`;

    return fetch(url, {
      method: 'GET',
      headers: {Authorization: `Bearer ${userAccessToken}`}
    }).then(response => {
      if (response.ok) {
        return response.json();
      };
      throw new Error('Request failed!!!');
    },
    networkError => console.log(networkError.message)
  ).then(jsonResponse => {
    //code to execute with jsonResponse
    if (jsonResponse.tracks) {
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    }
    return [];
    console.log(jsonResponse);
  });
}, //end of search()

  savePlaylist(name,trackArray){
    if (!name || !trackArray) {
      return;
    }
      const accessToken = this.getAccessToken();
      const headers = {
        Authorization: `Bearer ${accessToken}`
      }
      let userID;
      let playlistID;
      //make a request that returns the users Spotify username
      let url = 'https://cors-anywhere.herokuapp.com/' + 'https://api.spotify.com/v1/me';
      return fetch(url, {
        method: 'GET',
        headers: headers
      }).then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Post Request failed!');
      }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
       userID = jsonResponse.id;

       fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
         method: 'POST',
         headers: headers,
         body: JSON.stringify({
           name: name
         })
       }).then(response => {
         if (response.ok) {
           return response.json();
         }
         throw new Error('Post Request failed!');
       }, networkError => console.log(networkError.message)
     ).then(jsonResponse => {
       playlistID = jsonResponse.id;

       fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          uris: trackArray
        })
      });
     });
    })




  }

}

export default Spotify;
