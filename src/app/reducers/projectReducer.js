const initialState = {
  name: '',
  author_id: '',
  share_id: [],
  groups: [],
  selectedGroup: {
    name: '',
    id: '',
    type: '',
    position: {x: 0, y: 0},
    rotation: {angle: 0},
    dimension: {width: 0, height: 0},
    file: {svgPath: '', gltfPath: ''},
  },
  room: {},
  floor: {},
  camera: {},
  info: '',
  settings: {furniture: [], floor: []},
  instruction: {type: '', group: {}},
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PROJECT':
      return {
        ...state,
        name: action.project.name,
        author_id: action.project.author_id,
        share_id: action.project.share_id,
        groups: action.project.groups,
        room: action.project.room,
        floor: action.project.floor,
        camera: action.project.camera,
      };
    case 'SELECT_GROUP':
      return {
        ...state,
        selectedGroup: action.group,
        info: 'group',
      };

    case 'ADD_NEW_GROUP':
      return {
        ...state,
        groups: [...state.groups, action.group],
      };

    case 'UPDATE_GROUP':
      return {
        ...state,
        groups: state.groups.map((group) => {
          if (group.id === action.group.id) {
            return {
              ...group,
              position: {
                x: action.group.position.x,
                y: action.group.position.y,
              },
            };
          }
          return group;
        }),
      };

    case 'UPDATE_GROUP_ROTATION':
      return {
        ...state,
        groups: state.groups.map((group) => {
          if (group.id === action.group.id) {
            return {
              ...group,
              rotation: {
                angle: action.group.rotation.angle,
              },
            };
          }
          return group;
        }),
        instruction: {
          type: action.instruction.type,
          group: action.instruction.group,
        },
      };

    case 'DELETE_GROUP':
      return {
        ...state,
        groups: state.groups.filter((group) => group.id !== action.group.id),
        instruction: {
          type: action.instruction.type,
          group: action.instruction.group,
        },
      };

    case 'SET_INFO':
      return {
        ...state,
        info: action.info,
      };

    case 'INIT_SETTINGS':
      return {
        ...state,
        settings: action.settings,
      };

    case 'SET_INSTRUCTION':
      return {
        ...state,
        instruction: {
          type: action.instruction.type,
          group: action.instruction.group,
        },
      };

    case 'SET_ROOM_COLOR':
      return {
        ...state,
        room: {...state.room, color: action.color},
      };

    case 'SET_FLOOR_TEXTURE':
      return {
        ...state,
        floor: {...state.floor, path: action.path},
      };

    case 'SET_CAMERA_POSITION':
      return {
        ...state,
        camera: {...state.camera, position: action.position},
      };

    default:
      return state;
  }
};

export default projectReducer;
