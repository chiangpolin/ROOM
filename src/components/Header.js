import React from 'react';
import styled from 'styled-components';
import {Link, useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {
  toggleShare,
  createProject,
  cloneProject,
  updateProjectGroups,
  deleteProject,
} from '../app/actions/index';
import {ReactComponent as ListIcon} from '../static/images/icons/list.svg';
import {ReactComponent as DoorIcon} from '../static/images/icons/door-open-fill.svg';
import {ReactComponent as FolderPlusIcon} from '../static/images/icons/folder-plus.svg';
import {ReactComponent as FolderSymlinkIcon} from '../static/images/icons/folder-symlink.svg';
import {ReactComponent as StickiesIcon} from '../static/images/icons/stickies.svg';
import {ReactComponent as TrashIcon} from '../static/images/icons/trash.svg';
import {ReactComponent as SdCardIcon} from '../static/images/icons/sd-card.svg';
import {ReactComponent as PersonIcon} from '../static/images/icons/person-circle.svg';

function Header() {
  const user_id = localStorage.getItem('user_id');
  let location = useLocation();
  const {selectedProject, filter} = useSelector((state) => state.profile);
  const {groups} = useSelector((state) => state.project);
  const dispatch = useDispatch();

  return (
    <header>
      <Navbar>
        <List>
          <ListButton>
            <ListIcon width="24" height="24" />
          </ListButton>
        </List>
        <Link to="/" style={{color: '#1C1C1C', textDecoration: 'none'}}>
          <NavbarBrand>
            <DoorIcon width="24" height="24" />
            <Title>ROOM</Title>
          </NavbarBrand>
        </Link>
        <Nav>
          {location.pathname === '/profile' ? (
            <NavControllers>
              <Button
                onClick={() => handleClickCreate(dispatch, user_id)}
                disabled={!filter.author}
              >
                <FolderPlusIcon width="24" height="24" />
              </Button>
              <Button
                onClick={() => handleToggleShare(dispatch)}
                disabled={
                  selectedProject.id === '' ||
                  selectedProject.author_id !== user_id
                }
              >
                <FolderSymlinkIcon width="24" height="24" />
              </Button>
              <Button
                onClick={() =>
                  handleClickClone(dispatch, user_id, selectedProject.id)
                }
                disabled={selectedProject.id === ''}
              >
                <StickiesIcon width="24" height="24" />
              </Button>
              <Button
                onClick={() =>
                  handleClickDelete(dispatch, user_id, selectedProject.id)
                }
                disabled={
                  selectedProject.id === '' ||
                  selectedProject.author_id !== user_id
                }
              >
                <TrashIcon width="24" height="24" />
              </Button>
            </NavControllers>
          ) : location.pathname.indexOf('/project') > -1 ? (
            <NavControllers>
              <Button
                onClick={() =>
                  handleClickUpdate(dispatch, selectedProject.id, groups)
                }
                disabled={selectedProject.author_id !== user_id}
              >
                <SdCardIcon width="24" height="24" />
              </Button>
            </NavControllers>
          ) : (
            ''
          )}
          {location.pathname !== '/profile' && user_id !== null ? (
            <NavLinks>
              <Link
                to="/profile"
                style={{
                  color: '#1C1C1C',
                  textDecoration: 'none',
                }}
              >
                <PersonIcon width="24" height="24" />
              </Link>
            </NavLinks>
          ) : (
            ''
          )}
        </Nav>
      </Navbar>
    </header>
  );
}

function handleToggleShare(dispatch) {
  dispatch(toggleShare());
}

async function handleClickCreate(dispatch, user_id) {
  dispatch(createProject(user_id));
}

async function handleClickClone(dispatch, user_id, project_id) {
  dispatch(cloneProject(user_id, project_id));
}

async function handleClickDelete(dispatch, user_id, project_id) {
  dispatch(deleteProject(user_id, project_id));
}

async function handleClickUpdate(dispatch, groups, project_id) {
  dispatch(updateProjectGroups(project_id, groups));
}

const Navbar = styled.div`
  position: fixed;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #1c1c1c;
  background-color: #ffffff;
`;

const NavbarBrand = styled.div`
  position: relative;
  z-index: 30;
  display: flex;
  align-items: center;
  margin: 0 auto 0 30px;
`;

const List = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ListButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const Title = styled.h1`
  margin: 0 0 0 10px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 600;
`;

const Nav = styled.div`
  display: flex;
  margin: 0 30px 0 auto;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 20px 0 10px;
`;

const NavControllers = styled.div`
  margin: 0 20px 0 0;
`;
const Button = styled.button`
  margin: 0 0 0 30px;
  border: none;
  cursor: pointer;
  background-color: transparent;
`;

export {Header};
