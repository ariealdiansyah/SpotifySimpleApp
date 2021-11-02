import React, { useEffect } from 'react'

import { Container, LibraryItem } from './styles'
import { Title } from '../styles'
import { useSelector } from 'react-redux';
import { selectPlaylist } from '../../../features/spotifyExample/spotifyExampleSlice';
import { selectIsLoggedIn } from '../../../features/authorization/authorizationSlice';

const PlaylistsMenu: React.FC = () => {
  // const dispatch = useDispatch();
  const playlist = useSelector(selectPlaylist);
  // const token = useSelector(selectAccessToken)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  useEffect(() => {
    // dispatch(getListMusicByPlaylistId(token, id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {isLoggedIn && <div>
        <Title>PLAYLISTS</Title>
        {playlist.map(x =>
          <LibraryItem key={x.id}>
            {x.name}
          </LibraryItem>)
        }
      </div>
      }
      {!isLoggedIn && <div>
        <Title>CATEGORY</Title>
        {playlist.map(x =>
          <LibraryItem>
            {x.name}
          </LibraryItem>)
        }
      </div>
      }
    </Container>
  )
}

export default PlaylistsMenu
