import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {
  getUser,
  getProjects,
  getSharedProjects,
} from '../../app/utils/firebase.js';
import {setUser, setProjects, setSharedProjects} from '../../app/actions/index';
import {Sidebar} from './Sidebar.js';
import {UserInfo} from './UserInfo.js';
import {ProjectInfo} from './ProjectInfo.js';
import {ProjectCard} from './ProjectCard.js';

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
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px 15px;
`;

function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    const fetchData = async () => {
      const user_id = localStorage.getItem('user_id');
      const [user, projects, sharedProjects] = await Promise.all([
        getUser(user_id),
        getProjects(user_id),
        getSharedProjects(user_id),
      ]);
      return {user, projects, sharedProjects};
    };
    fetchData().then(({user, projects, sharedProjects}) => {
      dispatch(setUser(user));
      dispatch(setProjects(projects));
      dispatch(setSharedProjects(sharedProjects));
    });
  }, []);

  return (
    <Main>
      <Sidebar />
      {profile.selectedProject.id === '' ? <UserInfo /> : <ProjectInfo />}
      <Section>
        <Container>
          {profile.filter.author
            ? profile.projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  name={project.data.name}
                  author_id={project.data.author_id}
                ></ProjectCard>
              ))
            : ''}
          {profile.filter.shared
            ? profile.sharedProjects.map((project, index) => (
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
    </Main>
  );
}

export {Profile};
