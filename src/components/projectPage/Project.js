import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useParams} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProjectData} from '../../app/actions/index.js';
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
      <Section>
        <Home></Home>
        <Navbar
          userIsClicked={userIsClicked}
          renderIsClicked={renderIsClicked}
          handleClickUser={handleClickUser}
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
