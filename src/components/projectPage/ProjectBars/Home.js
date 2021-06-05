import React, {useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import {updateProjectName} from '../../../app/actions/index.js';
import * as theme from '../../../app/constants/theme.js';
import {ReactComponent as CheckIcon} from '../../../static/images/icons/check.svg';

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
        <h1>Room</h1>
      </button>
      <p>|</p>
      <NameDiv>
        {user_id === author_id && nameIsEditing ? (
          <InputDiv>
            <input
              value={nameInput}
              onChange={(event) => handleChange(event, setNameInput)}
            ></input>
            <button
              onClick={() => {
                toggleEditName(false);
                handleClickUpdate(dispatch, nameInput, author_id, id);
              }}
            >
              <CheckIcon></CheckIcon>
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

  p {
    margin: 0 15px;
  }

  button {
    font-family: 'Varela Round';
    font-weight: 600;
    border: none;
    cursor: pointer;
    background-color: transparent;

    h1 {
      font-size: 28px;
      line-height: 28px;
    }

    h3 {
      font-size: 20px;
      line-height: 20px;
    }

    :hover {
      color: ${theme.RURI};
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

    p {
      display: none;
    }

    button {
      h3 {
        display: none;
      }
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

  svg {
    position: absolute;
    top: 5px;
    right: 5px;
  }
`;

export {Home};