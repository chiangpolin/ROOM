import React from 'react';
import styled, {css} from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectGroup,
  removeGroup,
  setGroupRotation,
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
        <Button
          primary
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
      </Content>
    </Div>
  );
}

function handleClickRotate(dispatch, group) {
  const newAngle = group.rotation.angle + 90;
  const newGroup = {...group, rotation: {angle: newAngle}};
  dispatch(
    setGroupRotation(newGroup, {
      type: 'rotate',
      group: newGroup,
    })
  );
  dispatch(selectGroup(newGroup));
}

function handleClickDelete(dispatch, group) {
  dispatch(removeGroup(group, {type: 'remove', group}));
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
