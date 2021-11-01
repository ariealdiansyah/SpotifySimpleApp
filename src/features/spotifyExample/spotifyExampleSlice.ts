import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import {
  setLoggedIn
} from '../../features/authorization/authorizationSlice';

interface SpotifyExampleState {
  displayName: string,
  product: string,
  userID: string,
  playlist: any[],
  listSong: any[],
  idPlaylist: string
}

const initialState: SpotifyExampleState = {
  displayName: '',
  product: '',
  userID: '',
  playlist: [],
  listSong: [],
  idPlaylist: ''
};

export const spotifyexampleSlice = createSlice({
  name: 'spotifyExample',
  initialState,
  reducers: {
    setDisplayName: (state, action: PayloadAction<string>) => {
      state.displayName = action.payload;
    },
    setProduct: (state, action: PayloadAction<string>) => {
      state.product = action.payload;
    },
    setUserID: (state, action: PayloadAction<string>) => {
      state.userID = action.payload
    },
    setListPlaylistUsers: (state, action: PayloadAction<Array<Object>>) => {
      state.playlist = action.payload
    },
    setListSongOfPlaylist:(state, action: PayloadAction<Array<Object>>) => {
      state.listSong = action.payload
    },
    setIdPlaylist:(state, action: PayloadAction<string>) => {
      state.idPlaylist = action.payload
    },
  },
});

export const { setDisplayName, setProduct, setUserID, setListPlaylistUsers, setListSongOfPlaylist, setIdPlaylist } = spotifyexampleSlice.actions;
export const selectDisplayName = (state: RootState) => {
  return state.spotifyExample.displayName
};
export const selectIdPlaylist = (state: RootState) => {
  return state.spotifyExample.idPlaylist
};
export const selectProduct = (state: RootState) => state.spotifyExample.product;
export const selectPlaylist = (state: RootState) => state.spotifyExample.playlist;
export const selectListSongs = (state: RootState) => state.spotifyExample.listSong;
export const selectUserId = (state: RootState) => state.spotifyExample.userID;
export const selectToken = (state: RootState) => state.authorization.accessToken;

export const setUserProfileAsync = (accessToken: string): AppThunk => dispatch => {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + accessToken);

  fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: myHeaders,
  }).then(response => response.json())
    .then((data) => {
      console.log(data);
      dispatch(setDisplayName(data.display_name ? data.display_name : data.id));
      dispatch(setProduct(data.product));
      dispatch(setUserID(data.id))
    }).catch((error) => {
      console.log(error);
      if (error instanceof XMLHttpRequest) {
        if (error.status === 401) {
          dispatch(setLoggedIn(false));
        }
      }
    });
};

export const playlistServices = (token: string, id: string): AppThunk => dispatch => {
  const myHeaders = new Headers();

  myHeaders.append('Authorization', 'Bearer ' + token);
  console.log(token)
  console.log(id)

  // const uri = 'https://api.spotify.com/v1/users/' + id + '/playlists ';
  const uri2 = 'https://api.spotify.com/v1/me/playlists ';

  fetch(uri2, {
    method: 'GET',
    headers: myHeaders,
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data)
      dispatch(setListPlaylistUsers(data.items));
    })
    .catch((err) => {
      console.log(err);
      if (err instanceof XMLHttpRequest) {
        if (err.status === 401) {
          dispatch(setLoggedIn(false));
        }
      }
    })
}

export const getListMusicByPlaylistId = (token: string, id: string) : AppThunk => dispatch => {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + token);

  const uri2 = 'https://api.spotify.com/v1/playlists/'+id+'/tracks';

  fetch(uri2, {
    method: 'GET',
    headers: myHeaders,
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data)
      dispatch(setListSongOfPlaylist(data.items))
      dispatch(setIdPlaylist(id));
    })
    .catch((err) => {
      console.log(err);
      if (err instanceof XMLHttpRequest) {
        if (err.status === 401) {
          dispatch(setLoggedIn(false));
        }
      }
    })
}

// export const deleteItemOnPlaylist = (token: string, uri: string,) : AppThunk => (dispatch, getState) => {
//   const myHeaders = new Headers();
//   myHeaders.append('Authorization', 'Bearer ' + token);

//   const idPlaylist = getState().spotifyExample.idPlaylist;
//   console.log(idPlaylist);
  
//   let myArray = [];
//   let uriData = {} as any;
//   uriData.uri = uri
//   myArray.push(uriData);

//   const uri2 = 'https://api.spotify.com/v1/playlists/'+idPlaylist+'/tracks';

//   fetch(uri2, {
//     method: 'DELETE',
//     headers: myHeaders,
//     body: JSON.stringify({ tracks: myArray})
//   })
//     .then(response => response.json())
//     .then((data) => {
//       console.log(data)
//     })
//     .catch((err) => {
//       console.log(err);
//       if (err instanceof XMLHttpRequest) {
//         if (err.status === 401) {
//           dispatch(setLoggedIn(false));
//         }
//       }
//     })
// }

export default spotifyexampleSlice.reducer;