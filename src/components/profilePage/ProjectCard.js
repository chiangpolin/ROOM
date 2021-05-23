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
      onClick={() => {
        if (selectedProject.id === props.id) {
          dispatch(selectProject({id: '', name: '', author_id: ''}));
        } else {
          dispatch(
            selectProject({
              id: props.id,
              name: props.name,
              author_id: props.author_id,
            })
          );
        }
      }}
    >
      <Link to={`/project/${props.id}`}>
        <ItemImg />
      </Link>
      <p>{props.name}</p>
      <p>{props.author_id}</p>
    </Item>
  );
}

const Item = styled.div`
  width: 100%;
  border: none;
  background-color: '#ffffff';

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
