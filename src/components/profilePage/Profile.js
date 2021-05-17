import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getUser, getProjects} from '../../app/utils/firebase.js';
import {setUser, setProjects} from '../../app/actions/index';
import {Sidebar} from './Sidebar.js';
import styled from 'styled-components';

const Main = styled.main`
  display: flex;
  height: 100%;
  padding-top: 60px;
`;

const Section = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  width: calc(100% - 300px);
  padding: 30px 30px;
`;

const SideInfo = styled.div`
  width: 240px;
  border-right: 1px solid #1c1c1c;
  padding: 15px 30px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px 15px;
`;

const Item = styled.div`
  width: 100%;
  height: 150px;
  background-color: #bdc0ba;
`;

function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    const fetchData = async () => {
      const [user, projects] = await Promise.all([
        getUser('KDXfrqkWaNIxctL9LZHd'),
        getProjects('KDXfrqkWaNIxctL9LZHd'),
      ]);
      return {user, projects};
    };
    fetchData().then(({user, projects}) => {
      dispatch(setUser(user));
      dispatch(setProjects(projects));
    });
  }, []);

  return (
    <Main>
      <Sidebar />
      <SideInfo>
        <div>{profile.name}</div>
        <div>{profile.email}</div>
        {profile.projects.map((project, index) => (
          <p key={index}>{project.data.name}</p>
        ))}
      </SideInfo>
      <Section>
        <Container>
          <Item></Item>
          <Item></Item>
          <Item></Item>
          <Item></Item>
          <Item></Item>
          <Item></Item>
        </Container>
      </Section>
    </Main>
  );
}

export {Profile};
