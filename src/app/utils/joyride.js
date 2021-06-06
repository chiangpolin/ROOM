import {STATUS} from 'react-joyride';

export function handleJoyrideCallback(data, setRun) {
  const {status} = data;

  if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
    // Need to set our running state to false, so we can restart if we click start again.
    setRun(false);
  }
}
