import React from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import * as theme from '../../../app/constants/theme.js';
import {setCanvasScale} from '../../../app/actions/index.js';
import {ReactComponent as PlusIcon} from '../../../static/images/icons/plus.svg';
import {ReactComponent as DashIcon} from '../../../static/images/icons/dash.svg';

function Zooms() {
  const {scale} = useSelector((state) => state.project);
  const dispatch = useDispatch();

  return (
    <Div>
      <button
        onClick={() =>
          dispatch(setCanvasScale(scale >= 5.25 ? 5.25 : scale + 0.25))
        }
      >
        <PlusIcon width="24" height="24" />
      </button>
      <button
        onClick={() =>
          dispatch(setCanvasScale(scale <= 0.25 ? 0.25 : scale - 0.25))
        }
      >
        <DashIcon width="24" height="24" />
      </button>
    </Div>
  );
}

const Div = styled.div`
  position: absolute;
  top: 90px;
  right: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50px;
  border: 0;
  border-radius: 5px;

  button {
    margin: 5px auto;
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 5px;
    box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
    background-color: ${theme.WHITE};

    :hover {
      cursor: pointer;
      color: white;
      background-color: ${theme.RURI};
    }
  }
`;

export {Zooms};
