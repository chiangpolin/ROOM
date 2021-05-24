import React from 'react';
import styled, {css} from 'styled-components';
import {useParams} from 'react-router';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectFurniture,
  setFurnitureRotation,
  deleteFurniture,
} from '../../../app/actions/index.js';

function GroupInfo() {
  let {id} = useParams();
  const {selectedFurniture} = useSelector((state) => state.project);
  const dispatch = useDispatch();

  return (
    <Div>
      <ImgDiv>
        <Img />
      </ImgDiv>
      <Content>
        <NameText>{selectedFurniture.name}</NameText>
        <IdText>{selectedFurniture.id}</IdText>
        <Buttons>
          <Button
            primary
            onClick={() => handleClickRotate(dispatch, selectedFurniture)}
          >
            Rotate
          </Button>
          <Button
            danger
            onClick={() => handleClickDelete(dispatch, id, selectedFurniture)}
          >
            Delete
          </Button>
        </Buttons>
      </Content>
    </Div>
  );
}

function handleClickRotate(dispatch, furniture) {
  const newAngle = furniture.rotation.angle + 90;
  const newFurniture = {...furniture, rotation: {angle: newAngle}};
  dispatch(
    setFurnitureRotation(newFurniture, {
      type: 'rotate',
      furniture: newFurniture,
    })
  );
  dispatch(selectFurniture(newFurniture));
}

function handleClickDelete(dispatch, project_id, furniture) {
  dispatch(deleteFurniture(project_id, furniture));
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
