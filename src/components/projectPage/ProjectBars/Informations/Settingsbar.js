import React, {useState} from 'react';
import styled from 'styled-components';
import * as theme from '../../../../app/constants/theme.js';
import {useDispatch, useSelector} from 'react-redux';
import {setBackgroundColor} from '../../../../app/actions/index.js';

function Settingsbar() {
  const {sceneBackgroundColor} = useSelector((state) => state.project);
  const [color, setColor] = useState(sceneBackgroundColor);
  const dispatch = useDispatch();

  return (
    <Div>
      <InputDiv>
        <Name>Scale</Name>
        <Input type="range" min="0.25" max="5" value="2.5" />
      </InputDiv>
      <InputDiv>
        <Name>D-Light</Name>
        <Input type="range" min="0.25" max="5" value="2.5" />
      </InputDiv>
      <InputDiv>
        <Name>H-Light</Name>
        <Input type="range" min="0.25" max="5" value="2.5" />
      </InputDiv>
      <InputDiv>
        <Name>Background</Name>
        <Input
          type="color"
          value={color}
          onChange={(event) => {
            handleChange(event, setColor);
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

  @media (max-width: 1024px) {
  }

  p {
    margin: 0 15px;
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
`;

const Name = styled.p`
  font-size: 16px;
  width: 100px;
`;

export {Settingsbar};
