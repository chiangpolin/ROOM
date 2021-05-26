import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import {Form} from './Form.js';
import room from '../../static/images/backgrounds/room.png';

function Landing() {
  const [type, setType] = useState('sign-in');
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
          <Types>
            <Type
              primary={type === 'sign-up'}
              onClick={() => setType('sign-up')}
            >
              Sign Up
            </Type>
            <Type
              primary={type === 'sign-in'}
              onClick={() => setType('sign-in')}
            >
              Sign In
            </Type>
          </Types>
          <Form type={type} />
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
  align-items: center;
  justify-content: center;
`;

const Types = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0 0;
`;

const Type = styled.button`
  margin: 0 auto;
  width: 100%;
  font-size: 14px;
  color: #fffffb;
  background-color: transparent;
  text-align: center;
  text-decoration: none;
  border: none;
  border-bottom: 1px solid #fffffb;
  cursor: pointer;
  ${(props) =>
    props.primary &&
    css`
      border-top: 1px solid #fffffb;
      border-left: 1px solid #fffffb;
      border-right: 1px solid #fffffb;
      border-bottom: 1px solid transparent;
    `}
`;

export {Landing};
