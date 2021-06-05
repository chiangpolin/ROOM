import React from 'react';
import styled, {css} from 'styled-components';
import * as theme from '../../../../app/constants/theme.js';
import {useSelector, useDispatch} from 'react-redux';
import {addCanvasElement} from '../../../../app/actions/index.js';

function Furnituresbar() {
  const {setting} = useSelector((state) => state.project);
  const dispatch = useDispatch();

  return (
    <Div>
      <Container>
        {setting.furnitures.map((furniture, index) => (
          <Item
            key={index}
            onClick={() => {
              dispatch(addCanvasElement('furniture', furniture));
            }}
          >
            <img></img>
            <p>{furniture.name}</p>
            <p>
              {furniture.dimension.width} x {furniture.dimension.height}
            </p>
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
    background-color: #bdc0ba;
  }

  p {
    font-size: 14px;
  }
`;

export {Furnituresbar};
