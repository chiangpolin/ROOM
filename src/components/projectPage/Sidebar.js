import React from 'react';
import styled from 'styled-components';
import {ReactComponent as GearIcon} from '../../static/images/icons/gear.svg';
import {ReactComponent as InfoSquareIcon} from '../../static/images/icons/info-square.svg';
import {ReactComponent as EaselIcon} from '../../static/images/icons/easel.svg';
import {ReactComponent as PaletteIcon} from '../../static/images/icons/palette.svg';
import {ReactComponent as CameraIcon} from '../../static/images/icons/camera-reels.svg';

function Sidebar() {
  return (
    <Div>
      <SideButton>
        <GearIcon width="24" height="24" />
      </SideButton>
      <SideButton>
        <InfoSquareIcon width="24" height="24" />
      </SideButton>
      <SideButton>
        <EaselIcon width="24" height="24" />
      </SideButton>
      <SideButton>
        <PaletteIcon width="24" height="24" />
      </SideButton>
      <SideButton>
        <CameraIcon width="24" height="24" />
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

export {Sidebar};
