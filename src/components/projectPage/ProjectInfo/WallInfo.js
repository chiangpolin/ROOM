import React from 'react';
import styled, {css} from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {setWallColor} from '../../../app/actions/index.js';

function WallInfo() {
  const {setting, walls} = useSelector((state) => state.project);
  const dispatch = useDispatch();

  return (
    <Div>
      <Container>
        {setting.paints.map((paint, index) => (
          <Item
            key={index}
            primary={
              paint.color.r === walls[0].color.r &&
              paint.color.g === walls[0].color.g &&
              paint.color.b === walls[0].color.b
            }
            onClick={() => handleClickPaint(dispatch, paint.color)}
          >
            <ItemImg style={{backgroundColor: `${paint.code}`}}></ItemImg>
            <ItemText>{paint.name}</ItemText>
            <CodeText>{paint.code}</CodeText>
          </Item>
        ))}
      </Container>
    </Div>
  );
}

function handleClickPaint(dispatch, color) {
  dispatch(setWallColor(color));
}

const Div = styled.div`
  width: 300px;
  border-right: 1px solid #1c1c1c;
  overflow-y: scroll;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 15px 15px;
`;

const Item = styled.button`
  width: 100%;
  border: none;
  background-color: transparent;
  border: 1px solid transparent;

  :hover {
    border: 1px solid #1c1c1c;
    cursor: pointer;
  }

  ${(props) =>
    props.primary &&
    css`
      border: 1px solid #1c1c1c;
    `}
`;

const ItemImg = styled.img`
  margin: 10px 0 0;
  width: 80%;
  height: 80px;
`;

const ItemText = styled.p`
  margin: 5px 0;
  font-size: 16px;
`;

const CodeText = styled.p`
  font-size: 14px;
`;

export {WallInfo};
