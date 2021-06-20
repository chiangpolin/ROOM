import React from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import {removeMessage} from '../../actions/index.js';
import * as theme from '../../constants/theme.js';
import {ReactComponent as X} from '../../assets/images/icons/x.svg';

function AlertCard(props) {
  const dispatch = useDispatch();

  return (
    <Div>
      <p>{props.message.text}</p>
      <button
        data-testid={props.message.id}
        onClick={() => dispatch(removeMessage(props.message))}
      >
        <X width="24" height="24"></X>
      </button>
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;
  padding: 10px 15px;
  width: 360px;
  min-height: 50px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  color: ${theme.WHITE};
  background-color: ${theme.MINESHAFT};
  opacity: 0;
  overflow: hidden;

  animation-duration: 5s;
  animation-name: slidein;

  @keyframes slidein {
    0% {
      opacity: 0.8;
      margin-left: 100%;
    }
    15% {
      opacity: 0.8;
      margin-left: 0%;
    }
    70% {
      opacity: 0.8;
    }
    100% {
      opacity: 0;
    }
  }

  p {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 16px;
  }

  button {
    border: none;
    color: ${theme.WHITE};
    background-color: transparent;

    :hover {
      cursor: pointer;
    }
  }
`;

export {AlertCard};
