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
      </Tool>
      <p> | </p>
      <Tool onClick={() => dispatch(setCanvasTool(''))}>
        <XIcon width="24" height="24"></XIcon>
      </Tool>
      <Tool
        onClick={() => dispatch(setCanvasTool('line'))}
        primary={tool === 'line'}
      >
        <SlashIcon width="24" height="24"></SlashIcon>
      </Tool>
      <Tool
        onClick={() => dispatch(setCanvasTool('polyline'))}
        primary={tool === 'polyline'}
      >
        <PencilIcon width="24" height="24"></PencilIcon>
      </Tool>
      <Tool
        onClick={() => dispatch(setCanvasTool('filled-rectangle'))}
        primary={tool === 'filled-rectangle'}
      >
        <SquareFillIcon width="24" height="24"></SquareFillIcon>
      </Tool>
      <Tool
        onClick={() => dispatch(setCanvasTool('filled-polygon'))}
        primary={tool === 'filled-polygon'}
      >
        <PentagonFillIcon width="24" height="24"></PentagonFillIcon>
      </Tool>
      <Tool
        onClick={() => dispatch(setCanvasTool('rectangle'))}
        primary={tool === 'rectangle'}
      >
        <SquareIcon width="24" height="24"></SquareIcon>
      </Tool>
      <Tool
        onClick={() => dispatch(setCanvasTool('polygon'))}
        primary={tool === 'polygon'}
      >
        <PentagonIcon width="24" height="24"></PentagonIcon>
      </Tool>
      <Tool
        onClick={() => dispatch(setCanvasTool('frame'))}
        primary={tool === 'frame'}
      >
        <BoxIcon width="24" height="24"></BoxIcon>
      </Tool>
      <Tool
        onClick={() => dispatch(setCanvasTool('polygon-frame'))}
        primary={tool === 'polygon-frame'}
      >
        <BoxIcon width="24" height="24"></BoxIcon>
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
    color: ${theme.RURI};
  }

  ${(props) =>
    props.primary &&
    css`
      color: ${theme.RURI};
    `}
`;

export {Tools};
