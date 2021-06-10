import * as theme from '../constants/theme.js';

export const defaultOptions = {
  arrowColor: `${theme.WHITE}`,
  backgroundColor: `${theme.WHITE}`,
  primaryColor: `${theme.RURI}`,
  textColor: `${theme.SUMI}`,
  overlayColor: 'rgba(0, 0, 0, 0.5)',
  spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
  beaconSize: 36,
  zIndex: 100,
};

export const profileSteps = [
  {
    target: '.step-1',
    content: 'This is your profile page.',
    placement: 'center',
  },
  {
    target: '.step-1',
    content: 'You can start with new projects we created for you.',
  },
  {
    target: '.step-2',
    content:
      'You can checkout projects you owned and projects shared with you here.',
  },
  {
    target: '.step-3',
    content: 'Cloning projects are suggested before editting.',
  },
  {
    target: '.step-4',
    content: 'You can filter displayed projects by ownership.',
  },
];

export const projectSteps = [
  {
    target: '.step-1',
    content: 'This is a canvas where you can edit your room plan.',
    placement: 'center',
  },
  {
    target: '.step-1',
    content: 'You can add some new furnitures here.',
  },
  {
    target: '.step-2',
    content: 'You can change the color of the selected wall element.',
  },
  {
    target: '.step-3',
    content: 'You can change the texture of the selected covering element.',
  },
  {
    target: '.step-4',
    content:
      'You can copy url of the website in order to share your project with others',
  },
  {
    target: '.step-5',
    content: 'Press rendering button and get a 3D view of the project!',
  },
];
