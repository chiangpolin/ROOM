import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {setProject} from '../../app/actions/index';
import {getProject} from '../../app/utils/firebase.js';
import {Rendering} from './Rendering.js';
import {ProjectCanvas} from './ProjectCanvas.js';
import {Sidebar} from './Sidebar.js';

function Project() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const project = useSelector((state) => state.project);
  const [renderIsClicked, handleClickRender] = useState(false);

  useEffect(() => {
    getProject(profile.selectedProject.id).then((project) => {
      dispatch(setProject(project));
    });
  }, []);

  return project.isFetched ? (
    <Main>
      <Sidebar />
      <Section>
        {renderIsClicked ? <Rendering /> : <ProjectCanvas />}
        <RenderButton onClick={() => handleClickRender(!renderIsClicked)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
            <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
          </svg>
        </RenderButton>
      </Section>
    </Main>
  ) : (
    <Main>
      <section></section>
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  height: 100%;
  padding-top: 60px;
`;

const Section = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  width: calc(100% - 60px);
`;

const RenderButton = styled.button`
  position: absolute;
  right: 30px;
  bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border: 0;
  border-radius: 25px;
  background-color: white;

  :hover {
    cursor: pointer;
    color: white;
    background-color: black;
  }
`;

export {Project};
