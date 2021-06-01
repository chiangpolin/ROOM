import {_uuid} from '../utils/general';

const initialState = {
  // profile
  name: '',
  author_id: '',
  share_id: [],
  // status
  dataIsFetched: false,
  // side bar
  setting: {},
  information: {},
  selectedGroup: {},
  tool: '',
  // pixi instructions
  instruction: {},
  // pixi dots
  dots: [],
  // pixi canvas
  scale: 1,
  d_cameras: [],
  d_furnitures: [],
  d_walls: [],
  d_openings: [],
  d_coverings: [],
  d_floors: [],
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PROJECT':
      return {
        ...state,
        name: action.payload.project.name,
        author_id: action.payload.project.author_id,
        share_id: action.payload.project.share_id,
        d_cameras: action.payload.project.cameras,
        d_furnitures: action.payload.project.furnitures,
        d_walls: action.payload.project.walls,
        d_openings: action.payload.project.openings,
        d_coverings: action.payload.project.coverings,
        d_floors: action.payload.project.floors,
        dataIsFetched: true,
      };

    case 'SET_PROJECT_COLLECTION':
      return {
        ...state,
        [action.payload.key]: action.payload.data,
      };

    case 'RESET_PROJECT_STATUS':
      return {
        ...state,
        dataIsFetched: false,
      };

    case 'SET_SETTING':
      return {
        ...state,
        setting: action.payload.setting,
      };

    case 'SET_INFORMATION':
      return {
        ...state,
        information: action.payload.information,
      };

    case 'SET_INSTRUCTION':
      return {
        ...state,
        instruction: {
          type: action.payload.instruction.type,
          target: action.payload.instruction.target,
          group: action.payload.instruction.group,
        },
      };

    case 'ADD_CANVAS_ELEMENT':
      switch (action.payload.target) {
        case 'furniture':
          return {
            ...state,
            d_furnitures: [
              ...state.d_furnitures,
              {
                name: action.payload.group.name,
                id: _uuid(),
                type: 'furniture',
                method: 'post',
                file: action.payload.group.file,
                dimension: action.payload.group.dimension,
                position: {x: 0, y: 0},
                rotation: {angle: 0},
              },
            ],
            instruction: {
              type: 'add',
              target: 'furniture',
              group: action.payload.group,
            },
          };
        case 'wall':
          return {
            ...state,
            dots: [],
            d_walls: [
              ...state.d_walls,
              {
                name: 'Untitle Wall',
                id: _uuid(),
                type: 'wall',
                method: 'post',
                color: {r: 252, g: 250, b: 242},
                thickness: 15,
                graphic: [...action.payload.group],
              },
            ],
            instruction: {
              type: 'add',
              target: 'wall',
            },
          };
        case 'covering':
          return {
            ...state,
            dots: [],
            d_coverings: [
              ...state.d_coverings,
              {
                name: 'Bedroom Covering',
                id: _uuid(),
                type: 'covering',
                method: 'post',
                path: 'kitchen-wood.jpg',
                graphic: [...action.payload.group],
              },
            ],
            instruction: {
              type: 'add',
              target: 'covering',
            },
          };
        case 'floor':
          return {
            ...state,
            dots: [],
            d_floors: [
              ...state.d_floors,
              {
                name: 'Bedroom Floor',
                id: _uuid(),
                type: 'floor',
                method: 'post',
                color: {r: 252, g: 250, b: 242},
                graphic: [...action.payload.group],
              },
            ],
            instruction: {
              type: 'add',
              target: 'floor',
            },
          };
        default:
          return {...state};
      }

    case 'REMOVE_CANVAS_ELEMENT':
      switch (action.payload.target) {
        case 'furniture':
          return {
            ...state,
            d_furnitures: state.d_furnitures.map((furniture) => {
              return furniture.id === action.payload.uuid
                ? {
                    ...furniture,
                    method: 'delete',
                  }
                : {...furniture};
            }),
            instruction: {
              type: 'remove',
              target: 'furniture',
            },
          };
        case 'wall':
          return {
            ...state,
            d_walls: state.d_walls.map((wall) => {
              return wall.id === action.payload.uuid
                ? {
                    ...wall,
                    method: 'delete',
                  }
                : {...wall};
            }),
            instruction: {
              type: 'remove',
              target: 'wall',
            },
          };
        case 'covering':
          return {
            ...state,
            d_coverings: state.d_coverings.map((covering) => {
              return covering.id === action.payload.uuid
                ? {
                    ...covering,
                    method: 'delete',
                  }
                : {...covering};
            }),
            instruction: {
              type: 'remove',
              target: 'covering',
            },
          };
        case 'opening':
          return {
            ...state,
            d_openings: state.d_openings.map((opening) => {
              return opening.id === action.payload.uuid
                ? {
                    ...opening,
                    method: 'delete',
                  }
                : {...opening};
            }),
            instruction: {
              type: 'remove',
              target: 'opening',
            },
          };
        case 'floor':
          return {
            ...state,
            d_floors: state.d_floors.map((floor) => {
              return floor.id === action.payload.uuid
                ? {
                    ...floor,
                    method: 'delete',
                  }
                : {...floor};
            }),
            instruction: {
              type: 'remove',
              target: 'floor',
            },
          };
        default:
          return {
            ...state,
          };
      }

    case 'SELECT_CANVAS_ELEMENT':
      return {
        ...state,
        selectedGroup: action.payload.group,
        information: 'group',
      };

    case 'SET_CANVAS_TOOL':
      return {
        ...state,
        tool: action.payload.type,
      };

    case 'SET_CANVAS_SCALE':
      return {
        ...state,
        scale: action.payload.scale,
      };

    case 'SET_CAMERA_POSITION':
      return {
        ...state,
        d_cameras: [{...state.d_cameras[0], position: action.payload.position}],
      };

    case 'SET_FURNITURE_POSITION':
      return {
        ...state,
        d_furnitures: state.d_furnitures.map((furniture) => {
          return furniture.id === action.payload.uuid
            ? {
                ...furniture,
                position: {
                  x: action.payload.position.x,
                  y: action.payload.position.y,
                },
              }
            : {...furniture};
        }),
      };

    case 'SET_FURNITURE_ROTATION':
      return {
        ...state,
        d_furnitures: state.d_furnitures.map((furniture) => {
          return furniture.id === action.payload.uuid
            ? {
                ...furniture,
                rotation: {
                  angle: action.payload.rotation.angle,
                },
              }
            : {...furniture};
        }),
        instruction: {
          type: 'rotate',
          target: 'furniture',
        },
        selectedGroup: {
          ...state.selectedGroup,
          rotation: {
            angle: action.payload.rotation.angle,
          },
        },
      };

    case 'SET_WALL_COLOR':
      return {
        ...state,
        d_walls: state.d_walls.map((wall) => {
          return wall.id === action.payload.uuid
            ? {...wall, color: action.payload.color}
            : {...wall};
        }),
        selectedGroup: {
          ...state.selectedGroup,
          color: action.payload.color,
        },
      };

    case 'SET_COVERING_TEXTURE':
      return {
        ...state,
        d_coverings: state.d_coverings.map((covering) => {
          return covering.id === action.payload.uuid
            ? {...covering, path: action.payload.path}
            : {...covering};
        }),
        selectedGroup: {
          ...state.selectedGroup,
          path: action.payload.path,
        },
      };

    default:
      return state;
  }
};

export default projectReducer;
