import React, {useState, useEffect} from 'react';
import styled, {css} from 'styled-components';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {Form} from './Form.js';
import {fetchAuthState} from '../../app/actions/index.js';
import * as theme from '../../app/constants/theme.js';
import room from '../../static/images/backgrounds/room.png';

function Auth() {
  const history = useHistory();
  const [type, setType] = useState('sign-in');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthState(history));
    // eslint-disable-next-line
  }, []);

  return (
    <Main>
      <Div>
        <VisionDiv>
          <Content>
            <h3>Plan and Draw with Designers</h3>
            <h3>Anywhere, and Everywhere,</h3>
            <h1>Your ROOM Ideas.</h1>
          </Content>
          <Img src={room}></Img>
        </VisionDiv>
        <AuthDiv>
          <Form type={type} setType={setType} />
        </AuthDiv>
      </Div>
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: ${theme.MIZU};
`;

const Div = styled.div`
  display: flex;
  max-width: 1200px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const VisionDiv = styled.div`
  justify-content: center;
  margin: 0 60px 0 0;

  @media (max-width: 1024px) {
    margin: 0 auto 0 0;
  }

  @media (max-width: 768px) {
    margin: 0;
  }
`;

const Content = styled.div`
  margin: 0 20px 15px;

  h1 {
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
    font-size: 36px;
    color: #fffffb;
  }

  h3 {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 24px;
    color: #fffffb;
  }

  @media (max-width: 768px) {
    h1 {
      font-weight: 400;
    }
  }
`;

const Img = styled.img`
  height: 100%;
  max-height: 300px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const AuthDiv = styled.div`
  align-items: center;
  justify-content: center;
`;

export {Auth};
