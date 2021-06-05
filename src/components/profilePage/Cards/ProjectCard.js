import React from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectProject,
  toggleShare,
  cloneProject,
  deleteProject,
} from '../../../app/actions/index.js';
import * as theme from '../../../app/constants/theme.js';
import {ReactComponent as StickiesIcon} from '../../../static/images/icons/stickies.svg';
import {ReactComponent as ShareIcon} from '../../../static/images/icons/share.svg';
import {ReactComponent as TrashIcon} from '../../../static/images/icons/trash.svg';
import blank from '../../../static/images/backgrounds/default.jpg';

function ProjectCard(props) {
  let history = useHistory();
  const {id} = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  return (
    <Item>
      <ImgDiv>
        <img
          src={props.imageURL ? props.imageURL : blank}
          onClick={() => history.push(`/project/${props.id}`)}
        />
        <Trash>
          {props.author_id === id ? (
            <TrashIcon
              width="24"
              height="24"
              onClick={() => handleClickDelete(dispatch, id, props.id)}
            ></TrashIcon>
          ) : (
            ''
          )}
        </Trash>
        <Share>
          {props.author_id === id ? (
            <ShareIcon
              width="24"
              height="24"
              onClick={() => handleToggleShare(dispatch, props)}
            ></ShareIcon>
          ) : (
            ''
          )}
        </Share>
        <Stickies>
          <StickiesIcon
            width="24"
            height="24"
            onClick={() => handleClickClone(dispatch, id, props.id)}
          ></StickiesIcon>
        </Stickies>
      </ImgDiv>
      <p>{props.name}</p>
    </Item>
  );
}

function handleToggleShare(dispatch, project) {
  dispatch(
    selectProject({
      id: project.id,
      name: project.name,
      author_id: project.author_id,
    })
  );
  dispatch(toggleShare());
}

async function handleClickClone(dispatch, user_id, project_id) {
  dispatch(cloneProject(user_id, project_id));
}

async function handleClickDelete(dispatch, user_id, project_id) {
  dispatch(deleteProject(user_id, project_id));
}

const Item = styled.div`
  position: relative;
  padding: 0 0 15px;
  width: 100%;
  border: none;
  background-color: '#ffffff';
  border-radius: 10px;
  background-color: ${theme.WHITE};

  p {
    padding: 0 0 0 10px;
    overflow: hidden;
  }

  svg {
    color: ${theme.WHITE};
    :hover {
      color: ${theme.RURI};
      cursor: pointer;
    }
  }
`;

const ImgDiv = styled.div`
  position: relative;

  img {
    width: 100%;
    opacity: 0.8;
    background-color: #bdc0ba;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    :hover {
      cursor: pointer;
      opacity: 1;
    }
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
