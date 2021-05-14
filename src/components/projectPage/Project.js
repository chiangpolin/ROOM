import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import {initFirebase, getProject} from '../../utils/firebase.js';
import {setProject} from '../../actions/index';
import {Rendering} from './Rendering.js';

const Main = styled.main`
  margin-top: 140px;
  padding: 30px 30px;
`;

function Project() {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);

  useEffect(() => {
    initFirebase();
    getProject('nVf5KIs32HDo5w5XYXrT').then((project) =>
      dispatch(setProject(project))
    );
  }, []);
  return (
    <Main>
      <section>
        <p>{project.name}</p>
        <div>
          {project.groups.map((group, index) => (
            <div key={index}>
              <p>{group.name}</p>
              <p>{group.position.x}</p>
              <p>{group.position.y}</p>
            </div>
          ))}
        </div>
        <Rendering />
      </section>
    </Main>
  );
}

export {Project};
