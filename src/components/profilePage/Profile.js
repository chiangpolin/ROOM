import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import {initFirebase, getUser, getProjects} from '../../utils/firebase.js';
import {setUser, setProjects} from '../../actions/index';

const Main = styled.main`
  margin-top: 140px;
  padding: 30px 30px;
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
