const initialState = {
  name: '',
  author_id: '',
  share_id: [],
  walls: [],
  furnitures: [],
  selectedFurniture: {},
  floors: [],
  cameras: [],
  groups: [],
  info: {},
  setting: {},
  instruction: {},
  dataIsFetched: false,
  dots: [],
  d_walls: [],
  d_floors: [],
  d_bases: [],
  tool: '',
  scale: 1,
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SETTING':
      return {
        ...state,
        setting: action.payload.setting,
      };

    case 'SET_INFO':
      return {
        ...state,
        info: action.payload.info,
      };

    case 'SET_PROJECT':
      return {
        ...state,
        name: action.payload.project.name,
        author_id: action.payload.project.author_id,
        share_id: action.payload.project.share_id,
        walls: action.payload.project.walls,
        furnitures: action.payload.project.furnitures,
        floors: action.payload.project.floors,
        cameras: action.payload.project.cameras,
        dataIsFetched: true,
      };

    case 'RESET_PROJECT_STATUS':
      return {
        ...state,
        dataIsFetched: false,
      };

    case 'ADD_FURNITURE':
      return {
        ...state,
        furnitures: [...state.furnitures, action.payload.furniture],
        instruction: {
          type: action.payload.instruction.type,
          furniture: action.payload.instruction.furniture,
        },
      };

    case 'REMOVE_FURNITURE':
      return {
        ...state,
        furnitures: state.furnitures.filter(
          (furniture) => furniture.id !== action.payload.furniture.id
        ),
        instruction: {
          type: action.payload.instruction.type,
          furniture: action.payload.instruction.furniture,
        },
      };

    case 'SELECT_FURNITURE':
      return {
        ...state,
        selectedFurniture: action.payload.furniture,
        info: 'group',
      };

    case 'SET_FURNITURE_POSITION':
      return {
        ...state,
        furnitures: state.furnitures.map((furniture) => {
          if (furniture.id === action.payload.furniture.id) {
            return {
              ...furniture,
              position: {
                x: action.payload.furniture.position.x,
                y: action.payload.furniture.position.y,
              },
            };
          }
          return furniture;
        }),
      };

    case 'SET_FURNITURE_ROTATION':
      return {
        ...state,
        furnitures: state.furnitures.map((furniture) => {
          if (furniture.id === action.payload.furniture.id) {
            return {
              ...furniture,
              rotation: {
                angle: action.payload.furniture.rotation.angle,
              },
            };
          }
          return furniture;
        }),
        instruction: {
          type: action.payload.instruction.type,
          furniture: action.payload.instruction.furniture,
        },
      };

    case 'SET_WALL_COLOR':
      return {
        ...state,
        walls: [{...state.walls[0], color: action.payload.color}],
      };

    case 'SET_FLOOR_TEXTURE':
      return {
        ...state,
        floors: [{...state.floors[0], path: action.payload.path}],
      };

    case 'SET_CAMERA_POSITION':
      return {
        ...state,
        cameras: [{...state.cameras[0], position: action.payload.position}],
      };

    case 'SET_INSTRUCTION':
      return {
        ...state,
        instruction: {
          type: action.payload.instruction.type,
          furniture: action.payload.instruction.furniture,
        },
      };

    case 'ADD_CANVAS_ELEMENT':
      switch (action.payload.type) {
        case 'wall':
          return {
            ...state,
            dots: [],
            d_walls: [...state.d_walls, [...action.payload.dots]],
          };
        case 'floor':
          return {
            ...state,
            dots: [],
            d_floors: [...state.d_floors, [...action.payload.dots]],
          };
        case 'base':
          return {
            ...state,
            dots: [],
            d_bases: [...state.d_bases, [...action.payload.dots]],
          };
        default:
      }
      break;

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

    default:
      return state;
  }
};

export default projectReducer;
