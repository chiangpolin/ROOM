import React from 'react';
import styled, {css} from 'styled-components';
import * as theme from '../../../../app/constants/theme.js';
import {useSelector, useDispatch} from 'react-redux';
import {
  setFurnitureRotation,
  removeCanvasElement,
} from '../../../../app/actions/index.js';

function Groupbar() {
  const {selectedGroup} = useSelector((state) => state.project);
  const dispatch = useDispatch();

  return (
    <Div>
      <ImgDiv>
        <img />
      </ImgDiv>
      <Content>
        <h3>{selectedGroup.name}</h3>
        <p>{selectedGroup.id}</p>
        <Buttons>
          <Button
            primary
            disabled={selectedGroup.type !== 'furniture'}
            onClick={() => handleClickRotate(dispatch, selectedGroup)}
          >
            Rotate
          </Button>
          <Button
            danger
            onClick={() => handleClickDelete(dispatch, selectedGroup)}
          >
            Delete
          </Button>
        </Buttons>
      </Content>
    </Div>
  );
}

function handleClickRotate(dispatch, group) {
  switch (group.type) {
    case 'furniture':
      dispatch(
        setFurnitureRotation(group.id, {
          angle: group.rotation.angle + 90,
        })
      );
      break;
    default:
  }
}

function handleClickDelete(dispatch, group) {
  switch (group.type) {
    case 'furniture':
      dispatch(removeCanvasElement('furniture', group.id));
      break;
    case 'wall':
      dispatch(removeCanvasElement('wall', group.id));
      break;
    case 'window':
      dispatch(removeCanvasElement('opening', group.id));
      break;
    case 'door':
      dispatch(removeCanvasElement('opening', group.id));
      break;
    case 'covering':
      dispatch(removeCanvasElement('covering', group.id));
      break;
    case 'floor':
      dispatch(removeCanvasElement('floor', group.id));
      break;
    default:
  }
}

const Div = styled.div`
  position: absolute;
  top: 100px;
  left: 80px;
  z-index: 10;
  width: 240px;
  height: 330px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  background-color: ${theme.WHITE};

  @media (max-width: 1024px) {
  }
`;

const ImgDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0;

  img {
    width: 120px;
    height: 120px;
    background-color: #bdc0ba;
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

const Buttons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0 10px;
  margin: 15px 0 0;
`;

const Button = styled.button`
  width: 100%;
  height: 30px;
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

export {Groupbar};
