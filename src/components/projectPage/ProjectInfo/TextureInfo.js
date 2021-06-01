import React from 'react';
import styled, {css} from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {setCoveringTexture} from '../../../app/actions/index.js';

function TextureInfo() {
  const {setting, selectedGroup} = useSelector((state) => state.project);
  const dispatch = useDispatch();

  return (
    <Div>
      <Container>
        {setting.textures.map((texture, index) => (
          <Item
            key={index}
            primary={
              selectedGroup.type === 'covering' &&
              selectedGroup.path === texture.path
            }
            onClick={() =>
              dispatch(setCoveringTexture(selectedGroup.id, texture.path))
            }
          >
            <ItemImg src={texture.main_image}></ItemImg>
            <ItemText>{texture.name}</ItemText>
            <Dimension>
              {0} x {0}
            </Dimension>
          </Item>
        ))}
      </Container>
    </Div>
  );
}

const Div = styled.div`
  width: 300px;
  border-right: 1px solid #1c1c1c;
  overflow-y: scroll;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 15px 15px;
`;

const Item = styled.button`
  width: 100%;
  border: none;
  background-color: transparent;
  border: 1px solid transparent;

  :hover {
    border: 1px solid #1c1c1c;
    cursor: pointer;
  }

  ${(props) =>
    props.primary &&
    css`
      border: 1px solid #1c1c1c;
    `}
`;

const ItemImg = styled.img`
  margin: 10px 0 0;
  width: 80%;
  height: 80px;
  background-color: transparent;
`;

const ItemText = styled.p`
  margin: 5px 0;
  font-size: 16px;
`;

const Dimension = styled.p`
  font-size: 14px;
`;

export {TextureInfo};
