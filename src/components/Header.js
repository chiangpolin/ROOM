import React from 'react';
import styled from 'styled-components';

const SearchBox = styled.form`
  position: static;
  padding: 0 20px 0 0;
  width: 214px;
  height: 40px;
`;

const SearchInput = styled.input`
  position: static;
  padding: 0 15px;
  width: 100%;
  height: 100%;
  font-size: 16px;
  border: 1px solid #979797;
  border-radius: 20px;
  background-position: top 5px right 5px;
  background-size: 32px;
  background-repeat: no-repeat;

  :focus {
    outline: none;
  }
`;

const Navbar = styled.div`
  position: fixed;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 140px;
  border-bottom: 40px solid #313538;
  background-color: #ffffff;
`;

const NavbarBrand = styled.div`
  position: relative;
  z-index: 30;
  margin: 0 auto 0 50px;
`;

const Logo = styled.img`
  height: 48px;
`;

function Header() {
  return (
    <header>
      <Navbar>
        <NavbarBrand>
          <a href="/">
            <Logo />
          </a>
        </NavbarBrand>
        <SearchBox>
          <SearchInput type="text" name="tag" autoComplete="off" />
        </SearchBox>
      </Navbar>
    </header>
  );
}

export {Header};
