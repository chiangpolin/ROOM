import React from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {addGroup, setInstruction} from '../../../app/actions/index.js';
import {_uuid} from '../../../app/utils/index.js';

function FurnitureInfo() {
  const {settings} = useSelector((state) => state.project);
  const dispatch = useDispatch();

  return (
    <Div>
      <Container>
        {settings.furniture.map((item, index) => (
          <Item key={index} onClick={() => handleClick(dispatch, item)}>
            <ItemImg></ItemImg>
            <ItemText>{item.name}</ItemText>
            <Dimension>
              {item.dimension.width} x {item.dimension.height}
            </Dimension>
          </Item>
        ))}
      </Container>
    </Div>
  );
}

function handleClick(dispatch, item) {
  const group = {
    id: _uuid(),
    name: item.name,
    type: item.type,
    file: item.file,
    dimension: item.dimension,
    position: item.position,
    rotation: item.rotation,
  };

  dispatch(addGroup(group));
  dispatch(setInstruction({type: 'add', group}));
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
  background-color: lightgrey;
`;

const ItemText = styled.p`
  margin: 5px 0;
  font-size: 16px;
`;

const Dimension = styled.p`
  font-size: 14px;
`;

export {FurnitureInfo};
