import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import {setCameraPosition} from '../../../../actions/index.js';
import * as theme from '../../../../constants/theme.js';

function Camerabar() {
  const {d_cameras} = useSelector((state) => state.project);
  const dispatch = useDispatch();

  return (
    <Div>
      <InputDiv>
        <p>x:</p>
        <input
          type="number"
          value={d_cameras[0].position.x}
          onChange={(event) =>
            dispatch(
              setCameraPosition(d_cameras[0].id, {
                x: event.target.value,
                y: d_cameras[0].position.y,
                z_index: d_cameras[0].position.z_index,
              })
            )
          }
        ></input>
      </InputDiv>
      <InputDiv>
        <p>y:</p>
        <input
          type="number"
          value={d_cameras[0].position.y}
          onChange={(event) =>
            dispatch(
              setCameraPosition(d_cameras[0].id, {
                x: d_cameras[0].position.x,
                y: event.target.value,
                z_index: d_cameras[0].position.z_index,
              })
            )
          }
        ></input>
      </InputDiv>
      <InputDiv>
        <p>z_index:</p>
        <input
          type="number"
          value={d_cameras[0].position.z_index}
          onChange={(event) =>
            dispatch(
              setCameraPosition(d_cameras[0].id, {
                x: d_cameras[0].position.x,
                y: d_cameras[0].position.y,
                z_index: event.target.value,
              })
            )
          }
        ></input>
      </InputDiv>
    </Div>
  );
}

const Div = styled.div`
  position: absolute;
  top: 340px;
  left: 80px;
  z-index: 10;
  padding: 15px 5px;
  width: 300px;
  height: 140px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  background-color: ${theme.WHITE};

  @media (max-width: 767px) {
    display: none;
  }

  h3 {
    margin: 0 15px;
    font-size: 24px;
  }
`;

const InputDiv = styled.div`
  display: flex;
  margin: 10px 0;

  p {
    margin: 0 15px;
    width: 80px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 16px;
  }

  input {
    padding: 0 10px;
    width: 160px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 14px;
  }
`;

export {Camerabar};
