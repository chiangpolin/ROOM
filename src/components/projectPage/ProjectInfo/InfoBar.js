import React from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {SettingsInfo} from './SettingsInfo.js';
import {CanvasInfo} from './CanvasInfo.js';
import {FurnitureInfo} from './FurnitureInfo.js';
import {WallsInfo} from './WallsInfo.js';
import {CameraInfo} from './CameraInfo.js';
import {GroupInfo} from './GroupInfo.js';

function InfoBar() {
  const project = useSelector((state) => state.project);

  switch (project.info) {
    case 'settings':
      return <SettingsInfo></SettingsInfo>;
    case 'canvas':
      return <CanvasInfo></CanvasInfo>;
    case 'furniture':
      return <FurnitureInfo></FurnitureInfo>;
    case 'walls':
      return <WallsInfo></WallsInfo>;
    case 'camera':
      return <CameraInfo></CameraInfo>;
    case 'group':
      return <GroupInfo></GroupInfo>;
    default:
      return <Div></Div>;
  }
}

const Div = styled.div`
  width: 300px;
  border-right: 1px solid #1c1c1c;
`;

export {InfoBar};
