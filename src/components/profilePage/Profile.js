import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Joyride from 'react-joyride';
import {fetchProfileData, filterProjects} from '../../app/actions/index.js';
import * as theme from '../../app/constants/theme.js';
import {handleJoyrideCallback} from '../../app/utils/joyride.js';
import {ReactComponent as FolderIcon} from '../../static/images/icons/folder.svg';
import {ReactComponent as PersonIcon} from '../../static/images/icons/person.svg';
import {ReactComponent as PeopleIcon} from '../../static/images/icons/people.svg';
import {Header} from './Header.js';
import {UserCard} from './Cards/UserCard.js';
import {ProjectCard} from './Cards/ProjectCard.js';
import {Modal} from './Modals/Modal.js';
import {NewCard} from './Cards/NewCard.js';

function Profile() {
  const history = useHistory();
  const [run, setRun] = useState(false);
  const [steps, setSteps] = useState([
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
  ]);
  const {id, projects, sharedProjects, shareIsToggled, filter} = useSelector(
    (state) => state.profile
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileData(history));
    // eslint-disable-next-line
  }, []);

  return id ? (
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
      <Header setRun={setRun}></Header>
      <Section>
        <SideBar>
          <UserCard />
        </SideBar>
        <Content>
          <AddDiv>
            <div className="step-1">
              <h1>Create New Project</h1>
              <AddContainer>
                {[
                  'New Project',
                  'Single Bedroom',
                  'Owners Suite',
                  'Kitchen',
                  'Living Room',
                ].map((item, index) => (
                  <NewCard key={index} name={item}></NewCard>
                ))}
              </AddContainer>
            </div>
          </AddDiv>
          <div>
            <MainTitle>
              <h1>All Projects</h1>
              <FilterDiv>
                <div className="step-4">
                  <button
                    onClick={() =>
                      dispatch(filterProjects({shared: true, author: true}))
                    }
                  >
                    <FolderIcon width="24" height="24"></FolderIcon>
                  </button>
                  <button
                    onClick={() =>
                      dispatch(filterProjects({shared: false, author: true}))
                    }
                  >
                    <PersonIcon width="24" height="24"></PersonIcon>
                  </button>
                  <button
                    onClick={() =>
                      dispatch(filterProjects({shared: true, author: false}))
                    }
                  >
                    <PeopleIcon width="24" height="24"></PeopleIcon>
                  </button>
                </div>
              </FilterDiv>
            </MainTitle>
            <MainContainer>
              {filter.author
                ? projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      id={project.id}
                      name={project.name}
                      author_id={project.author_id}
                      imageURL={project.imageURL}
                    ></ProjectCard>
                  ))
                : ''}
              {filter.shared
                ? sharedProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      id={project.id}
                      name={project.name}
                      author_id={project.author_id}
                      imageURL={project.imageURL}
                    ></ProjectCard>
                  ))
                : ''}
            </MainContainer>
          </div>
        </Content>
      </Section>
      {shareIsToggled ? <Modal /> : ''}
    </Main>
  ) : (
    <Main></Main>
  );
}

const Main = styled.main`
  display: flex;
  justify-content: center;
  min-height: 100%;
  background-color: ${theme.WHITESMOKE};
`;

const Section = styled.section`
  position: relative;
  display: flex;
  padding: 90px 30px 30px;
  width: 100%;
  max-width: 1200px;
  background-color: transparent;

  @media (max-width: 1024px) {
    padding: 90px 30px 30px 30px;
  }

  @media (max-width: 375px) {
    padding: 90px 30px 30px 30px;
  }
`;

const SideBar = styled.div`
  margin: 53px 0 0 0;
  h1 {
    padding: 0 0 15px 0;
    font-size: 24px;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 0 0 0 30px;

  h1 {
    padding: 10px 0 10px 0;
    font-size: 24px;
  }

  @media (max-width: 1024px) {
    padding: 0;
  }
`;

const AddDiv = styled.div`
  @media (max-width: 375px) {
    display: none;
  }
`;

const AddContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px 15px;
  margin: 0 0 30px 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 375px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
const MainTitle = styled.div`
  display: flex;
`;

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px 15px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 375px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const FilterDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 0 auto;

  button {
    margin: 0 10px;
    border: none;
    background-color: transparent;

    :hover {
      color: ${theme.RURI};
      cursor: pointer;
    }
  }

  @media (max-width: 375px) {
    margin: 0 5px 0 auto;

    button {
      margin: 0 5px;
      }
    }
  }
`;

export {Profile};
