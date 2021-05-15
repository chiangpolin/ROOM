import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {initFirebase, getUser, getProjects} from '../../app/utils/firebase.js';
import {setUser, setProjects} from '../../app/actions/index';
import styled from 'styled-components';

const Main = styled.main`
  margin-top: 60px;
  padding: 30px 50px;
`;

function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    initFirebase();
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
      <div>{profile.name}</div>
      <div>{profile.email}</div>
      <section>
        {profile.projects.map((project, index) => (
          <p key={index}>{project.data.name}</p>
        ))}
      </section>
    </Main>
  );
}

export {Profile};
