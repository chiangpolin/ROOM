import React from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';

function CanvasInfo() {
  const {name, author_id} = useSelector((state) => state.project);

  return (
    <Div>
      <ImgDiv>
        <Img />
      </ImgDiv>
      <Content>
        <NameText>{name}</NameText>
        <AuthorText>{author_id}</AuthorText>
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
`;

const Content = styled.div`
  margin: 0 30px;
`;

const NameText = styled.p`
  font-size: 24px;
`;

const AuthorText = styled.p`
  font-size: 16px;
`;

export {CanvasInfo};
