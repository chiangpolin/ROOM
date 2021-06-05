import React from 'react';
import styled, {css} from 'styled-components';
import * as theme from '../../../app/constants/theme.js';
import {useSelector, useDispatch} from 'react-redux';
import {setInformation} from '../../../app/actions/index.js';
import {ReactComponent as GearIcon} from '../../../static/images/icons/gear.svg';
import {ReactComponent as InfoCircleIcon} from '../../../static/images/icons/info-circle.svg';
import {ReactComponent as InboxesIcon} from '../../../static/images/icons/inboxes.svg';
import {ReactComponent as PaletteIcon} from '../../../static/images/icons/palette2.svg';
import {ReactComponent as CameraIcon} from '../../../static/images/icons/camera-reels.svg';
import {ReactComponent as BricksIcon} from '../../../static/images/icons/bricks.svg';

function Sidebar() {
  const {information} = useSelector((state) => state.project);
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
      </SideButton>
      <SideButton
        primary={information === 'paint'}
        onClick={() =>
          information === 'paint'
            ? dispatch(setInformation(''))
            : dispatch(setInformation('paint'))
        }
      >
        <PaletteIcon width="24" height="24" />
      </SideButton>
      <SideButton
        primary={information === 'furniture'}
        onClick={() =>
          information === 'furniture'
            ? dispatch(setInformation(''))
            : dispatch(setInformation('furniture'))
        }
      >
        <InboxesIcon width="24" height="24" />
      </SideButton>
      <SideButton
        primary={information === 'texture'}
        onClick={() =>
          information === 'texture'
            ? dispatch(setInformation(''))
            : dispatch(setInformation('texture'))
        }
      >
        <BricksIcon width="24" height="24" />
      </SideButton>
      <SideButton
        primary={information === 'camera'}
        onClick={() =>
          information === 'camera'
            ? dispatch(setInformation(''))
            : dispatch(setInformation('camera'))
        }
      >
        <CameraIcon width="24" height="24" />
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
      color: ${theme.RURI};
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
    color: ${theme.RURI};
  }

  ${(props) =>
    props.primary &&
    css`
      color: ${theme.RURI};
    `}
`;

export {Sidebar};
