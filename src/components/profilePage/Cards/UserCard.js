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
            // handleClickUpdate(dispatch, nameInput, id);
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

// function handleClickUpdate(dispatch, name, user_id) {
//   dispatch(setProfileName(name));
//   dispatch(updateProfileName(name, user_id, project_id));
// }

function handleClickSignOut(dispatch, history) {
  dispatch(signOut());
  history.push('/');
}

const Div = styled.div`
  position: sticky;
  top: 90px;
  padding: 15px;
  width: 300px;
  height: 390px;
  border-radius: 10px;
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
    font-size: 24px;
    border: 1px solid ${theme.SUMI};
    border-radius: 5px;
  }

  button {
    position: absolute;
    top: 5px;
    right: 5px;
    border: none;
    background-color: transparent;

    :hover {
      color: ${theme.RURI};
      cursor: pointer;
    }
  }
`;

const ImgDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0;

  img {
    width: 150px;
    height: 150px;
    border-radius: 75px;
  }
`;

const Content = styled.div`
  margin: 0 15px;

  h3 {
    font-size: 24px;
  }

  p {
    font-size: 16px;
  }
`;

const ActionDiv = styled.div`
  display: flex;
  margin: 15px 15px 0;

  p {
    margin: 0 15px;
  }

  :hover {
    color: ${theme.RURI};
    cursor: pointer;
  }
`;

export {UserCard};
