import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {
  closeShare,
  fetchSearchTarget,
  selectSearchTarget,
  shareProject,
} from '../../../app/actions/index.js';
import {ReactComponent as X} from '../../../static/images/icons/x.svg';
import {ReactComponent as SearchIcon} from '../../../static/images/icons/search.svg';

function Modal() {
  const [email, setEmail] = useState('');
  const {searchTarget, selectedTarget, selectedProject} = useSelector(
    (state) => state.profile
  );
  const dispatch = useDispatch();

  return (
    <Div>
      <Mask></Mask>
      <ModalBody>
        <Button onClick={() => handleClickX(dispatch)}>
          <X width="24" height="24" />
        </Button>
        <Content>
          <SearchBar>
            <Input
              type="text"
              value={email}
              onChange={(event) => handleChange(event, setEmail)}
            ></Input>
            <SearchButton onClick={() => handleSubmit(dispatch, email)}>
              <SearchIcon />
            </SearchButton>
          </SearchBar>
          {searchTarget.id ? (
            <Target
              primary={searchTarget.id === selectedTarget.id}
              onClick={() => handleSelect(dispatch, searchTarget)}
            >
              <TargetImg></TargetImg>
              <TargetName>{searchTarget.name}</TargetName>
            </Target>
          ) : (
            ''
          )}
          <ShareButton
            onClick={() =>
              handleClickShare(dispatch, selectedProject.id, selectedTarget.id)
            }
            disabled={selectedTarget.id === ''}
          >
            Share
          </ShareButton>
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

function handleClickX(dispatch) {
  dispatch(closeShare());
}

function handleSelect(dispatch, searchTarget) {
  dispatch(selectSearchTarget(searchTarget));
}

const Div = styled.div`
  position: fixed;
  z-index: 30;
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
  width: 30%;
  height: 60%;
  background-color: white;
  opacity: 1;
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
  margin: 45px 30px 30px;
`;

const SearchBar = styled.div`
  display: flex;
`;

const SearchButton = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const Input = styled.input`
  padding: 0 10px;
  width: 100%;
  font-size: 16px;
  line-height: 24px;
  align-text: center;
`;

const Target = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;
  :hover {
    border: 1px solid #1c1c1c;
    cursor: pointer;
  }
  ${(props) =>
    props.primary &&
    css`
      border: 1px solid #1c1c1c;
    `}
`;

const TargetImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: pink;
`;

const TargetName = styled.p`
  margin: 0 0 0 15px;
  font-size: 16px;
`;

const ShareButton = styled.button`
  width: 100%;
  margin: auto 0 0;
`;

export {Modal};
