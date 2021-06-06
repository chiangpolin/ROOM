import React from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import * as theme from '../../app/constants/theme.js';
import {ReactComponent as LightBulbIcon} from '../../static/images/icons/lightbulb.svg';
import {ReactComponent as SearchIcon} from '../../static/images/icons/search.svg';

function Header(props) {
  let history = useHistory();

  return (
    <Div>
      <Navbar>
        <NavbarBrand>
          <button onClick={() => history.push('/profile')}>Room</button>
        </NavbarBrand>
        <SearchBar>
          <input></input>
          <div>
            <SearchIcon></SearchIcon>
          </div>
        </SearchBar>
        <NavLinks>
          <div onClick={() => props.setRun(true)}>
            <LightBulbIcon width="24" height="24"></LightBulbIcon>
          </div>
        </NavLinks>
      </Navbar>
    </Div>
  );
}

const Div = styled.header`
  position: fixed;
  top: 0;
  z-index: 20;
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: ${theme.WHITESMOKE};
`;

const Navbar = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0 0 0;
  padding: 30px;
  width: 100%;
  max-width: 1200px;
  height: 80px;
  background-color: transparent;
`;

const NavbarBrand = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  padding: 0 225px 0 0;
  height: 60px;
  border: none;
  background-color: transparent;

  button {
    font-family: 'Varela Round';
    font-weight: 600;
    font-size: 36px;
    border: none;
    cursor: pointer;
    background-color: transparent;

    :hover {
      color: ${theme.RURI};
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
  }

  input {
    padding: 0 0 0 50px;
    width: 100%;
    height: 36px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    outline: none;
    background-color: ${theme.WHITE};
  }
`;

const NavLinks = styled.div`
  position: relative;
  z-index: 10;
  margin: 0 0 0 15px;
  height: 60px;
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
      color: blue;
      cursor: pointer;
    }
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

export {Header};
