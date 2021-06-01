import React from 'react';
import styled, {css} from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {
  setFurnitureRotation,
  removeCanvasElement,
} from '../../../app/actions/index.js';

function GroupInfo() {
  const {selectedGroup} = useSelector((state) => state.project);
  const dispatch = useDispatch();

  return (
    <Div>
      <ImgDiv>
        <Img />
      </ImgDiv>
      <Content>
        <NameText>{selectedGroup.name}</NameText>
        <IdText>{selectedGroup.id}</IdText>
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

export {GroupInfo};
