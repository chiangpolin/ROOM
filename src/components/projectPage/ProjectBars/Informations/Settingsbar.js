import React, {useState} from 'react';
import styled from 'styled-components';
import * as theme from '../../../../app/constants/theme.js';
import {useSelector, useDispatch} from 'react-redux';
import {
  setCanvasScale,
  setDirectionalLight,
  setHemisphereLight,
  setBackgroundColor,
} from '../../../../app/actions/index.js';

function Settingsbar() {
  const {
    scale,
    sceneBackgroundColor,
    sceneDirectionalLight,
    sceneHemisphereLight,
  } = useSelector((state) => state.project);
  const [scaleInput, setScaleInput] = useState(scale);
  const [dLightInput, setDLightInput] = useState(sceneDirectionalLight);
  const [hLightInput, setHLightInput] = useState(sceneHemisphereLight);
  const [colorInput, setColorInput] = useState(sceneBackgroundColor);
  const dispatch = useDispatch();

  return (
    <Div>
      <InputDiv>
        <Name>Scale</Name>
        <Input
          type="range"
          min="0.25"
          max="5.25"
          step="0.25"
          value={scaleInput}
          onChange={(event) => {
            handleChange(event, setScaleInput);
            dispatch(setCanvasScale(event.target.value));
          }}
        />
      </InputDiv>
      <InputDiv>
        <Name>D-Light</Name>
        <Input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={dLightInput}
          onChange={(event) => {
            handleChange(event, setDLightInput);
            dispatch(setDirectionalLight(event.target.value));
          }}
        />
      </InputDiv>
      <InputDiv>
        <Name>H-Light</Name>
        <Input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={hLightInput}
          onChange={(event) => {
            handleChange(event, setHLightInput);
            dispatch(setHemisphereLight(event.target.value));
          }}
        />
      </InputDiv>
      <InputDiv>
        <Name>Background</Name>
        <Input
          type="color"
          value={colorInput}
          onChange={(event) => {
            handleChange(event, setColorInput);
            dispatch(setBackgroundColor(event.target.value));
          }}
        />
      </InputDiv>
    </Div>
  );
}

function handleChange(event, setValue) {
  setValue(event.target.value);
}

const Div = styled.div`
  position: absolute;
  top: 100px;
  left: 80px;
  z-index: 10;
  padding: 15px 5px;
  width: 300px;
  height: 200px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  background-color: ${theme.WHITE};

  @media (max-width: 767px) {
    display: none;
  }
`;

const InputDiv = styled.div`
  display: flex;
  margin: 15px 0;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  margin: 0 10px 0 0;
  background-color: transparent;
  cursor: pointer;
`;

const Name = styled.p`
  margin: 0 15px;
  width: 100px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  font-size: 16px;
`;

export {Settingsbar};
