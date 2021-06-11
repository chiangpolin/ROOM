import React from 'react';
import styled, {css} from 'styled-components';
import * as theme from '../../../app/constants/theme.js';
import {useSelector, useDispatch} from 'react-redux';
import {setInformation} from '../../../app/actions/index.js';
import {ReactComponent as GearIcon} from '../../../static/images/icons/gear.svg';
import {ReactComponent as InfoCircleIcon} from '../../../static/images/icons/info-circle.svg';
import {ReactComponent as ShopIcon} from '../../../static/images/icons/shop.svg';
import {ReactComponent as WindowIcon} from '../../../static/images/icons/shop-window.svg';
import {ReactComponent as PaletteIcon} from '../../../static/images/icons/palette.svg';
import {ReactComponent as BricksIcon} from '../../../static/images/icons/bricks.svg';
import {ReactComponent as CameraIcon} from '../../../static/images/icons/camera-reels.svg';

function Sidebar() {
  const {information, selectedGroup} = useSelector((state) => state.project);
  const dispatch = useDispatch();

  return (
    <Div>
      <SideButton
        primary={information === 'settings'}
        onClick={() =>
          information === 'settings'
            ? dispatch(setInformation(''))
            : dispatch(setInformation('settings'))
        }
      >
        <GearIcon width="24" height="24" />
        <p>Settings</p>
      </SideButton>
      <SideButton
        primary={information === 'group'}
        onClick={() =>
          information === 'group'
            ? dispatch(setInformation(''))
            : dispatch(setInformation('group'))
        }
      >
        <InfoCircleIcon width="24" height="24" />
        <p>Group</p>
      </SideButton>
      <div className="step-1">
        <SideButton
          primary={information === 'furniture'}
          onClick={() =>
            information === 'furniture'
              ? dispatch(setInformation(''))
              : dispatch(setInformation('furniture'))
          }
        >
          <ShopIcon width="24" height="24" />
          <p>Furnitures</p>
        </SideButton>
      </div>
      <SideButton
        primary={information === 'opening'}
        onClick={() =>
          information === 'opening'
            ? dispatch(setInformation(''))
            : dispatch(setInformation('opening'))
        }
      >
        <WindowIcon width="24" height="24"></WindowIcon>
        <p>Openings</p>
      </SideButton>
      <div className="step-2">
        <SideButton
          disabled={selectedGroup.type !== 'wall'}
          primary={information === 'paint'}
          onClick={() =>
            selectedGroup.type === 'wall'
              ? information === 'paint'
                ? dispatch(setInformation(''))
                : dispatch(setInformation('paint'))
              : ''
          }
        >
          <PaletteIcon width="24" height="24" />
          <p>Paints</p>
        </SideButton>
      </div>
      <div className="step-3">
        <SideButton
          disabled={selectedGroup.type !== 'covering'}
          primary={information === 'texture'}
          onClick={() =>
            selectedGroup.type === 'covering'
              ? information === 'texture'
                ? dispatch(setInformation(''))
                : dispatch(setInformation('texture'))
              : ''
          }
        >
          <BricksIcon width="24" height="24" />
          <p>Textures</p>
        </SideButton>
      </div>
      <SideButton
        primary={information === 'camera'}
        onClick={() =>
          information === 'camera'
            ? dispatch(setInformation(''))
            : dispatch(setInformation('camera'))
        }
      >
        <CameraIcon width="24" height="24" />
        <p>Camera</p>
      </SideButton>
    </Div>
  );
}

const Div = styled.div`
  position: absolute;
  top: 100px;
  left: 15px;
  z-index: 10;
  padding: 15px 5px;
  width: 60px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  background-color: ${theme.WHITE};

  p {
    margin: 0 15px;
  }

  button {
    font-family: 'Varela Round';
    font-weight: 600;
    border: none;
    cursor: pointer;
    background-color: transparent;

    h1 {
      font-size: 28px;
      line-height: 28px;
    }

    h3 {
      font-size: 20px;
      line-height: 20px;
    }

    :hover {
      color: ${theme.KASHMIRBLUE};
    }
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

const SideButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: white;

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
    left: 75%;
    width: 80px;
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
      top: 35%;
      right: 100%;
      border-width: 5px;
      border-style: solid;
      border-color: transparent #555 transparent transparent;
    }
  }

  ${(props) =>
    props.primary &&
    css`
      color: ${theme.KASHMIRBLUE};
    `}

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;

      :hover {
        cursor: pointer;
        color: ${theme.MINESHAFT};
      }
    `}
`;

export {Sidebar};
