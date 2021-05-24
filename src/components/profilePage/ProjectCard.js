import React from 'react';
import styled, {css} from 'styled-components';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {selectProject} from '../../app/actions/index.js';

function ProjectCard(props) {
  const {selectedProject} = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  return (
    <Item
      primary={selectedProject.id === props.id}
      onClick={() => handleSelect(dispatch, props, selectedProject)}
    >
      <Link to={`/project/${props.id}`}>
        <ItemImg />
      </Link>
      <p>{props.name}</p>
      <p>{props.author_id}</p>
    </Item>
  );
}

function handleSelect(dispatch, project, selectedProject) {
  if (selectedProject.id !== project.id) {
    dispatch(
      selectProject({
        id: project.id,
        name: project.name,
        author_id: project.author_id,
      })
    );
  }
}

const Item = styled.div`
  width: 100%;
  border: none;
  background-color: '#ffffff';
  border: 1px solid #ffffff;

  :hover {
    border: 1px solid #1c1c1c;
    cursor: pointer;
  }

  ${(props) =>
    props.primary &&
    css`
      border: 1px solid #1c1c1c;
    `}
`;

const ItemImg = styled.img`
  width: 100%;
  height: 150px;
  background-color: #bdc0ba;
  cursor: pointer;
`;

export {ProjectCard};
