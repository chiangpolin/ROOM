import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {selectProject, fetchProfileData} from '../../app/actions/index.js';
import {ProfileBar} from './ProfileBar.js';
import {UserInfo} from './UserInfo.js';
import {CardInfo} from './CardInfo.js';
import {ProjectCard} from './ProjectCard.js';
import {Modal} from './Modal.js';

function Profile() {
  const {selectedProject, filter, projects, sharedProjects, shareIsToggled} =
    useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(selectProject({id: '', name: '', author_id: ''}));
    dispatch(fetchProfileData(localStorage.getItem('user_id')));
    // eslint-disable-next-line
  }, []);

  return (
    <Main>
      <ProfileBar />
      {selectedProject.id === '' ? <UserInfo /> : <CardInfo />}
      <Section>
        <Container>
          {filter.author
            ? projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  name={project.data.name}
                  author_id={project.data.author_id}
                ></ProjectCard>
              ))
            : ''}
          {filter.shared
            ? sharedProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  name={project.data.name}
                  author_id={project.data.author_id}
                ></ProjectCard>
              ))
            : ''}
        </Container>
      </Section>
      {shareIsToggled ? <Modal /> : ''}
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
  width: calc(100% - 360px);
  padding: 30px 30px;
  overflow-y: scroll;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px 15px;
`;

export {Profile};
