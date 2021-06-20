import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Joyride from 'react-joyride';
import styled, {css} from 'styled-components';
import {Header} from './Header.js';
import {UserCard} from './Cards/UserCard.js';
import {NewCard} from './Cards/NewCard.js';
import {ProjectCard} from './Cards/ProjectCard.js';
import {Modal} from './Modals/Modal.js';
import {UserModal} from './Modals/UserModal.js';
import {Alert} from '../Notification/Alert.js';
import {fetchProfileData, filterProjects} from '../../actions/index.js';
import * as theme from '../../constants/theme.js';
import {profileSteps, defaultOptions} from '../../constants/joyrideSettings.js';
import {handleJoyrideCallback} from '../../utils/joyride.js';
import {ReactComponent as FolderIcon} from '../../assets/images/icons/folder.svg';
import {ReactComponent as PersonIcon} from '../../assets/images/icons/person.svg';
import {ReactComponent as PeopleIcon} from '../../assets/images/icons/people.svg';
import {ReactComponent as CompassIcon} from '../../assets/images/icons/compass.svg';
import newroom from '../../assets/images/backgrounds/new.jpg';
import jungle from '../../assets/images/backgrounds/jungle.jpg';
import living from '../../assets/images/backgrounds/living.jpg';
import single from '../../assets/images/backgrounds/single.jpg';
import suite from '../../assets/images/backgrounds/suite.jpg';

function Profile() {
  const [run, setRun] = useState(false);
  const [userIsToggled, handleToggleUser] = useState(false);
  const [shareIsToggled, handleToggleShare] = useState(false);
  const {id, projects, sharedProjects, searchedProjects, filter} = useSelector(
    (state) => state.profile
  );
  const history = useHistory();
  const dispatch = useDispatch();

  const newCards = [
    {name: 'New Project', imageURL: newroom},
    {name: 'Single Bedroom', imageURL: single},
    {name: 'Owners Suite', imageURL: suite},
    {name: 'Jungle', imageURL: jungle},
    {name: 'Living Room', imageURL: living},
  ];

  const getMainTitle = (filter) => {
    switch (true) {
      case filter.author && filter.shared && filter.searched:
        return 'All Projects';
      case filter.author:
        return 'My Projects';
      case filter.shared:
        return 'Shared with me';
      case filter.searched:
        return 'Search Results';
      default:
        return null;
    }
  };

  useEffect(() => {
    dispatch(fetchProfileData(history));
  }, [history, dispatch]);

  return id ? (
    <Main>
      <Alert></Alert>
      <Joyride
        run={run}
        steps={profileSteps}
        continuous={true}
        callback={(data) => handleJoyrideCallback(data, setRun)}
        styles={{options: defaultOptions}}
      ></Joyride>
      <Header setRun={setRun} handleToggleUser={handleToggleUser}></Header>
      <Visual></Visual>
      <Section>
        <SideBar>
          <UserCard />
        </SideBar>
        <Content>
          <AddDiv>
            <div className="step-1">
              <h1>Create New Project</h1>
              <AddContainer>
                {newCards.map((item, index) => (
                  <NewCard
                    key={index}
                    name={item.name}
                    imageURL={item.imageURL}
                  ></NewCard>
                ))}
              </AddContainer>
            </div>
          </AddDiv>
          <div>
            <MainTitle>
              <h1>{getMainTitle(filter)}</h1>
              <FilterDiv>
                <div className="step-4">
                  <FilterButton
                    active={filter.author && filter.shared && filter.searched}
                    onClick={() =>
                      handleToggleFilter(dispatch, {
                        shared: true,
                        author: true,
                        searched: true,
                      })
                    }
                  >
                    <FolderIcon width="24" height="24"></FolderIcon>
                  </FilterButton>
                  <FilterButton
                    active={filter.author && !filter.shared && !filter.searched}
                    onClick={() =>
                      handleToggleFilter(dispatch, {
                        shared: false,
                        author: true,
                        searched: false,
                      })
                    }
                  >
                    <PersonIcon width="24" height="24"></PersonIcon>
                  </FilterButton>
                  <FilterButton
                    active={!filter.author && filter.shared && !filter.searched}
                    onClick={() =>
                      handleToggleFilter(dispatch, {
                        shared: true,
                        author: false,
                        searched: false,
                      })
                    }
                  >
                    <PeopleIcon width="24" height="24"></PeopleIcon>
                  </FilterButton>
                  <FilterButton
                    active={!filter.author && !filter.shared && filter.searched}
                    onClick={() =>
                      handleToggleFilter(dispatch, {
                        shared: false,
                        author: false,
                        searched: true,
                      })
                    }
                  >
                    <CompassIcon width="24" height="24"></CompassIcon>
                  </FilterButton>
                </div>
              </FilterDiv>
            </MainTitle>
            <MainContainer>
              {filter.author
                ? projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      id={project.id}
                      tag={'author'}
                      name={project.name}
                      author_id={project.author_id}
                      share_id={project.share_id}
                      imageURL={project.imageURL}
                      handleToggleShare={handleToggleShare}
                    ></ProjectCard>
                  ))
                : null}
              {filter.shared
                ? sharedProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      id={project.id}
                      tag={'shared'}
                      name={project.name}
                      author_id={project.author_id}
                      imageURL={project.imageURL}
                      handleToggleShare={handleToggleShare}
                    ></ProjectCard>
                  ))
                : null}
              {filter.searched
                ? searchedProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      id={project.id}
                      tag={'searched'}
                      name={project.name}
                      author_id={project.author_id}
                      imageURL={project.imageURL}
                      handleToggleShare={handleToggleShare}
                    ></ProjectCard>
                  ))
                : null}
            </MainContainer>
          </div>
        </Content>
      </Section>
      {shareIsToggled ? <Modal handleToggleShare={handleToggleShare} /> : ''}
      {userIsToggled ? (
        <UserModal handleToggleUser={handleToggleUser}></UserModal>
      ) : null}
    </Main>
  ) : (
    <Main></Main>
  );
}

