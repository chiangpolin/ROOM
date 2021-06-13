import React from 'react';
import styled from 'styled-components';
import * as theme from '../../../../app/constants/theme.js';
import {useSelector, useDispatch} from 'react-redux';

function Groupbar() {
  const {selectedGroup} = useSelector((state) => state.project);
  const dispatch = useDispatch();

  return selectedGroup.id ? (
    <Div>
      <ImgDiv>
        <img />
      </ImgDiv>
      <Content>
        <h3>{selectedGroup.name}</h3>
        <p>{selectedGroup.id}</p>
      </Content>
    </Div>
  ) : (
    <div></div>
  );
}

const Div = styled.div`
  position: absolute;
  top: 100px;
  left: 80px;
  z-index: 10;
  width: 240px;
  height: 330px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  background-color: ${theme.WHITE};

  @media (max-width: 1024px) {
  }
`;

const ImgDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 15px 15px;

  img {
    width: 100%;
    height: 150px;
    background-color: #bdc0ba;
  }
`;

const Content = styled.div`
  margin: 0 15px;
  h3 {
    margin: 0 0 5px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
    font-size: 16px;
  }

  p {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 16px;
  }
`;

export {Groupbar};
