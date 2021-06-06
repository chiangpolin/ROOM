import React from 'react';
import styled from 'styled-components';
import {useLocation, useParams} from 'react-router';
import {useSelector, useDispatch} from 'react-redux';
import {
  updateProject,
  uploadRenderingImage,
} from '../../../app/actions/index.js';
import * as theme from '../../../app/constants/theme.js';
import {ReactComponent as LightbulbIcon} from '../../../static/images/icons/lightbulb.svg';
import {ReactComponent as LinkIcon} from '../../../static/images/icons/link.svg';
import {ReactComponent as SdCardIcon} from '../../../static/images/icons/sd-card.svg';
import {ReactComponent as CameraIcon} from '../../../static/images/icons/camera.svg';
import {ReactComponent as PersonIcon} from '../../../static/images/icons/person.svg';

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
        <button
          onClick={() =>
            handleClickUpdate(dispatch, id, {
              d_cameras,
              d_furnitures,
              d_walls,
              d_openings,
              d_coverings,
              d_floors,
            })
          }
        >
          <SdCardIcon width="20" height="20"></SdCardIcon>
          <p>Save</p>
        </button>
      ) : null}
      {user_id === author_id && props.renderIsClicked ? (
        <button onClick={() => handleClickSnapshot(dispatch, id, dataURL)}>
          <CameraIcon width="24" height="24"></CameraIcon>
          <p>Snapshot</p>
        </button>
      ) : null}
      <div className="step-4">
        <button
          onClick={() => {
            navigator.clipboard.writeText(path);
          }}
        >
          <LinkIcon width="24" height="24"></LinkIcon>
          <p>Link</p>
        </button>
      </div>
      <p>|</p>
      <div>
        <div onClick={() => props.setRun(true)}>
          <LightbulbIcon width="24" height="24"></LightbulbIcon>
        </div>
        <div onClick={() => props.handleClickUser(!props.userIsClicked)}>
          <PersonIcon width="24" height="24"></PersonIcon>
        </div>
      </div>
    </Div>
  );
}

function handleClickUpdate(dispatch, project_id, data) {
  dispatch(updateProject(project_id, data));
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
  background-color: ${theme.WHITE};

  p {
    margin: 0 15px;
  }

  div {
    display: flex;
    align-items: center;

    svg {
      margin: 0 10px;
      line-weight: 400;

      :hover {
        color: blue;
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
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
    padding: 0 15px;
    height: 30px;
    border: 1px solid ${theme.SUMI};
    border-radius: 5px;
    background-color: transparent;
    font-size: 16px;
    cursor: pointer;

    :hover {
      color: ${theme.GOFUN};
      background-color: ${theme.SUMI};
    }

    p {
      margin: 0;
    }

    svg {
      margin: 0 10px 0 0;
      line-weight: 400;
    }
  }

  @media (max-width: 1023px) {
    button {
      padding: 0 10px;

      p {
        display: none;
      }

      svg {
        margin: 0;
      }
    }
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

export {Navbar};
