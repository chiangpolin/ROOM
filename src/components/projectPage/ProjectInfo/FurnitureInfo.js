import React from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {addNewGroup, setInstruction} from '../../../app/actions';

function FurnitureInfo() {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);

  return (
    <Div>
      <Container>
        {project.settings.furniture.map((item, index) => (
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

  dispatch(addNewGroup(group));
  dispatch(setInstruction({type: 'new', group}));
}

function _uuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
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
