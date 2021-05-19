import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useParams} from 'react-router';
import {useDispatch} from 'react-redux';
import {setProject} from '../../app/actions/index.js';
import {getProject} from '../../app/utils/firebase.js';
import {ProjectBar} from './ProjectBar.js';
import {ProjectCanvas} from './ProjectCanvas.js';
import {Rendering} from './Rendering.js';
import {ReactComponent as CameraIcon} from '../../static/images/icons/camera.svg';

function Project() {
  let {id} = useParams();
  const dispatch = useDispatch();
  const [isFetched, setIsFetched] = useState(false);
  const [renderIsClicked, handleClickRender] = useState(false);

  useEffect(() => {
    getProject(id).then((project) => {
      dispatch(setProject(project));
      setIsFetched(true);
    });
  }, []);

  return isFetched ? (
    <Main>
      <ProjectBar />
      <Section>
        {renderIsClicked ? <Rendering /> : <ProjectCanvas />}
        <RenderButton onClick={() => handleClickRender(!renderIsClicked)}>
          <CameraIcon width="32" height="32" />
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
