import React from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import avatar from '../../static/images/backgrounds/profile-avatar.png';

function UserInfo() {
  const {name, email} = useSelector((state) => state.profile);

  return (
    <Div>
      <ImgDiv>
        <Img src={avatar} />
      </ImgDiv>
      <Content>
        <NameText>{name}</NameText>
        <EmailText>{email}</EmailText>
      </Content>
    </Div>
  );
}

const Div = styled.div`
  width: 300px;
  border-right: 1px solid #1c1c1c;
`;

const ImgDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
`;

const Img = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 75px;
`;

const Content = styled.div`
  margin: 0 30px;
`;

const NameText = styled.p`
  font-size: 24px;
`;

const EmailText = styled.p`
  font-size: 16px;
`;

export {UserInfo};
