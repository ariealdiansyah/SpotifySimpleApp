import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListMusicByPlaylistId, selectDisplayName, selectListSongs, selectPlaylist } from './spotifyExampleSlice';
import styles from './SpotifyExample.module.css';
import { Authorization } from '../authorization/Authorization';
import { selectAccessToken, selectIsLoggedIn } from '../authorization/authorizationSlice';
// import { HiUserCircle,HiChevronDown } from 'react-icons/hi'

export function SpotifyExample() {
  const dispatch = useDispatch();
  const displayName = useSelector(selectDisplayName);
  const token = useSelector(selectAccessToken)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const playlist = useSelector(selectPlaylist);
  const listSongs = useSelector(selectListSongs);
  const getPlaylist = (idPlaylist: string) => {
    dispatch(getListMusicByPlaylistId(token, idPlaylist))
  }
  // const deleteItem = (uri: string) => {
  //   dispatch(deleteItemOnPlaylist(token, uri))
  // }
  useEffect(() => {
    if (token) {

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <Authorization />
        {isLoggedIn && <div>
          {displayName && <div className={styles.row}>
            Hello I'm {displayName}
          </div>}
          {playlist.map(playlist => <div key={playlist.id}>
            {<button
              className={styles.button}
              aria-label="Go To Playlist"
              onClick={() => getPlaylist(playlist.id)}
            >
              {playlist.name}
            </button>}
          </div>)}

          {listSongs.map(listSongs => <div key={listSongs.track.id}>
            {<button
              className={styles.button}
            >
              {listSongs.track.name}
            </button>}
            {<button
              className={styles.button}
              // onClick={() => deleteItem(listSongs.track.uri)}
            >
              Delete
            </button>}
          </div>)}

        </div>}

      </div>
    </div>
  );
}
