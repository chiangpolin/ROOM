import React, {useState} from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router';
import {useSelector, useDispatch} from 'react-redux';
import {
  setUserName,
  updateUserName,
  signOut,
} from '../../../app/actions/index.js';
import * as theme from '../../../app/constants/theme.js';
import {ReactComponent as X} from '../../../static/images/icons/x.svg';
import avatar from '../../../static/images/backgrounds/profile-avatar.png';
import {ReactComponent as SignOutIcon} from '../../../static/images/icons/box-arrow-right.svg';
import {ReactComponent as PenIcon} from '../../../static/images/icons/vector-pen.svg';
import {ReactComponent as CheckIcon} from '../../../static/images/icons/check.svg';

function UserModal(props) {
  let history = useHistory();
  const {id, name, email} = useSelector((state) => state.profile);
  const [nameInput, setNameInput] = useState(name);
  const [profileIsEditing, toggleEditProfile] = useState(false);
  const dispatch = useDispatch();

  return (
    <Div>
      <Mask></Mask>
      <ModalBody>
        <Button onClick={() => props.handleToggleUser(false)}>
          <X width="24" height="24" />
        </Button>
        <Container>
          <ImgDiv>
            <img src={avatar} alt="" />
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
        </Container>
      </ModalBody>
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
  position: fixed;
  z-index: 40;
  width: 100%;
  height: 100%;
`;

const Mask = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #1c1c1c;
  opacity: 0.7;
`;

const ModalBody = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  height: 60%;
  background-color: white;
  border-radius: 5px;
  opacity: 1;

  @media (max-width: 1023px) {
    width: 50%;
  }

  @media (max-width: 767px) {
    width: 80%;
  }

  @media (max-width: 375px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

const Button = styled.button`
  position: absolute;
  right: 0;
  margin: 15px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const Container = styled.div`
  margin: 45px 30px 30px;
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

export {UserModal};
