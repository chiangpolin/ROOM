import React from 'react';
import styled, {css} from 'styled-components';
import * as theme from '../../../../app/constants/theme.js';
import {useSelector, useDispatch} from 'react-redux';
import {setWallColor} from '../../../../app/actions/index.js';

function Paintsbar() {
  const {setting, selectedGroup} = useSelector((state) => state.project);
  const dispatch = useDispatch();

  return (
    <Div>
      <Container>
        {setting.paints.map((paint, index) => (
          <Item
            key={index}
            primary={
              selectedGroup.type === 'wall' &&
              selectedGroup.color.r === paint.color.r &&
              selectedGroup.color.g === paint.color.g &&
              selectedGroup.color.b === paint.color.b
            }
            onClick={() =>
              dispatch(setWallColor(selectedGroup.id, paint.color))
            }
          >
            <img style={{backgroundColor: `${paint.code}`}}></img>
            <p>{paint.name}</p>
            <p>{paint.code}</p>
          </Item>
        ))}
      </Container>
    </Div>
  );
}

const Div = styled.div`
  position: absolute;
  top: 100px;
  left: 80px;
  z-index: 10;
  padding: 0;
  width: 150px;
  height: 65vh;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  background-color: ${theme.WHITE};
  overflow-y: scroll;

  @media (max-width: 1024px) {
  }
`;

const Container = styled.div`
  margin: 20px 15px 5px;
`;

const Item = styled.button`
  justify-content: center;
  margin: 0 0 10px;
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

  img {
    width: 100%;
    height: 80px;
  }

  p {
    font-size: 14px;
  }
`;

export {Paintsbar};
