import React, { useEffect } from 'react'

import {
  MdKeyboardArrowDown,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight
} from 'react-icons/md'

import { HiUserCircle, HiChevronDown } from 'react-icons/hi'

import { FiSearch } from 'react-icons/fi'

// import neymarImg from '../../assets/neymar.jpeg'
// import theWeekndImg from '../../assets/the-weeknd.png'
import lofiImg from '../../assets/lofi.jpg'

import {
  Container,
  Header,
  ArrowsSearchContainer,
  Profile,
  ContentBody,
  ContentTitle,
  SearchBar,
  SeachBarInput,
  Category,
  CategoryTitle,
  CategoryContainer,
  CategoryItens,
  FixedTopBar,
  ListSongs
} from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { selectAccessToken, selectIsLoggedIn, setAccessToken, setLoggedIn, setTokenExpiryDate } from '../../features/authorization/authorizationSlice'
import { categoryServices, getListMusicByPlaylistId, playlistServices, selectDisplayName, selectIsPlaylist, selectListSongs, selectPlaylist, selectPlaylistDesc, selectPlaylistImages, selectUserId, selectUserProfile, setUserProfileAsync } from '../../features/spotifyExample/spotifyExampleSlice'
import { getAuthorizeHref } from '../../oauthConfig'
import { getHashParams, removeHashParamsFromUrl } from '../../utils/hashUtils'

interface CatergoryItemProps {
  imgUrl: string
  title: string
  description: string,
  actions: any
}

const CategoryItem: React.FC<CatergoryItemProps> = ({
  imgUrl,
  title,
  description,
  actions
}) => {
  return (
    <CategoryContainer onClick={actions}>
      <img src={imgUrl} alt={title}></img>
      <b>{title}</b>
      <p>{description}</p>
    </CategoryContainer>
  )
}

const hashParams = getHashParams();
const access_token = hashParams.access_token;
const expires_in = hashParams.expires_in;
removeHashParamsFromUrl();

const Content: React.FC = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const displayName = useSelector(selectDisplayName);
  const id = useSelector(selectUserId);
  const token = useSelector(selectAccessToken)
  const uriProfile = useSelector(selectUserProfile)
  const playlist = useSelector(selectPlaylist);
  const imgPlaylist = useSelector(selectPlaylistImages)
  const descPlaylist = useSelector(selectPlaylistDesc)
  const isGetTracks = useSelector(selectIsPlaylist)
  const listSongs = useSelector(selectListSongs);
  const getPlaylist = (idPlaylist: string) => {
    dispatch(getListMusicByPlaylistId(token, idPlaylist))
  }
  useEffect(() => {
    if (access_token) {
      dispatch(setLoggedIn(true));
      dispatch(setAccessToken(access_token));
      dispatch(setTokenExpiryDate(Number(expires_in)));
      dispatch(setUserProfileAsync(access_token));
      dispatch(playlistServices(access_token, id))
      dispatch(categoryServices(access_token, id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Header>
        <FixedTopBar>
          <ArrowsSearchContainer>
            <div>
              <MdKeyboardArrowLeft size={30} />
              <MdKeyboardArrowRight color={'#aaa'} size={30} />
            </div>
            <SearchBar>
              <FiSearch color={'#000'} size={17} />
              <SeachBarInput placeholder="Search"></SeachBarInput>
            </SearchBar>
          </ArrowsSearchContainer>
          <Profile>
            {!isLoggedIn &&
              <button
                className="user-btn"
                onClick={() => window.open(getAuthorizeHref(), '_self')}
              >
                <HiUserCircle className="user-icon" />
                Login
                <HiChevronDown className="user-icon" />
              </button>}
            {isLoggedIn &&
              <button
                className="user-btn"
              >
                <img
                  src={uriProfile}
                  alt="user avatar"
                ></img>
                {displayName}
                <HiChevronDown className="user-icon" />
              </button>}
            <MdKeyboardArrowDown size={30} />
          </Profile>
        </FixedTopBar>
        <ContentTitle>Home</ContentTitle>
      </Header>
      <ContentBody>
        <Category>
          <CategoryTitle>
            {isGetTracks && <span>List Music</span>}
            {!isGetTracks && <span>Playlist</span>}
            <div>
              <MdKeyboardArrowLeft color={'#aaa'} size={30} />
              <MdKeyboardArrowRight size={30} />
            </div>
          </CategoryTitle>
          <CategoryItens>
            {isLoggedIn && <div>
              {!isGetTracks && playlist.map(x =>
                <CategoryItem
                  key={x.id}
                  title={x.name}
                  imgUrl={imgPlaylist}
                  description={descPlaylist || 'No Description'}
                  actions={() => getPlaylist(x.id)}
                />)
              }
              {isGetTracks && listSongs.map(y => <ListSongs key={y.track.id}>
                <img src={y.track.album.images[2].url} alt={y.track.album.name}></img>
                <b>{y.track.name}</b>
              </ListSongs>)}
            </div>
            }
            {!isLoggedIn &&
              <CategoryItem
                imgUrl={lofiImg}
                title="lofi hip hop"
                actions=''
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              />
            }

          </CategoryItens>
        </Category>
      </ContentBody>
    </Container >
  )
}

export default Content
