const authEndpoint = 'https://accounts.spotify.com/authorize';

const scopes = [
  'user-read-private',
];

export const getAuthorizeHref = (): string => {
  console.log(process.env.REACT_APP_SPOTIFY_CLIENT_ID)
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  // const clientId = "f00b1264a2f54c14bda4232b50ced8d0";
  const redirectUri = process.env.REACT_APP_REDIRECT_URI;
  // const redirectUri = "http://localhost:3000";
  return `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token`;
}