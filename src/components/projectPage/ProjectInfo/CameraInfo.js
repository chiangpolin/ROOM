import React from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {setCameraPosition} from '../../../app/actions/index.js';

function CameraInfo() {
  const {cameras} = useSelector((state) => state.project);
  const dispatch = useDispatch();

  return (
    <Div>
      <ImgDiv>
        <Img />
      </ImgDiv>
      <Content>
        <NameText>{cameras[0].name}</NameText>
        <InputDiv>
          <p>x:</p>

          <Input
            type="number"
            value={cameras[0].position.x}
            onChange={(event) =>
              handlePositionChange(event, dispatch, cameras[0], 'x')
            }
          ></Input>
        </InputDiv>
        <InputDiv>
          <p>y:</p>

          <Input
            type="number"
            value={cameras[0].position.y}
            onChange={(event) =>
              handlePositionChange(event, dispatch, cameras[0], 'y')
            }
          ></Input>
        </InputDiv>
        <InputDiv>
          <p>z_index:</p>

          <Input
            type="number"
            value={cameras[0].position.z_index}
            onChange={(event) =>
              handlePositionChange(event, dispatch, cameras[0], 'z')
            }
          ></Input>
        </InputDiv>
      </Content>
    </Div>
  );
}

function handlePositionChange(event, dispatch, camera, tag) {
  switch (tag) {
    case 'x':
      dispatch(
        setCameraPosition({
          x: event.target.value,
          y: camera.position.y,
          z_index: camera.position.z_index,
        })
      );
      break;
    case 'y':
      dispatch(
        setCameraPosition({
          x: camera.position.x,
          y: event.target.value,
          z_index: camera.position.z_index,
        })
      );
      break;
    case 'z':
      dispatch(
        setCameraPosition({
          x: camera.position.x,
          y: camera.position.y,
          z_index: event.target.value,
        })
      );
      break;
    default:
      dispatch(
        setCameraPosition({
          x: camera.position.x,
          y: camera.position.y,
          z_index: camera.position.z_index,
        })
      );
  }
}

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

const Div = styled.div`
  width: 300px;
  border-right: 1px solid #1c1c1c;
`;

const Content = styled.div`
  margin: 0 30px;
`;

const NameText = styled.p`
  font-size: 24px;
`;

const InputDiv = styled.div`
  display: flex;
  margin: 10px 0;
  p {
    width: 80px;
  }
`;

const Input = styled.input`
  padding: 0 10px;
  width: 160px;
  font-size: 14px;
`;

export {CameraInfo};
