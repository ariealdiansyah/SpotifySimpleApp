import React from 'react'

import TopMenu from './TopMenu'
import PlaylistsMenu from './PlaylistsMenu'

import { Container, LibraryPlaylistContainer } from './styles'

const SideNav: React.FC = () => {
  return (
    <Container>
      <TopMenu />
      <LibraryPlaylistContainer>
        <PlaylistsMenu />
      </LibraryPlaylistContainer>
    </Container>
  )
}

export default SideNav
