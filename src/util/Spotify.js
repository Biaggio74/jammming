let userAccessToken;
const clientId = '0c188b81fcb64091bbad6f7c860289d1';
const redirectURI = 'http://localhost:3000/'

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
      let expTime = Number(expiresInMatch[1]);
      let now = new Date(Date.now());
      let expires = new Date(Date.now() + expTime * 1000)
      window.setTimeout(() => userAccessToken = '', expTime * 1000);
      window.history.pushState('Access Token', null, '/');
      return userAccessToken;
    } else {
      const redirectUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location.href = redirectUrl;
    }


  },

  search(term){
    this.getAccessToken();
    term = encodeURIComponent(term.trim());
    const url = `https://api.spotify.com/v1/search?type=track&q=${term}`;

    fetch(url, {
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + userAccessToken}
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!!!');
    }, networkError => console.log(networkError.message)
  ).then(jsonResponse => {
    //code to execute with jsonResponse
    if (jsonResponse.tracks) {
      return jsonResponse.tracks.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    };

  });
} //end of search()
}

export default Spotify;
