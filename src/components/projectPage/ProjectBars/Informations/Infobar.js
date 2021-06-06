import React from 'react';
import {useSelector} from 'react-redux';
import {Settingsbar} from './Settingsbar.js';
import {Groupbar} from './Groupbar.js';
import {Paintsbar} from './Paintsbar.js';
import {Furnituresbar} from './Furnituresbar.js';
import {Texturesbar} from './Texturesbar.js';
import {Camerabar} from './Camerabar.js';

function Infobar() {
  const {information} = useSelector((state) => state.project);

  switch (information) {
    case 'settings':
      return <Settingsbar></Settingsbar>;
    case 'group':
      return <Groupbar></Groupbar>;
    case 'paint':
      return <Paintsbar></Paintsbar>;
    case 'furniture':
      return <Furnituresbar></Furnituresbar>;
    case 'texture':
      return <Texturesbar></Texturesbar>;
    case 'camera':
      return <Camerabar></Camerabar>;
    default:
      return '';
  }
}

export {Infobar};
