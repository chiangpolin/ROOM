import React from 'react';
import styled, {css} from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {selectProject} from '../../app/actions/index.js';

const Item = styled.div`
  width: 100%;
  border: none;
  background-color: '#ffffff';

  ${(props) =>
    props.primary &&
    css`
      border: 3px solid #1c1c1c;
    `}
`;

const ItemImg = styled.img`
  width: 100%;
  height: 150px;
  background-color: #bdc0ba;
  cursor: pointer;
`;

function ProjectCard(props) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  return (
    <Item
      primary={profile.selectedProject.id === props.id}
      onClick={() => {
        if (profile.selectedProject.id === props.id) {
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
      <Link to="/project">
        <ItemImg />
      </Link>
      <p>{props.name}</p>
      <p>{props.author_id}</p>
    </Item>
  );
}

export {ProjectCard};