function handleToggleFilter(dispatch, filter) {
  dispatch(
    filterProjects({
      shared: filter.shared,
      author: filter.author,
      searched: filter.searched,
    })
  );
}

const Main = styled.main`
  display: flex;
  justify-content: center;
  min-height: 100%;
  background-color: ${theme.ATHENSGRAY};
`;

const Section = styled.section`
  position: relative;
  display: flex;
  padding: 60px 30px 60px;
  width: 100%;
  max-width: 1200px;
  background-color: transparent;

  @media (max-width: 1024px) {
    padding: 60px 30px 30px 30px;
  }

  @media (max-width: 375px) {
    padding: 60px 30px 30px 30px;
  }
`;

const SideBar = styled.div`
  margin: 80px 0 0 0;

  h1 {
    padding: 0 0 15px 0;
    font-size: 24px;
  }
`;

const Visual = styled.div`
  position: absolute;
  width: 100%;
  height: 305px;
  background-color: ${theme.KASHMIRBLUE};

  @media (max-width: 767px) {
    height: 420px;
  }

  @media (max-width: 375px) {
    display: none;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 0 0 0 30px;

  h1 {
    padding: 10px 0 10px 0;
    font-size: 24px;
    line-height: 30px;
  }

  @media (max-width: 1024px) {
    padding: 0;
  }
`;

const AddDiv = styled.div`
  margin: 30px 0 30px;
  h1 {
    color: ${theme.WHITE};
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
    font-size: 24px;
  }

  p {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 16px;
  }

  @media (max-width: 375px) {
    display: none;
  }
`;

const AddContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px 15px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 375px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
const MainTitle = styled.div`
  display: flex;

  h1 {
    color: ${theme.MINESHAFT};
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
    font-size: 24px;
  }

  @media (max-width: 375px) {
    h1 {
      margin: 15px 0 0;
    }
  }
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

  @media (max-width: 575px) {
    display: none;
  }
`;

const FilterButton = styled.button`
  margin: 0 5px;
  padding: 5px 0;
  width: 36px;
  heigth: 36px;
  border: none;
  background-color: transparent;

  :hover {
    color: ${theme.ATHENSGRAY};
    background-color: ${theme.KASHMIRBLUE};
    border-radius: 5px;
    cursor: pointer;
  }

  @media (max-width: 575px) {
    display: none;
  }

  ${(props) =>
    props.active &&
    css`
      color: ${theme.ATHENSGRAY};
      background-color: ${theme.KASHMIRBLUE};
      border-radius: 5px;
    `}
`;
export {Profile};
