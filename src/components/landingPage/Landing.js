import React from 'react';
import styled from 'styled-components';
import {Form} from './Form.js';
// import {SignUpForm} from './SignUpForm.js';
import room from '../../static/images/unit.png';

function Landing() {
  return (
    <Main>
      <Div>
        <VisionDiv>
          <Content>
            <SubText>Plan and Draw with Designers</SubText>
            <SubText>Anywhere, and Everywhere,</SubText>
            <MainText>Your ROOM Ideas.</MainText>
          </Content>
          <Img src={room}></Img>
        </VisionDiv>
        <AuthDiv>
          <Form type={'sign-in'} />
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
  padding: 60px 0 0;
  background-color: #81c7d4;
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

  @media (max-width: 768px) {
    margin: 0;
  }
`;

const Content = styled.div``;

const MainText = styled.h1`
  font-family: 'Open Sans', sans-serif;
  font-weight: 600;
  color: #fffffb;
`;

const SubText = styled.h3`
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  color: #fffffb;
`;

const Img = styled.img`
  height: 100%;
  max-height: 300px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const AuthDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export {Landing};
