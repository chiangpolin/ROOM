import React from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import {searchProjects, filterProjects} from '../../app/actions/index.js';
import * as theme from '../../app/constants/theme.js';
import {ReactComponent as LightBulbIcon} from '../../static/images/icons/lightbulb.svg';
import {ReactComponent as SearchIcon} from '../../static/images/icons/search.svg';
import {ReactComponent as PersonIcon} from '../../static/images/icons/person-fill.svg';
import {ReactComponent as RoomIcon} from '../../static/images/brands/room-white.svg';

function Header(props) {
  let history = useHistory();
  const dispatch = useDispatch();

  return (
    <Div>
      <Navbar>
        <NavbarBrand>
          <RoomIcon width="36" height="36"></RoomIcon>
          <button onClick={() => history.push('/profile')}>Room</button>
        </NavbarBrand>
        <SearchBar>
          <input
            onKeyPress={(event) => handleKeyPress(event, dispatch)}
          ></input>
          <div>
            <SearchIcon></SearchIcon>
          </div>
        </SearchBar>
        <NavLinks>
          <HintDiv onClick={() => props.setRun(true)}>
            <LightBulbIcon width="24" height="24"></LightBulbIcon>
          </HintDiv>
          <UserDiv onClick={() => props.handleToggleUser(true)}>
            <PersonIcon width="24" height="24"></PersonIcon>
          </UserDiv>
        </NavLinks>
      </Navbar>
    </Div>
  );
}

function handleKeyPress(event, dispatch) {
  if (event.code === 'Enter') {
    dispatch(searchProjects(event.target.value));
    dispatch(
      filterProjects({
        shared: false,
        author: false,
        searched: true,
      })
    );
  }
}

const Div = styled.header`
  position: fixed;
  top: 0;
  z-index: 30;
  display: flex;
  justify-content: center;
  width: 100%;
  color: ${theme.ATHENSGRAY};
  background-color: ${theme.KASHMIRBLUE};
`;

const Navbar = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 30px 0 30px;
  width: 100%;
  max-width: 1200px;
  height: 70px;
  background-color: transparent;
`;

const NavbarBrand = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  padding: 0 181px 0 0;
  height: 60px;
  border: none;
  background-color: transparent;

  svg {
    margin: 0 10px 0 0;
  }

  button {
    font-family: 'Varela Round';
    font-weight: 600;
    font-size: 36px;
    border: none;
    cursor: pointer;
    color: ${theme.ATHENSGRAY};
    background-color: transparent;

    :hover {
      color: ${theme.WHITE};
    }
  }

  @media (max-width: 1023px) {
    padding: 0 30px 0 0;
  }
`;

const SearchBar = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  div {
    position: absolute;
    top: 22px;
    left: 20px;
    color: ${theme.MINESHAFT};
  }

  input {
    padding: 0 0 0 50px;
    width: 100%;
    height: 36px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    outline: none;
    background-color: ${theme.ATHENSGRAY};
  }

  @media (max-width: 575px) {
    display: none;
  }
`;

const NavLinks = styled.div`
  position: relative;
  z-index: 10;
  margin: 10px 0 0 15px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  img {
    margin: 0 0 0 10px;
    width: 32px;
    height: 32px;
    border-radius: 16px;
    cursor: pointer;
  }

  svg {
    margin: 0 10px;
    line-weight: 400;

    :hover {
      color: ${theme.WHITE};
      cursor: pointer;
    }
  }

  @media (max-width: 575px) {
    margin: 10px 0 0 auto;
  }
`;

const HintDiv = styled.div`
  @media (max-width: 575px) {
    display: none;
  }
`;

const UserDiv = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: block;
  }
`;

export {Header};
