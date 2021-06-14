import React from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {useDrag} from 'react-dnd';
import {addCanvasElement} from '../../../../app/actions/index.js';
import {ItemTypes} from '../../../../app/constants/dragTypes.js';
import noimage from '../../../../static/images/backgrounds/noimage.png';

function OpeningsItem(props) {
  const dispatch = useDispatch();
  const {scale} = useSelector((state) => state.project);
  const [{isDragging}, drag] = useDrag(() => ({
    type: ItemTypes.ELEMENT,
    item: props.opening,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        dispatch(
          addCanvasElement('opening', {
            ...item,
            position: {
              x:
                (dropResult.position.x - document.body.clientWidth / 2) / scale,
              y:
                (dropResult.position.y - document.body.clientHeight / 2) /
                scale,
              z_index: item.position.z_index,
            },
          })
        );
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
    <Item>
      <img
        src={props.opening.main_image ? props.opening.main_image : noimage}
        ref={drag}
        style={{opacity: isDragging ? 0.5 : 1}}
      ></img>
      <p>{props.opening.name}</p>
    </Item>
  );
}

const Item = styled.button`
  justify-content: center;
  margin: 0 0 10px;
  width: 100%;
  border: none;
  background-color: transparent;
  border: 1px solid transparent;

  :hover {
    box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
    cursor: pointer;
  }

  img {
    width: 100%;
  }

  p {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 14px;
  }
`;

export {OpeningsItem};
