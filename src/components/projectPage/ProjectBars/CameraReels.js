import React from 'react';
import styled from 'styled-components';
import {ReactComponent as CameraReelsIcon} from '../../../static/images/icons/camera-reels.svg';
import {ReactComponent as EaselIcon} from '../../../static/images/icons/easel.svg';

function CameraReels(props) {
  return (
    <Button onClick={() => props.handleClickRender(!props.renderIsClicked)}>
      {props.renderIsClicked ? (
        <EaselIcon width="28" height="28" />
      ) : (
        <CameraReelsIcon width="28" height="28" />
      )}
    </Button>
  );
}

const Button = styled.button`
  position: absolute;
  right: 25px;
  bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border: 0;
  border-radius: 25px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  background-color: white;

  :hover {
    cursor: pointer;
    color: white;
    background-color: black;
  }

  @media (max-width: 767px) {
    right: 15px;
    bottom: 15px;
    width: calc(100% - 30px);
    height: 50px;
  }
`;

export {CameraReels};
