import React from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import styled from 'styled-components';
import {signOut} from '../../../app/actions/index.js';
import * as theme from '../../../app/constants/theme.js';
import avatar from '../../../static/images/backgrounds/profile-avatar.png';
import {ReactComponent as SignOutIcon} from '../../../static/images/icons/box-arrow-right.svg';

function Userbar(props) {
  let history = useHistory();
  const dispatch = useDispatch();

  return props.userIsClicked ? (
    <Div>
      <ImgDiv>
        <img src={avatar}></img>
      </ImgDiv>

      <UserDiv>
        <h3>Jeffrey Chiang</h3>
        <p>polin.chiang1996@gmail.com</p>
      </UserDiv>
      <SignOutDiv onClick={() => handleClickSignOut(dispatch, history)}>
        <SignOutIcon width="16" height="16"></SignOutIcon>
        <p>Sign Out</p>
      </SignOutDiv>
    </Div>
  ) : (
    ''
  );
}

function handleClickSignOut(dispatch, history) {
  dispatch(signOut());
  history.push('/');
}

const Div = styled.div`
  position: absolute;
  top: 70px;
  right: 15px;
  z-index: 20;
  padding: 0 15px;
  width: 240px;
  height: 240px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  background-color: ${theme.WHITE};

  @media (max-width: 1023px) {
  }

  img {
    margin: 15px 0;
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }
`;

const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const UserDiv = styled.div`
  h3 {
  }

  p {
    font-size: 14px;
    overflow-wrap: break-word;
  }
`;

const SignOutDiv = styled.div`
  display: flex;
  font-family: 'Varela Round';
  font-weight: 600;
  margin: 15px 0;
  border: none;
  cursor: pointer;
  background-color: transparent;

  :hover {
    color: ${theme.RURI};
  }

  p {
    margin: 0 15px;
  }
`;

export {Userbar};