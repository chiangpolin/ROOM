import React, {useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import {updateProjectName} from '../../../app/actions/index.js';
import * as theme from '../../../app/constants/theme.js';
import {ReactComponent as CheckIcon} from '../../../static/images/icons/check.svg';
import {ReactComponent as RoomIcon} from '../../../static/images/brands/room.svg';

function Home() {
  const {id} = useParams();
  let history = useHistory();
  const user_id = useSelector((state) => state.profile.id);
  const {name, author_id} = useSelector((state) => state.project);
  const [nameInput, setNameInput] = useState(name);
  const [nameIsEditing, toggleEditName] = useState(false);
  const dispatch = useDispatch();

  return (
    <Div>
      <button onClick={() => history.push('/')}>
        <RoomIcon width="32" height="32"></RoomIcon>
        <h1>Room</h1>
      </button>
      <p>|</p>
      <NameDiv>
        {user_id === author_id && nameIsEditing ? (
          <InputDiv>
            <input
              value={nameInput}
              onChange={(event) => handleChange(event, setNameInput)}
              onKeyPress={(event) => {
                if (event.code === 'Enter') {
                  if (!nameInput) {
                    return;
                  }
                  toggleEditName(false);
                  handleClickUpdate(dispatch, nameInput, author_id, id);
                }
              }}
            ></input>
            <button
              onClick={() => {
                if (!nameInput) {
                  return;
                }
                toggleEditName(false);
                handleClickUpdate(dispatch, nameInput, author_id, id);
              }}
            >
              <CheckIcon width="24" height="24"></CheckIcon>
            </button>
          </InputDiv>
        ) : (
          <h3 onClick={() => toggleEditName(true)}>{nameInput}</h3>
        )}
      </NameDiv>
    </Div>
  );
}

function handleChange(event, setValue) {
  setValue(event.target.value);
}

function handleClickUpdate(dispatch, name, user_id, project_id) {
  dispatch(updateProjectName(name, user_id, project_id));
}

const Div = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 10;
  display: flex;
  align-items: center;
  padding: 0 15px;
  min-width: 240px;
  height: 50px;
  border: none;
  border-radius: 5px;
  background-color: ${theme.WHITE};

  h3 {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 20px;
    line-height: 20px;
  }

  p {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 16px;
    margin: 0 15px;
  }

  button {
    display: flex;
    font-family: 'Varela Round';
    font-weight: 600;
    border: none;
    cursor: pointer;
    background-color: transparent;

    svg {
      margin: 0 10px 0 0;
    }

    h1 {
      font-size: 32px;
      line-height: 32px;
    }

    :hover {
      color: ${theme.KASHMIRBLUE};
    }
  }

  @media (max-width: 767px) {
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    border: none;
    border-radius: 0;
    box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);

    h3 {
      display: none;
    }

    p {
      display: none;
    }
  }
`;

const NameDiv = styled.div`
  @media (max-width: 767px) {
    display: none;
  }
`;

const InputDiv = styled.div`
  position: relative;

  input {
    padding: 0 10px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 20px;
    line-height: 20px;
  }

  svg {
    position: absolute;
    top: 5px;
    right: 5px;
  }
`;

export {Home};
