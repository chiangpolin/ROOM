import React from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import {AlertCard} from './AlertCard.js';

function Alert() {
  const {messages} = useSelector((state) => state.auth);

  return (
    <Div>
      {messages.map((message) => (
        <AlertCard message={message}></AlertCard>
      ))}
    </Div>
  );
}

const Div = styled.div`
  position: fixed;
  bottom: 30px;
  right: 15px;
  z-index: 50;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 767px) {
    display: none;
  }
`;

export {Alert};
