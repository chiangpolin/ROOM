import React, {useEffect, useState} from 'react';
import styled, {css} from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {
  resetSearchTargets,
  fetchSearchTargets,
  fetchSearchTarget,
  shareProject,
} from '../../../app/actions/index.js';
import * as theme from '../../../app/constants/theme.js';
import {ReactComponent as X} from '../../../static/images/icons/x.svg';
import {ReactComponent as SearchIcon} from '../../../static/images/icons/search.svg';
import avatar from '../../../static/images/backgrounds/profile-avatar.png';

function Modal(props) {
  const [email, setEmail] = useState('');
  const [shareIsClicked, setIsClicked] = useState(false);
  const {searchTargets, selectedProject} = useSelector(
    (state) => state.profile
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetSearchTargets());
    dispatch(fetchSearchTargets(selectedProject.share_id));
    // eslint-disable-next-line
  }, []);

  return (
    <Div>
      <Mask></Mask>
      <ModalBody>
        <Button onClick={() => handleClickX(props)}>
          <X width="24" height="24" />
        </Button>
        <Content>
          <h3>Share Project "{selectedProject.name}"</h3>
          <SearchBar>
            <Input
              type="text"
              value={email}
              onChange={(event) => handleChange(event, setEmail)}
              placeholder={'Search User by Email'}
            ></Input>
            <SearchButton onClick={() => handleSubmit(dispatch, email)}>
              <SearchIcon />
            </SearchButton>
          </SearchBar>
          <Targets>
            {searchTargets.map((target) => (
              <Target>
                <img src={avatar}></img>
                <p>{target.name}</p>
                <ShareButton
                  disabled={
                    shareIsClicked ||
                    selectedProject.share_id.filter((id) => id === target.id)[0]
                  }
                  onClick={() => {
                    handleClickShare(dispatch, selectedProject.id, target.id);
                    setIsClicked(true);
                  }}
                >
                  Share
                </ShareButton>
              </Target>
            ))}
          </Targets>
        </Content>
      </ModalBody>
    </Div>
  );
}

function handleChange(event, setValue) {
  setValue(event.target.value);
}

function handleSubmit(dispatch, email) {
  dispatch(fetchSearchTarget(email));
}

function handleClickShare(dispatch, project_id, target_id) {
  dispatch(shareProject(project_id, target_id));
}

function handleClickX(props) {
  props.handleToggleShare(false);
}

const Div = styled.div`
  position: fixed;
  z-index: 40;
  width: 100%;
  height: 100%;
`;

const Mask = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #1c1c1c;
  opacity: 0.7;
`;

const ModalBody = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  height: 60%;
  background-color: white;
  border-radius: 5px;
  opacity: 1;

  @media (max-width: 1023px) {
    width: 50%;
  }

  @media (max-width: 767px) {
    width: 80%;
  }

  @media (max-width: 375px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

const Button = styled.button`
  position: absolute;
  right: 0;
  margin: 15px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const Content = styled.div`
  margin: 30px 20px 30px 30px;

  h3 {
    margin: 0 0 5px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
    font-size: 16px;
  }
`;

const SearchBar = styled.div`
  display: flex;
  margin: 0 30px 0 0;
`;

const SearchButton = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const Input = styled.input`
  margin: 0 5px 0 0;
  padding: 0 10px;
  width: 100%;
  font-size: 16px;
  line-height: 24px;
  align-text: center;
  border: 1px solid ${theme.MINESHAFT}
  border-radius: 5px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  font-size: 16px;

  :focus{
    outline: none;
  }
`;

const Targets = styled.div`
  height: 300px;
  overflow-y: scroll;
`;

const Target = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 15px 15px 0;

  img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: ${theme.ATHENSGRAY};
  }

  p {
    margin: 0 0 0 15px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 16px;
  }
`;

const ShareButton = styled.button`
  margin: 0 0 0 auto;
  padding: 0 5px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  font-size: 16px;
  border: 1px solid ${theme.KASHMIRBLUE};
  border-radius: 5px;
  color: ${theme.WHITE};
  background-color: ${theme.KASHMIRBLUE};
  cursor: pointer;

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.6;
    `}
`;

export {Modal};
