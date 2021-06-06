import React from 'react';
import styled, {css} from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {useDrag} from 'react-dnd';
import {addCanvasElement} from '../../../../app/actions/index.js';
import {ItemTypes} from '../../../../app/constants/dragTypes.js';
import avatar from '../../../../static/images/backgrounds/profile-avatar.png';

function FurnituresItem(props) {
  const dispatch = useDispatch();
  const {scale} = useSelector((state) => state.project);
  const [{isDragging}, drag] = useDrag(() => ({
    type: ItemTypes.FURNITURE,
    item: props.furniture,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        dispatch(
          addCanvasElement('furniture', {
            ...item,
            position: {
              x:
                (dropResult.position.x - document.body.clientWidth / 2) / scale,
              y:
                (dropResult.position.y - document.body.clientHeight / 2) /
                scale,
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
        src={avatar}
        ref={drag}
        style={{opacity: isDragging ? 0.5 : 1}}
      ></img>
      <p>{props.furniture.name}</p>
      <p>
        {props.furniture.dimension.width} x {props.furniture.dimension.height}
      </p>
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
    border: 1px solid #1c1c1c;
    cursor: pointer;
  }

  ${(props) =>
    props.primary &&
    css`
      border: 1px solid #1c1c1c;
    `}

  img {
    width: 100%;
  }

  p {
    font-size: 14px;
  }
`;

export {FurnituresItem};
