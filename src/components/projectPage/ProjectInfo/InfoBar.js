import React from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {SettingsInfo} from './SettingsInfo.js';
import {CanvasInfo} from './CanvasInfo.js';
import {WallInfo} from './WallInfo.js';
import {FurnitureInfo} from './FurnitureInfo.js';
import {FloorInfo} from './FloorInfo.js';
import {CameraInfo} from './CameraInfo.js';
import {GroupInfo} from './GroupInfo.js';

function InfoBar() {
  const {info} = useSelector((state) => state.project);

  switch (info) {
    case 'settings':
      return <SettingsInfo></SettingsInfo>;
    case 'canvas':
      return <CanvasInfo></CanvasInfo>;
    case 'wall':
      return <WallInfo></WallInfo>;
    case 'furniture':
      return <FurnitureInfo></FurnitureInfo>;
    case 'floor':
      return <FloorInfo></FloorInfo>;
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
