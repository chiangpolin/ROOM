import React from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import * as theme from '../../../../app/constants/theme.js';

function Groupbar() {
  const {selectedGroup, setting} = useSelector((state) => state.project);
  const main_groups = setting.furnitures.filter(
    (furniture) => furniture.name === selectedGroup.name
  );
  let main_image, description;
  if (main_groups.length > 0) {
    main_image = main_groups[0].main_image;
    description = main_groups[0].description;
  }

  return selectedGroup.id ? (
    <Div>
      <ImgDiv>
        <img src={main_image} alt="main" />
      </ImgDiv>
      <Content>
        <h3>{selectedGroup.name}</h3>
        {/* <p>{selectedGroup.id}</p> */}
        <p>{description}</p>
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
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  background-color: ${theme.WHITE};

  @media (max-width: 767px) {
    display: none;
  }
`;

const ImgDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 15px 15px;

  img {
    width: 100%;
    min-height: 150px;
    background-color: #bdc0ba;
  }
`;

const Content = styled.div`
  margin: 0 15px 15px;
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
