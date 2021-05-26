import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {
  toggleProjectName,
  setProjectName,
  updateProjectName,
} from '../../app/actions/index.js';

function CardInfo() {
  const [name, setName] = useState('');
  const {id, selectedProject} = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  return (
    <Div>
      <ImgDiv>
        <Img />
      </ImgDiv>
      <Content>
        {selectedProject.isEditing ? (
          <input
            value={name}
            onChange={(event) => handleChange(event, setName)}
          ></input>
        ) : (
          <NameText
            onClick={() =>
              handleToggleName(dispatch, selectedProject.name, setName)
            }
          >
            {selectedProject.name}
          </NameText>
        )}
        <IdText>{selectedProject.author_id}</IdText>
        <IdText>{selectedProject.id}</IdText>
        {selectedProject.author_id === id ? (
          <Buttons>
            <Button
              success
              disabled={!selectedProject.isEditing}
              onClick={() => {
                handleClickUpdate(dispatch, name, id, selectedProject.id);
              }}
            >
              Update
            </Button>
          </Buttons>
        ) : (
          <Buttons></Buttons>
        )}
      </Content>
    </Div>
  );
}

function handleChange(event, setValue) {
  setValue(event.target.value);
}

function handleToggleName(dispatch, name, setName) {
  setName(name);
  dispatch(toggleProjectName());
}

function handleClickUpdate(dispatch, name, user_id, project_id) {
  dispatch(setProjectName(name));
  dispatch(updateProjectName(name, user_id, project_id));
}

const Div = styled.div`
  width: 300px;
  border-right: 1px solid #1c1c1c;
`;

const ImgDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
`;

const Img = styled.img`
  width: 150px;
  height: 150px;
  background-color: #bdc0ba;
`;

const Content = styled.div`
  margin: 0 30px;
`;

const NameText = styled.p`
  font-size: 24px;
`;

const IdText = styled.p`
  font-size: 16px;
`;

const Buttons = styled.div`
  margin: 15px 0 0;
`;

const Button = styled.button`
  width: 100%;
  height: 30px;
  color: #1c1c1c;
  border: 1px solid #1c1c1c;
  font-size: 16px;
  cursor: pointer;

  ${(props) =>
    props.primary &&
    css`
      color: white;
      background-color: #0275d8;
      border: 1px solid #0275d8;
    `}

  ${(props) =>
    props.danger &&
    css`
      color: white;
      background-color: #d9534f;
      border: 1px solid #d9534f;
    `}

    ${(props) =>
    props.success &&
    css`
      color: white;
      background-color: #5cb85c;
      border: 1px solid #5cb85c;
    `}

    ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
    `}
`;

export {CardInfo};
