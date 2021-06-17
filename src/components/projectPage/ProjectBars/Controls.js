import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import {
  setFurnitureRotation,
  setOpeningRotation,
  removeCanvasElement,
} from '../../../app/actions/index.js';
import * as theme from '../../../app/constants/theme.js';
import {ReactComponent as ClockwiseIcon} from '../../../static/images/icons/arrow-clockwise.svg';
import {ReactComponent as CounterClockwiseIcon} from '../../../static/images/icons/arrow-counterclockwise.svg';
import {ReactComponent as TrashIcon} from '../../../static/images/icons/trash.svg';

function Controls() {
  const {selectedGroup} = useSelector((state) => state.project);
  const dispatch = useDispatch();

  return selectedGroup.id ? (
    <Div>
      <Button
        disabled={
          ['furniture', 'window', 'door'].indexOf(selectedGroup.type) < 0
        }
        onClick={() => handleClickRotate(dispatch, selectedGroup)}
      >
        <ClockwiseIcon
          width="24"
          height="24"
          style={{margin: '0'}}
        ></ClockwiseIcon>
      </Button>
      <Button
        disabled={
          ['furniture', 'window', 'door'].indexOf(selectedGroup.type) < 0
        }
        onClick={() => handleClickRotate(dispatch, selectedGroup)}
      >
        <CounterClockwiseIcon
          width="24"
          height="24"
          style={{margin: '0'}}
        ></CounterClockwiseIcon>
      </Button>
      <Button onClick={() => handleClickDelete(dispatch, selectedGroup)}>
        <TrashIcon width="24" height="24" style={{margin: '0'}}></TrashIcon>
      </Button>
    </Div>
  ) : (
    <div></div>
  );
}

function handleClickRotate(dispatch, group) {
  switch (group.type) {
    case 'furniture':
      dispatch(
        setFurnitureRotation(group.id, {
          angle: group.rotation.angle + 90,
        })
      );
      break;
    case 'window':
      dispatch(
        setOpeningRotation(group.id, {
          angle: group.rotation.angle + 90,
        })
      );
      break;
    case 'door':
      dispatch(
        setOpeningRotation(group.id, {
          angle: group.rotation.angle + 90,
        })
      );
      break;
    default:
  }
}

function handleClickDelete(dispatch, group) {
  switch (group.type) {
    case 'furniture':
      dispatch(removeCanvasElement('furniture', group.id));
      break;
    case 'wall':
      dispatch(removeCanvasElement('wall', group.id));
      break;
    case 'window':
      dispatch(removeCanvasElement('opening', group.id));
      break;
    case 'door':
      dispatch(removeCanvasElement('opening', group.id));
      break;
    case 'covering':
      dispatch(removeCanvasElement('covering', group.id));
      break;
    case 'floor':
      dispatch(removeCanvasElement('floor', group.id));
      break;
    default:
  }
}

const Div = styled.div`
  position: absolute;
  right: 100%;
  margin: 0 10px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 18px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  background-color: ${theme.WHITE};

  :hover {
    cursor: pointer;
    color: ${theme.WHITE};
    background-color: ${theme.KASHMIRBLUE};
  }
`;

export {Controls};
