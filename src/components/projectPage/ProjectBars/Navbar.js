import React from 'react';
import {useLocation, useParams} from 'react-router';
import {useSelector, useDispatch} from 'react-redux';
import styled, {css} from 'styled-components';
import {Controls} from './Controls.js';
import {
  alertMessage,
  updateProject,
  uploadRenderingImage,
} from '../../../app/actions/index.js';
import * as theme from '../../../app/constants/theme.js';
import {ReactComponent as LightbulbIcon} from '../../../static/images/icons/lightbulb.svg';
import {ReactComponent as LinkIcon} from '../../../static/images/icons/link.svg';
import {ReactComponent as SdCardIcon} from '../../../static/images/icons/sd-card.svg';
import {ReactComponent as CameraIcon} from '../../../static/images/icons/camera.svg';
import {ReactComponent as PersonIcon} from '../../../static/images/icons/person-fill.svg';

function Navbar(props) {
  let location = useLocation();
  const path = `https://room-801fb.web.app${location.pathname}`;
  const {id} = useParams();
  const user_id = useSelector((state) => state.profile.id);
  const {
    author_id,
    d_cameras,
    d_furnitures,
    d_walls,
    d_openings,
    d_coverings,
    d_floors,
    dataURL,
  } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  return (
    <Div>
      {user_id === author_id && !props.renderIsClicked ? (
        <Button
          onClick={() => {
            handleClickUpdate(dispatch, id, {
              d_cameras,
              d_furnitures,
              d_walls,
              d_openings,
              d_coverings,
              d_floors,
            });
          }}
        >
          <SdCardIcon width="20" height="20"></SdCardIcon>
          <p>Save</p>
        </Button>
      ) : null}
      {user_id === author_id && props.renderIsClicked ? (
        <Button onClick={() => handleClickSnapshot(dispatch, id, dataURL)}>
          <CameraIcon width="24" height="24"></CameraIcon>
          <p>Snapshot</p>
        </Button>
      ) : null}
      <div className="step-4">
        <Button
          primary
          onClick={() => {
            navigator.clipboard.writeText(path);
            dispatch(alertMessage('Link Copied'));
          }}
        >
          <LinkIcon width="24" height="24"></LinkIcon>
          <p>Link</p>
        </Button>
      </div>
      <p>|</p>
      <div>
        <RightDiv onClick={() => props.setRun(true)}>
          <LightbulbIcon width="24" height="24"></LightbulbIcon>
        </RightDiv>
        {user_id ? (
          <RightDiv onClick={() => props.handleClickUser(!props.userIsClicked)}>
            <PersonIcon width="24" height="24"></PersonIcon>
          </RightDiv>
        ) : null}
      </div>
      <Controls></Controls>
    </Div>
  );
}

function handleClickUpdate(dispatch, project_id, data) {
  dispatch(updateProject(project_id, data));
  dispatch(alertMessage('Project Updated'));
}

function handleClickSnapshot(dispatch, id, uri) {
  downloadURI(`${id}.jpg`, uri);
  dispatch(uploadRenderingImage(id, uri));
}

function downloadURI(name, uri) {
  let link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  link = null;
}

const Div = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 10;
  display: flex;
  align-items: center;
  padding: 0 15px;
  height: 50px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  background-color: ${theme.WHITE};

  p {
    margin: 0 15px;
  }

  div {
    display: flex;
    align-items: center;
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

const RightDiv = styled.div`
  svg {
    margin: 0 10px;
    line-weight: 400;

    :hover {
      color: ${theme.KASHMIRBLUE};
      cursor: pointer;
    }
  }

  img {
    margin: 0 0 0 10px;
    width: 32px;
    height: 32px;
    border-radius: 16px;
    cursor: pointer;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  padding: 0 15px;
  height: 30px;
  border: 1px solid ${theme.KASHMIRBLUE};
  border-radius: 5px;
  color: ${theme.KASHMIRBLUE};
  background-color: transparent;
  font-size: 16px;
  cursor: pointer;

  :hover {
    color: ${theme.WHITE};
    background-color: ${theme.KASHMIRBLUE};
  }

  p {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 16px;
  }

  svg {
    margin: 0 10px 0 0;
    line-weight: 400;
  }

  ${(props) =>
    props.primary &&
    css`
      color: ${theme.WHITE};
      background-color: ${theme.KASHMIRBLUE};
      border: 1px solid ${theme.KASHMIRBLUE};
    `}

  @media (max-width: 1023px) {
    padding: 0 10px;

    p {
      display: none;
    }

    svg {
      margin: 0;
    }
  }
`;
export {Navbar};
