import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {
  getProjects,
  postProject,
  deleteProject,
} from '../app/utils/firebase.js';
import {setProjects, selectProject} from '../app/actions/index';

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
  margin: 0 20px 0 0;
`;

const NavControllers = styled.div`
  margin: 0 30px 0 0;
`;
const Button = styled.button`
  margin: 10px;
  border: none;
  cursor: pointer;
  background-color: transparent;
`;
async function addNewProject(dispatch) {
  const user_id = localStorage.getItem('user_id');
  await postProject({
    id: user_id,
    name: 'Untitled',
  });
  const projects = await getProjects(user_id);
  dispatch(setProjects(projects));
}

async function deleteSelectedProject(dispatch, id) {
  const user_id = localStorage.getItem('user_id');
  await deleteProject(id);
  const projects = await getProjects(user_id);
  dispatch(setProjects(projects));
  dispatch(selectProject(''));
}

function Header() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  return (
    <header>
      <Navbar>
        <List>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </List>
        <Link to="/" style={{color: '#1C1C1C', textDecoration: 'none'}}>
          <NavbarBrand>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
            </svg>
            <Title>ROOM</Title>
          </NavbarBrand>
        </Link>
        <Nav>
          <NavControllers>
            <Button onClick={() => addNewProject(dispatch)} disabled={false}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z" />
                <path d="M13.5 10a.5.5 0 0 1 .5.5V12h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V13h-1.5a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z" />
              </svg>
            </Button>
            <Button
              onClick={() =>
                deleteSelectedProject(dispatch, profile.selectedProject.id)
              }
              disabled={profile.selectedProject.id === ''}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path
                  fillRule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
            </Button>
          </NavControllers>
          <NavLinks>
            <Link
              to="/profile"
              style={{color: '#1C1C1C', textDecoration: 'none'}}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
              </svg>
            </Link>
          </NavLinks>
        </Nav>
      </Navbar>
    </header>
  );
}

export {Header};
