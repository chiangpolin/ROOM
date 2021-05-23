import React from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {setRoomColor} from '../../../app/actions/index.js';
import {hexToRGB, RGBToHex} from '../../../app/utils/index.js';

function WallInfo() {
  const {room} = useSelector((state) => state.project);
  const dispatch = useDispatch();

  return (
    <Div>
      <ImgDiv>
        <Img />
      </ImgDiv>
      <Content>
        <NameText>{room.name}</NameText>
        <IdText>{room.id}</IdText>
        <Colors>
          <Color>{room.color.r}</Color>
          <Color>{room.color.g}</Color>
          <Color>{room.color.b}</Color>
        </Colors>
        <Label>
          Name
          <Input
            type="color"
            value={RGBToHex(room.color.r, room.color.g, room.color.b)}
            onChange={(event) => handleColorChange(event, dispatch)}
          ></Input>
        </Label>
      </Content>
    </Div>
  );
}

function handleColorChange(event, dispatch) {
  dispatch(setRoomColor(hexToRGB(event.target.value)));
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

const IdText = styled.p`
  font-size: 16px;
`;

const Colors = styled.div``;

const Color = styled.p`
  font-size: 14px;
`;

const Label = styled.label``;

const Input = styled.input``;

export {WallInfo};
