import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import {useSelector} from 'react-redux';
import {store} from '../../app/store/index.js';
import {
  setProjects,
  toggleEditName,
  updateEditName,
} from '../../app/actions/index.js';
import {getProjects, putProject} from '../../app/utils/firebase.js';

function ProjectInfo() {
  const profile = useSelector((state) => state.profile);
  const [name, setName] = useState('');

  return (
    <Div>
      <ImgDiv>
        <Img />
      </ImgDiv>
      <Content>
        {profile.selectedProject.isEditing ? (
          <input
            value={name}
            onChange={(event) => handleChange(event, setName)}
          ></input>
        ) : (
          <NameText
            onClick={() => {
              setName(profile.selectedProject.name);
              store.dispatch(toggleEditName());
            }}
          >
            {profile.selectedProject.name}
          </NameText>
        )}
        <IdText>{profile.selectedProject.author_id}</IdText>
        <IdText>{profile.selectedProject.id}</IdText>
        <Button
          primary
          disabled={!profile.selectedProject.isEditing}
          onClick={() => {
            handleClickUpdate(profile.selectedProject.id, name);
          }}
        >
          Update
        </Button>
        <Button danger disabled={true}>
          Delete
        </Button>
      </Content>
    </Div>
  );
}

function handleChange(event, setValue) {
  setValue(event.target.value);
}

async function handleClickUpdate(id, name) {
  store.dispatch(toggleEditName());
  store.dispatch(updateEditName(name));
  await putProject(id, {name: name});
  const projects = await getProjects(localStorage.getItem('user_id'));
  store.dispatch(setProjects(projects));
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

const Button = styled.button`
  width: 60px;
  height: 20px;
  color: #1c1c1c;
  border: 1px solid #1c1c1c;
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
    props.disabled &&
    css`
      opacity: 0.5;
    `}
`;

export {ProjectInfo};
