import React from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {SettingsInfo} from './SettingsInfo.js';
import {CanvasInfo} from './CanvasInfo.js';
import {PaintInfo} from './PaintInfo.js';
import {FurnitureInfo} from './FurnitureInfo.js';
import {TextureInfo} from './TextureInfo.js';
import {CameraInfo} from './CameraInfo.js';
import {ToolInfo} from './ToolInfo.js';
import {GroupInfo} from './GroupInfo.js';

function InfoBar() {
  const {information} = useSelector((state) => state.project);

  switch (information) {
    case 'settings':
      return <SettingsInfo></SettingsInfo>;
    case 'canvas':
      return <CanvasInfo></CanvasInfo>;
    case 'paint':
      return <PaintInfo></PaintInfo>;
    case 'furniture':
      return <FurnitureInfo></FurnitureInfo>;
    case 'texture':
      return <TextureInfo></TextureInfo>;
    case 'camera':
      return <CameraInfo></CameraInfo>;
    case 'tool':
      return <ToolInfo></ToolInfo>;
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
