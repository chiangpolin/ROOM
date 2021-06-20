import React from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import {setInformation} from '../../../actions/index.js';
import * as theme from '../../../constants/theme.js';
import {ReactComponent as CameraReelsIcon} from '../../../assets/images/icons/camera-reels.svg';
import {ReactComponent as EaselIcon} from '../../../assets/images/icons/easel.svg';

function CameraReels(props) {
  const dispatch = useDispatch();

  return (
    <Button
      onClick={() => {
        dispatch(setInformation(''));
        props.handleClickRender(!props.renderIsClicked);
      }}
    >
      {props.renderIsClicked ? (
        <div className="step-5">
          <EaselIcon width="28" height="28" />
        </div>
      ) : (
        <div className="step-5">
          <CameraReelsIcon width="28" height="28" />
        </div>
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
  background-color: ${theme.WHITE};

  :hover {
    cursor: pointer;
    color: white;
    background-color: ${theme.KASHMIRBLUE};
  }

  @media (max-width: 767px) {
    right: 15px;
    bottom: 15px;
    width: calc(100% - 30px);
    height: 50px;
  }
`;

export {CameraReels};
