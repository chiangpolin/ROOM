import React from 'react';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {setInformation} from '../../app/actions/index.js';
import {ReactComponent as GearIcon} from '../../static/images/icons/gear.svg';
import {ReactComponent as InfoSquareIcon} from '../../static/images/icons/info-square.svg';
import {ReactComponent as EaselIcon} from '../../static/images/icons/easel.svg';
import {ReactComponent as PaletteIcon} from '../../static/images/icons/palette.svg';
import {ReactComponent as CameraIcon} from '../../static/images/icons/camera-reels.svg';
import {ReactComponent as BricksIcon} from '../../static/images/icons/bricks.svg';
import {ReactComponent as HammerIcon} from '../../static/images/icons/hammer.svg';

function ProjectBar() {
  const dispatch = useDispatch();

  return (
    <Div>
      <SideButton onClick={() => dispatch(setInformation('settings'))}>
        <GearIcon width="24" height="24" />
      </SideButton>
      <SideButton onClick={() => dispatch(setInformation('canvas'))}>
        <InfoSquareIcon width="24" height="24" />
      </SideButton>
      <SideButton onClick={() => dispatch(setInformation('paint'))}>
        <PaletteIcon width="24" height="24" />
      </SideButton>
      <SideButton onClick={() => dispatch(setInformation('furniture'))}>
        <EaselIcon width="24" height="24" />
      </SideButton>
      <SideButton onClick={() => dispatch(setInformation('texture'))}>
        <BricksIcon width="24" height="24" />
      </SideButton>
      <SideButton onClick={() => dispatch(setInformation('camera'))}>
        <CameraIcon width="24" height="24" />
      </SideButton>
      <SideButton onClick={() => dispatch(setInformation('tool'))}>
        <HammerIcon width="24" height="24" />
      </SideButton>
    </Div>
  );
}

const Div = styled.div`
  width: 60px;
  border-right: 1px solid #1c1c1c;
`;

const SideButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-right: 1px solid #1c1c1c;
  background-color: white;

  :hover {
    cursor: pointer;
    color: white;
    background-color: black;
  }
`;

export {ProjectBar};
