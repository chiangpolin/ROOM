import React from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import * as theme from '../../../../app/constants/theme.js';
import {OpeningsItem} from './OpeningsItem.js';

function Openingsbar() {
  const {setting} = useSelector((state) => state.project);

  return (
    <Div>
      <Container>
        {setting.openings.map((opening, index) => (
          <OpeningsItem key={index} opening={opening}></OpeningsItem>
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
`;

const Container = styled.div`
  margin: 20px 15px 5px;
`;

export {Openingsbar};
