import React from 'react';
import styled, {css} from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {setCanvasTool} from '../../../app/actions';
import {ReactComponent as BoxIcon} from '../../../static/images/icons/box.svg';
import {ReactComponent as SquareIcon} from '../../../static/images/icons/square.svg';
import {ReactComponent as PentagonIcon} from '../../../static/images/icons/pentagon.svg';
import {ReactComponent as SquareFillIcon} from '../../../static/images/icons/square-fill.svg';
import {ReactComponent as PentagonFillIcon} from '../../../static/images/icons/pentagon-fill.svg';
import {ReactComponent as SlashIcon} from '../../../static/images/icons/slash-lg.svg';
import {ReactComponent as PencilIcon} from '../../../static/images/icons/pencil.svg';

function ToolInfo() {
  const {tool} = useSelector((state) => state.project);
  const dispatch = useDispatch();

  return (
    <Div>
      <Tools>
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
          <p>Polygon Room</p>
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
          <p>Polyline Wall</p>
        </Tool>
        <Tool
          onClick={() => dispatch(setCanvasTool('filled-rectangle'))}
          primary={tool === 'filled-rectangle'}
        >
          <SquareFillIcon width="24" height="24"></SquareFillIcon>
          <p>Floor</p>
        </Tool>
        <Tool
          onClick={() => dispatch(setCanvasTool('filled-polygon'))}
          primary={tool === 'filled-polygon'}
        >
          <PentagonFillIcon width="24" height="24"></PentagonFillIcon>
          <p>Polygon Floor</p>
        </Tool>
        <Tool
          onClick={() => dispatch(setCanvasTool('rectangle'))}
          primary={tool === 'rectangle'}
        >
          <SquareIcon width="24" height="24"></SquareIcon>
          <p>Base</p>
        </Tool>
        <Tool
          onClick={() => dispatch(setCanvasTool('polygon'))}
          primary={tool === 'polygon'}
        >
          <PentagonIcon width="24" height="24"></PentagonIcon>
          <p>Polygon Base</p>
        </Tool>
      </Tools>
    </Div>
  );
}

const Div = styled.div`
  width: 300px;
  border-right: 1px solid #1c1c1c;
`;

const Tools = styled.div``;

const Tool = styled.button`
  display: flex;
  align-items: center;
  padding: 0 30px;
  width: 100%;
  height: 60px;
  border: none;
  background-color: transparent;

  :hover {
    cursor: pointer;
    color: white;
    background-color: black;
  }

  ${(props) =>
    props.primary &&
    css`
      background-color: #bdc0ba;
    `}

  p {
    margin: 0 0 0 30px;
    width: 120px;
    text-align: left;
    font-size: 16px;
  }
`;

export {ToolInfo};
