import React from 'react'

// import { RiHome5Fill } from 'react-icons/ri'
import { FiRadio, FiDisc, FiUser, FiUsers } from 'react-icons/fi'
import { Container, MenuItem } from './styles'
import { useSelector } from 'react-redux'
//@ts-ignore
import ReactCountryFlag from "react-country-flag"
import { selectDisplayName, selectNation, selectUserFollowers, selectUserProfile } from '../../../features/spotifyExample/spotifyExampleSlice'
import { selectIsLoggedIn } from '../../../features/authorization/authorizationSlice'

const TopMenu: React.FC = () => {
  const displayName = useSelector(selectDisplayName);
  const dataProfile = useSelector(selectUserFollowers);
  const uriProfile = useSelector(selectUserProfile)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const nation = useSelector(selectNation)
  return (
    <Container>
      <MenuItem>
        {!isLoggedIn &&
          <><FiUser size={25} /><span>Users</span></>
        }
        {isLoggedIn && <>
          <img
            src={uriProfile}
            alt="user avatar"
          />
          <span>{displayName}</span>
        </>}
      </MenuItem>
      <MenuItem>
        {!isLoggedIn &&
          <><FiDisc size={25} /><span>Browse</span></>
        }
        {isLoggedIn && <>
          <FiUsers size={25} />
          <span>Followers : {dataProfile}</span>
        </>}
      </MenuItem>
      <MenuItem>
        {!isLoggedIn &&
          <><FiRadio size={25} /><span>Radio</span></>
        }
        {isLoggedIn &&
          <ReactCountryFlag
            countryCode={nation}
            svg
            style={{
              width: '2em',
              height: '2em',
            }}
          />
        }
      </MenuItem>
    </Container>
  )
}

export default TopMenu
