import React from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {setCameraPosition} from '../../../app/actions';

function CameraInfo() {
  const dispatch = useDispatch();
  const camera = useSelector((state) => state.project.camera);

  return (
    <Div>
      <ImgDiv>
        <Img />
      </ImgDiv>
      <Content>
        <NameText>{camera.name}</NameText>
        <InputDiv>
          x:
          <Input
            type="number"
            value={camera.position.x}
            onChange={(event) =>
              handlePositionChange(event, dispatch, camera, 'x')
            }
          ></Input>
        </InputDiv>
        <InputDiv>
          y:
          <Input
            type="number"
            value={camera.position.y}
            onChange={(event) =>
              handlePositionChange(event, dispatch, camera, 'y')
            }
          ></Input>
        </InputDiv>
        <InputDiv>
          z_index:
          <Input
            type="number"
            value={camera.position.z_index}
            onChange={(event) =>
              handlePositionChange(event, dispatch, camera, 'z')
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

const InputDiv = styled.div``;

const Input = styled.input``;

export {CameraInfo};
