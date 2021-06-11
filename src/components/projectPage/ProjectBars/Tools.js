import React from 'react';
import styled, {css} from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {setCanvasTool, setCanvasOrtho} from '../../../app/actions';
import * as theme from '../../../app/constants/theme.js';
import {ReactComponent as BoxIcon} from '../../../static/images/icons/box.svg';
import {ReactComponent as SquareIcon} from '../../../static/images/icons/square.svg';
import {ReactComponent as PentagonIcon} from '../../../static/images/icons/pentagon.svg';
import {ReactComponent as SquareFillIcon} from '../../../static/images/icons/square-fill.svg';
import {ReactComponent as PentagonFillIcon} from '../../../static/images/icons/pentagon-fill.svg';
import {ReactComponent as SlashIcon} from '../../../static/images/icons/slash-lg.svg';
import {ReactComponent as PencilIcon} from '../../../static/images/icons/pencil.svg';
import {ReactComponent as XIcon} from '../../../static/images/icons/x.svg';
import {ReactComponent as RulersIcon} from '../../../static/images/icons/rulers.svg';

function Tools() {
  const user_id = useSelector((state) => state.profile.id);
  const {author_id, tool, ortho} = useSelector((state) => state.project);
  const dispatch = useDispatch();

  return user_id === author_id ? (
    <Div>
      <Tool onClick={() => dispatch(setCanvasOrtho())} primary={ortho === true}>
        <RulersIcon width="24" height="24"></RulersIcon>
        <p>Ortho</p>
      </Tool>
      <p> | </p>
      <Tool onClick={() => dispatch(setCanvasTool(''))}>
        <XIcon width="24" height="24"></XIcon>
        <p>None</p>
      </Tool>
      <Tool
        onClick={() => dispatch(setCanvasTool('line'))}
        primary={tool === 'line'}
      >
        <SlashIcon width="24" height="24"></SlashIcon>
        <p>Wall</p>
      </Tool>
      <Tool
        onClick={() => dispatch(setCanvasTool('polyline'))}
        primary={tool === 'polyline'}
      >
        <PencilIcon width="24" height="24"></PencilIcon>
        <p>P-Wall</p>
      </Tool>
      <Tool
        onClick={() => dispatch(setCanvasTool('filled-rectangle'))}
        primary={tool === 'filled-rectangle'}
      >
        <SquareFillIcon width="24" height="24"></SquareFillIcon>
        <p>Cover</p>
      </Tool>
      <Tool
        onClick={() => dispatch(setCanvasTool('filled-polygon'))}
        primary={tool === 'filled-polygon'}
      >
        <PentagonFillIcon width="24" height="24"></PentagonFillIcon>
        <p>P-Cover</p>
      </Tool>
      <Tool
        onClick={() => dispatch(setCanvasTool('rectangle'))}
        primary={tool === 'rectangle'}
      >
        <SquareIcon width="24" height="24"></SquareIcon>
        <p>Floor</p>
      </Tool>
      <Tool
        onClick={() => dispatch(setCanvasTool('polygon'))}
        primary={tool === 'polygon'}
      >
        <PentagonIcon width="24" height="24"></PentagonIcon>
        <p>P-Floor</p>
      </Tool>
      <Tool
        onClick={() => dispatch(setCanvasTool('frame'))}
        primary={tool === 'frame'}
      >
        <BoxIcon width="24" height="24"></BoxIcon>
        <p>Room</p>
      </Tool>
      <Tool
        onClick={() => dispatch(setCanvasTool('polygon-frame'))}
        primary={tool === 'polygon-frame'}
      >
        <BoxIcon width="24" height="24"></BoxIcon>
        <p>P-Room</p>
      </Tool>
    </Div>
  ) : (
    ''
  );
}

const Div = styled.div`
  position: absolute;
  bottom: 20px;
  left: 15px;
  z-index: 10;
  display: flex;
  align-items: center;
  padding: 0 10px;
  height: 50px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  background-color: ${theme.WHITE};

  p {
    margin: 0 15px;
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

const Tool = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border: none;
  background-color: transparent;

  :hover {
    cursor: pointer;
    color: ${theme.KASHMIRBLUE};
  }

  :hover p {
    visibility: visible;
    opacity: 1;
  }

  p {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.3s;
    position: absolute;
    bottom: 100%;
    width: 60px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 14px;
    border-radius: 5px;
    color: ${theme.WHITE};
    background-color: ${theme.MINESHAFT};

    ::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: #555 transparent transparent transparent;
    }
  }

  ${(props) =>
    props.primary &&
    css`
      color: ${theme.KASHMIRBLUE};
    `}
`;

export {Tools};
