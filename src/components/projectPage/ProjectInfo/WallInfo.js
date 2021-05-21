import React from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {setRoomColor} from '../../../app/actions';

function WallInfo() {
  const dispatch = useDispatch();
  const room = useSelector((state) => state.project.room);

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

function hexToRGB(h) {
  let r = 0,
    g = 0,
    b = 0;

  // 3 digits
  if (h.length === 4) {
    r = '0x' + h[1] + h[1];
    g = '0x' + h[2] + h[2];
    b = '0x' + h[3] + h[3];

    // 6 digits
  } else if (h.length === 7) {
    r = '0x' + h[1] + h[2];
    g = '0x' + h[3] + h[4];
    b = '0x' + h[5] + h[6];
  }

  return {r: +r, g: +g, b: +b};
}

function RGBToHex(r, g, b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length === 1) r = '0' + r;
  if (g.length === 1) g = '0' + g;
  if (b.length === 1) b = '0' + b;

  return '#' + r + g + b;
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
