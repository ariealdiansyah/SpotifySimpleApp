import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setLoggedIn,
  setAccessToken,
  setTokenExpiryDate,
  selectIsLoggedIn,
} from './authorizationSlice';
import { playlistServices, selectUserId, setUserProfileAsync } from '../spotifyExample/spotifyExampleSlice';
import styles from '../counter/Counter.module.css';
import { getAuthorizeHref } from '../../oauthConfig';
import { getHashParams, removeHashParamsFromUrl } from '../../utils/hashUtils';

const hashParams = getHashParams();
const access_token = hashParams.access_token;
const expires_in = hashParams.expires_in;
removeHashParamsFromUrl();

export function Authorization() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const id = useSelector(selectUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (access_token) {
      dispatch(setLoggedIn(true));
      dispatch(setAccessToken(access_token));
      dispatch(setTokenExpiryDate(Number(expires_in)));
      dispatch(setUserProfileAsync(access_token));
      dispatch(playlistServices(access_token, id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className={styles.row}>
        {!isLoggedIn &&
          <button
          className={styles.button}
          aria-label="Log in using OAuth 2.0"
          onClick={() => window.open(getAuthorizeHref(), '_self')}
          >
          Log in with Spotify
          </button>}
      </div>
    </div>
  );
}