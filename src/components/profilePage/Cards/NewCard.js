import React from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {createProject} from '../../../app/actions/index.js';
import * as theme from '../../../app/constants/theme.js';

function NewCard(props) {
  const {id} = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  return (
    <Item>
      <ItemImg
        src={props.imageURL}
        onClick={() => {
          dispatch(createProject(id, props.name));
        }}
      />
      <p>{props.name}</p>
    </Item>
  );
}

const Item = styled.div`
  padding: 0 0 5px;
  width: 100%;
  border: none;
  background-color: '#ffffff';
  border-radius: 10px;
  background-color: ${theme.WHITE};

  p {
    padding: 0 0 0 10px;
    overflow: hidden;
  }
`;

const ItemImg = styled.img`
  width: 100%;
  opacity: 0.8;
  background-color: #bdc0ba;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  :hover {
    cursor: pointer;
    opacity: 1;
  }
`;

export {NewCard};
