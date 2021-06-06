import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useParams} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import Joyride from 'react-joyride';
import {fetchProjectData} from '../../app/actions/index.js';
import * as theme from '../../app/constants/theme.js';
import {handleJoyrideCallback} from '../../app/utils/joyride.js';
import {Canvas} from './ProjectCanvas/Canvas.js';
import {Rendering} from './ProjectCanvas/Rendering.js';
import {Home} from './ProjectBars/Home.js';
import {Navbar} from './ProjectBars/Navbar.js';
import {Userbar} from './ProjectBars/Userbar.js';
import {Sidebar} from './ProjectBars/Sidebar.js';
import {Infobar} from './ProjectBars/Informations/Infobar.js';
import {Zooms} from './ProjectBars/Zooms.js';
import {Tools} from './ProjectBars/Tools.js';
import {CameraReels} from './ProjectBars/CameraReels.js';

function Project() {
  let {id} = useParams();
  const [run, setRun] = useState(false);
  const [steps, setSteps] = useState([
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
  ]);
  const [renderIsClicked, handleClickRender] = useState(false);
  const [userIsClicked, handleClickUser] = useState(false);
  const {dataIsFetched} = useSelector((state) => state.project);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjectData(id));
    // eslint-disable-next-line
  }, []);

  return dataIsFetched ? (
    <Main>
      <Joyride
        run={run}
        steps={steps}
        continuous={true}
        callback={(data) => handleJoyrideCallback(data, setRun)}
        styles={{
          options: {
            arrowColor: `${theme.WHITE}`,
            backgroundColor: `${theme.WHITE}`,
            primaryColor: `${theme.RURI}`,
            textColor: `${theme.SUMI}`,
            overlayColor: 'rgba(0, 0, 0, 0.5)',
            spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
            beaconSize: 36,
            zIndex: 100,
          },
        }}
      ></Joyride>
      <Section>
        <Home></Home>
        <Navbar
          userIsClicked={userIsClicked}
          renderIsClicked={renderIsClicked}
          handleClickUser={handleClickUser}
          setRun={setRun}
        ></Navbar>
        <Userbar userIsClicked={userIsClicked}></Userbar>
        <Sidebar></Sidebar>
        <Infobar></Infobar>
        <Tools></Tools>
        {renderIsClicked ? '' : <Zooms></Zooms>}
        {renderIsClicked ? <Rendering /> : <Canvas />}

        <CameraReels
          renderIsClicked={renderIsClicked}
          handleClickRender={handleClickRender}
        ></CameraReels>
      </Section>
    </Main>
  ) : (
    <Main>
      <section></section>
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  height: 100%;
`;

const Section = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export {Project};
