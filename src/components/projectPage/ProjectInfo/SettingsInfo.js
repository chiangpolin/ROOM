import React from 'react';
import styled from 'styled-components';

function SettingsInfo() {
  return (
    <Div>
      <Title>Settings</Title>
      <Content>
        <InputDiv>
          <Name>Scale</Name>
          <Input type="range" min="0.25" max="5" value="2.5" />
        </InputDiv>
        <InputDiv>
          <Name>Light</Name>
          <Input type="range" min="0.25" max="5" value="2.5" />
        </InputDiv>
        <InputDiv>
          <Name>Ambient Light</Name>
          <Input type="range" min="0.25" max="5" value="2.5" />
        </InputDiv>
      </Content>
    </Div>
  );
}

const Div = styled.div`
  width: 300px;
  border-right: 1px solid #1c1c1c;
`;

const Content = styled.div`
  margin: 0 30px;
`;

const InputDiv = styled.div`
  margin: 30px 0;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
`;

const Name = styled.p`
  font-size: 16px;
`;

const Title = styled.p`
  margin: 30px 0 0 30px;
  font-size: 24px;
`;

export {SettingsInfo};
