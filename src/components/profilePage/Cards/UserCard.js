import React, {useState} from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {
  setUserName,
  updateUserName,
  signOut,
} from '../../../app/actions/index.js';
import * as theme from '../../../app/constants/theme.js';
import avatar from '../../../static/images/backgrounds/profile-avatar.png';
import {ReactComponent as SignOutIcon} from '../../../static/images/icons/box-arrow-right.svg';
import {ReactComponent as PenIcon} from '../../../static/images/icons/vector-pen.svg';
import {ReactComponent as CheckIcon} from '../../../static/images/icons/check.svg';

function UserCard() {
  const {id, name, email} = useSelector((state) => state.profile);
  const [nameInput, setNameInput] = useState(name);
  const [profileIsEditing, toggleEditProfile] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();

  return (
    <Div>
      <ImgDiv>
        <img src={avatar} />
      </ImgDiv>
      <Content>
        {profileIsEditing ? (
          <InputDiv>
            <input
              value={nameInput}
              onChange={(event) => handleChange(event, setNameInput)}
            ></input>
            <button
              onClick={() => {
                toggleEditProfile(false);
                dispatch(setUserName(nameInput));
                dispatch(updateUserName(id, nameInput));
              }}
            >
              <CheckIcon width="24" height="24"></CheckIcon>
            </button>
          </InputDiv>
        ) : (
          <h3>{nameInput}</h3>
        )}
        <p>{email}</p>
      </Content>
      <ActionDiv>
        <PenIcon width="24" height="24"></PenIcon>
        <p
          onClick={() => {
            toggleEditProfile(true);
          }}
        >
          Edit Profile
        </p>
      </ActionDiv>
      <ActionDiv onClick={() => handleClickSignOut(dispatch, history)}>
        <SignOutIcon width="24" height="24"></SignOutIcon>
        <p>Sign Out</p>
      </ActionDiv>
    </Div>
  );
}

function handleChange(event, setValue) {
  setValue(event.target.value);
}

function handleClickSignOut(dispatch, history) {
  dispatch(signOut());
  history.push('/');
}

const Div = styled.div`
  position: sticky;
  top: 140px;
  padding: 15px;
  width: 300px;
  height: 390px;
  border-radius: 10px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  background-color: ${theme.WHITE};

  @media (max-width: 1024px) {
    display: none;
  }
`;

const InputDiv = styled.div`
  position: relative;

  input {
    padding: 1.5px 30px 1.5px 10px;
    width: 100%;
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
    font-size: 20px;
    border: 1px solid ${theme.MINESHAFT};
    border-radius: 5px;
  }

  button {
    position: absolute;
    top: 5px;
    right: 5px;
    border: none;
    background-color: transparent;

    :hover {
      color: ${theme.KASHMIRBLUE};
      cursor: pointer;
    }
  }
`;

const ImgDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0 15px;

  img {
    width: 150px;
    height: 150px;
    border-radius: 75px;
  }
`;

const Content = styled.div`
  margin: 0 15px 30px;

  h3 {
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
    font-size: 24px;
  }

  p {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 16px;
  }
`;

const ActionDiv = styled.div`
  display: flex;
  margin: 15px 15px 0;

  p {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 16px;
    margin: 0 15px;
  }

  :hover {
    color: ${theme.KASHMIRBLUE};
    cursor: pointer;
  }
`;

export {UserCard};
