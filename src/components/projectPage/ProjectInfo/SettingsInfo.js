import React from 'react';
import styled from 'styled-components';

function SettingsInfo() {
  return (
    <Div>
      <Content>
        <NameText>Settings</NameText>
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

const NameText = styled.p`
  font-size: 24px;
`;

export {SettingsInfo};
