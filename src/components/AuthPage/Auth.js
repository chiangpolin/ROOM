import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import {Form} from './Form.js';
import {fetchAuthState} from '../../app/actions/index.js';
import * as theme from '../../app/constants/theme.js';
import signInImage from '../../static/images/backgrounds/signin.png';
import signUpImage from '../../static/images/backgrounds/signup.png';

function Auth() {
  const history = useHistory();
  const [type, setType] = useState('sign-in');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthState(history));
  }, [history, dispatch]);

  return (
    <Main>
      <Div>
        <VisualDiv
          display={type === 'sign-in' ? 'block' : 'none'}
          opacity={type === 'sign-in' ? '100%' : '0'}
        >
          <Content>
            <h3>Plan and Draw with Designers</h3>
            <h3>Anywhere, and Everywhere,</h3>
            <h1>
              Your <span>Room</span> Ideas.
            </h1>
          </Content>
          <Img src={signInImage} alt=""></Img>
        </VisualDiv>
        <VisualDiv
          display={type === 'sign-up' ? 'block' : 'none'}
          opacity={type === 'sign-up' ? '100%' : '0'}
        >
          <Content>
            <h3>Start Creating Room Plan with</h3>
            <h3>Canvas and Instant Rendering</h3>
            <h1>
              As a <span>Room</span> User.
            </h1>
          </Content>
          <Img src={signUpImage} alt=""></Img>
        </VisualDiv>
        <AuthDiv shift={type === 'sign-in' ? '50%' : '0'}>
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
  background-color: ${theme.KASHMIRBLUE};

  @media (max-width: 1023px) {
    min-height: 600px;
  }

  @media (max-width: 375px) {
    width: 100%;
    background-color: ${theme.ATHENSGRAY};
  }
`;

const Div = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 900px;
  height: 100%;
  max-height: 450px;

  @media (max-width: 1023px) {
    margin: 0;
    flex-direction: column;
    width: 100%;
  }
`;

const VisualDiv = styled.div`
  position: relative;
  justify-content: center;
  margin: 0 auto;
  opacity: ${(props) => props.opacity};
  transition: opacity 0.5s ease;

  @media (max-width: 1023px) {
    display: ${(props) => props.display};
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

  span {
    font-family: 'Varela Round';
    font-weight: 600;
    font-size: 36px;
  }

  @media (max-width: 1023px) {
    h1 {
      font-weight: 400;
    }
  }

  @media (max-width: 375px) {
    display: none;
  }
`;

const Img = styled.img`
  height: 100%;
  max-height: 285px;

  @media (max-width: 1023px) {
    display: none;
  }
`;

const AuthDiv = styled.div`
  position: absolute;
  top: 0;
  left: ${(props) => props.shift};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
  width: 50%;
  transition: left 0.5s ease;

  @media (max-width: 1023px) {
    position: static;
    padding: 0;
    width: 360px;
  }

  @media (max-width: 375px) {
    width: 100%;
  }
`;

export {Auth};
