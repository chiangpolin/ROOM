import React from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import {FurnituresItem} from './FurnituresItem.js';
import * as theme from '../../../../app/constants/theme.js';

function Furnituresbar() {
  const {setting} = useSelector((state) => state.project);

  return (
    <Div>
      <Container>
        {setting.furnitures.map((furniture, index) => (
          <FurnituresItem key={index} furniture={furniture}></FurnituresItem>
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

  @media (max-width: 767px) {
    display: none;
  }
`;

const Container = styled.div`
  margin: 20px 15px 5px;
`;

export {Furnituresbar};
