import React from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {addCanvasElement} from '../../../app/actions/index.js';

function FurnitureInfo() {
  const {setting} = useSelector((state) => state.project);
  const dispatch = useDispatch();

  return (
    <Div>
      <Container>
        {setting.furnitures.map((furniture, index) => (
          <Item
            key={index}
            onClick={() => {
              dispatch(addCanvasElement('furniture', furniture));
            }}
          >
            <ItemImg></ItemImg>
            <ItemText>{furniture.name}</ItemText>
            <Dimension>
              {furniture.dimension.width} x {furniture.dimension.height}
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
`;

const ItemImg = styled.img`
  margin: 10px 0 0;
  width: 80%;
  height: 80px;
  background-color: #bdc0ba;
`;

const ItemText = styled.p`
  margin: 5px 0;
  font-size: 16px;
`;

const Dimension = styled.p`
  font-size: 14px;
`;

export {FurnitureInfo};
