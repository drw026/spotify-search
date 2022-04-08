# Spotify search
created with Create react app.

## Setup
Copy `.env.local.example` and rename it to `.env.local`.

Get Client ID and Client Secret from Spotify developer dashboard and paste it in a `.env.local`.
```
REACT_APP_SPOTIFY_CLIENT_ID=
REACT_APP_SPOTIFY_CLIENT_SECRET=
```
Start app by running command:
```
npm start
```
## TODO
- [ ] Logout after token is expired
- [ ] Unit test components
- [ ] Add creative feature for search
- [x] Store search query and cache response in LocalStorage
- [x] Use speech-to-text API for searching
- [x] Add animation to aid UX
