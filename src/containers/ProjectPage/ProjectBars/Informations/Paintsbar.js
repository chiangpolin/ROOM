import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled, {css} from 'styled-components';
import {setWallColor} from '../../../../actions/index.js';
import * as theme from '../../../../constants/theme.js';

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
            <img style={{backgroundColor: `${paint.code}`}} alt=""></img>
            <h3>{paint.name}</h3>
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

  @media (max-width: 767px) {
    display: none;
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
    border: 1px solid ${theme.MINESHAFT};
    cursor: pointer;
  }

  ${(props) =>
    props.primary &&
    css`
      border: 1px solid ${theme.MINESHAFT};
    `}

  img {
    width: 100%;
    height: 80px;
  }

  h3 {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 14px;
  }

  p {
    font-family: 'Open Sans', sans-serif;
    font-weight: 300;
    font-size: 14px;
  }
`;

export {Paintsbar};
