import React from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import {
  alertMessage,
  selectProject,
  cloneProject,
  deleteProject,
} from '../../../actions/index.js';
import * as theme from '../../../constants/theme.js';
import {ReactComponent as StickiesIcon} from '../../../assets/images/icons/stickies.svg';
import {ReactComponent as ShareIcon} from '../../../assets/images/icons/share.svg';
import {ReactComponent as TrashIcon} from '../../../assets/images/icons/trash.svg';
import defaultImage from '../../../assets/images/backgrounds/default.jpg';

function ProjectCard(props) {
  const history = useHistory();
  const {id} = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  return (
    <div className="step-2">
      <Item>
        <ImgDiv>
          <ImgContainer
            style={
              props.imageURL
                ? {backgroundImage: `url(${props.imageURL})`}
                : {backgroundImage: `url(${defaultImage})`}
            }
            onClick={() => history.push(`project/${props.id}`)}
          ></ImgContainer>
          <Trash>
            {props.tag === 'author' ? (
              <TrashIcon
                width="24"
                height="24"
                onClick={() =>
                  handleClickDelete(dispatch, id, props.id, props.name)
                }
              ></TrashIcon>
            ) : (
              ''
            )}
          </Trash>
          <Share>
            {props.tag === 'author' ? (
              <ShareIcon
                width="24"
                height="24"
                onClick={() => handleClickShare(dispatch, props)}
              ></ShareIcon>
            ) : (
              ''
            )}
          </Share>
          <Stickies>
            {props.tag === 'author' || props.tag === 'shared' ? (
              <div className="step-3">
                <StickiesIcon
                  width="24"
                  height="24"
                  onClick={() =>
                    handleClickClone(dispatch, id, props.id, props.name)
                  }
                ></StickiesIcon>
              </div>
            ) : (
              ''
            )}
          </Stickies>
        </ImgDiv>
        <p>{props.name}</p>
      </Item>
    </div>
  );
}

function handleClickShare(dispatch, project) {
  dispatch(
    selectProject({
      id: project.id,
      name: project.name,
      author_id: project.author_id,
      share_id: project.share_id,
    })
  );
  project.handleToggleShare(true);
}

async function handleClickClone(dispatch, user_id, project_id, project_name) {
  dispatch(cloneProject(user_id, project_id));
  dispatch(alertMessage(`Clone ${project_name}`));
}

async function handleClickDelete(dispatch, user_id, project_id, project_name) {
  dispatch(deleteProject(user_id, project_id));
  dispatch(alertMessage(`Delete ${project_name}`));
}

const Item = styled.div`
  position: relative;
  padding: 0 0 15px;
  width: 100%;
  border: none;
  background-color: '#ffffff';
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  border-radius: 10px;
  background-color: ${theme.WHITE};

  p {
    height: 24px;
    line-height: 16px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 16px;
    padding: 5px 0 0 10px;
    overflow: hidden;
  }

  svg {
    color: ${theme.WHITE};
    :hover {
      color: ${theme.KASHMIRBLUE};
      cursor: pointer;
    }
  }
`;

const ImgDiv = styled.div`
  position: relative;
`;

const ImgContainer = styled.div`
  padding-top: 62.5%;
  width: 100%;
  opacity: 0.8;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-size: auto 100%;
  background-position: center;

  :hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const Trash = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
`;

const Share = styled.div`
  position: absolute;
  bottom: 10px;
  right: 50px;
`;

const Stickies = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

export {ProjectCard};
