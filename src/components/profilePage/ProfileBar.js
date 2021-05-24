import React from 'react';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {filterProjects} from '../../app/actions/index.js';
import {ReactComponent as FolderIcon} from '../../static/images/icons/folder.svg';
import {ReactComponent as PersonSquareIcon} from '../../static/images/icons/person-square.svg';
import {ReactComponent as PeopleIcon} from '../../static/images/icons/people.svg';
import {ReactComponent as ImagesIcon} from '../../static/images/icons/images.svg';

function ProfileBar() {
  const dispatch = useDispatch();

  return (
    <Div>
      <SideButton
        onClick={() => dispatch(filterProjects({shared: true, author: true}))}
      >
        <FolderIcon width="24" height="24" />
      </SideButton>
      <SideButton
        onClick={() => dispatch(filterProjects({shared: false, author: true}))}
      >
        <PersonSquareIcon width="24" height="24" />
      </SideButton>
      <SideButton
        onClick={() => dispatch(filterProjects({shared: true, author: false}))}
      >
        <PeopleIcon width="24" height="24" />
      </SideButton>
      <SideButton
        disabled
        onClick={() => dispatch(filterProjects({shared: false, author: false}))}
      >
        <ImagesIcon width="24" height="24" />
      </SideButton>
    </Div>
  );
}

const Div = styled.div`
  width: 60px;
  border-right: 1px solid #1c1c1c;
`;

const SideButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border: none;
  border-right: 1px solid #1c1c1c;
  background-color: white;

  :hover {
    cursor: pointer;
    color: white;
    background-color: black;
  }
`;

export {ProfileBar};
