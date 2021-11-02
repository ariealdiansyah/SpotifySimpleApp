import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 15px;

  height: 125px;
`

interface MenuItemProps {
  active?: boolean
}

export const MenuItem = styled.div<MenuItemProps>`
  display: flex;
  align-items: center;

  height: 42px;

  color: ${props => (props.active ? '#fff' : '#a8a8a8')};
  font-size: 14px;
  font-weight: bold;

  cursor: default;
  user-select: none;

  svg {
    margin-left: 20px;
  }

  span {
    text-align: center;
    margin-left: 10px;
  }

  img {
    border-radius: 50%;
    height: 30px;
    width: 30px;

    margin-left: 15px;
  }

  :hover {
    color: #edebeb;
  }

  :active {
    color: ${shade(0.2, '#a8a8a8')};
  }
`
