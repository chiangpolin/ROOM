import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useParams} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProjectData} from '../../app/actions/index.js';
import {ReactComponent as CameraIcon} from '../../static/images/icons/camera.svg';
import {ProjectBar} from './ProjectBar.js';
import {InfoBar} from './ProjectInfo/InfoBar.js';
import {Canvas} from './ProjectCanvas/Canvas.js';
import {Rendering} from './ProjectCanvas/Rendering.js';

function Project() {
  const [renderIsClicked, handleClickRender] = useState(false);
  let {id} = useParams();
  const {dataIsFetched} = useSelector((state) => state.project);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjectData(id));
    // eslint-disable-next-line
  }, []);

  if (dataIsFetched) {
    return (
      <Main>
        <ProjectBar />
        <InfoBar />
        <Section>
          {renderIsClicked ? <Rendering /> : <Canvas />}
          <RenderButton onClick={() => handleClickRender(!renderIsClicked)}>
            <CameraIcon width="32" height="32" />
          </RenderButton>
        </Section>
      </Main>
    );
  } else {
    return (
      <Main>
        <section></section>
      </Main>
    );
  }
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
  width: calc(100% - 360px);
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
