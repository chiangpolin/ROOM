import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setProject} from '../../actions/index';
import {initFirebase, getProject} from '../../utils/firebase.js';
import {Rendering} from './Rendering.js';
import {ProjectCanvas} from './ProjectCanvas.js';
import styled from 'styled-components';

const Main = styled.main`
  margin-top: 60px;
  padding: 30px 50px;
`;

const RenderButton = styled.button`
  width: 120px;
  height: 30px;
`;

function Project() {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);

  useEffect(() => {
    initFirebase();
    getProject('nVf5KIs32HDo5w5XYXrT').then((project) => {
      dispatch(setProject(project));
    });
  }, []);

  return project.isFetched ? (
    <Main>
      <section>
        <h1>{project.name}</h1>
        <h3>{project.author_id}</h3>
        <RenderButton>Render</RenderButton>
        <Rendering />
        <ProjectCanvas />
      </section>
    </Main>
  ) : (
    <Main>
      <section></section>
    </Main>
  );
}

export {Project};
