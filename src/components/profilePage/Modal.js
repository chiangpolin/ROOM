import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {
  closeShareProject,
  selectTarget,
  setSearchTarget,
} from '../../app/actions/index.js';
import {
  getUserByEmail,
  getProject,
  putSharedId,
} from '../../app/utils/firebase.js';
import {ReactComponent as X} from '../../static/images/icons/x.svg';
import {ReactComponent as SearchIcon} from '../../static/images/icons/search.svg';

function Modal() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const [email, setEmail] = useState('');

  return (
    <Div>
      <Mask></Mask>
      <ModalBody>
        <Button onClick={() => dispatch(closeShareProject())}>
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
          {profile.searchTarget.id ? (
            <Target
              primary={profile.searchTarget.id === profile.selectedTarget.id}
              onClick={() => dispatch(selectTarget(profile.searchTarget))}
            >
              <TargetImg></TargetImg>
              <TargetName>{profile.searchTarget.name}</TargetName>
            </Target>
          ) : (
            ''
          )}
          <ShareButton
            onClick={() => handleClickShare(dispatch, profile)}
            disabled={profile.selectedTarget.id === ''}
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

async function handleSubmit(dispatch, email) {
  const user = await getUserByEmail(email);
  if (!user) {
    window.alert('user not exist');
    return;
  }
  dispatch(
    setSearchTarget({id: user.id, name: user.data.name, photo: user.data.photo})
  );
}

async function handleClickShare(dispatch, profile) {
  const project = await getProject(profile.selectedProject.id);
  for (let i = 0; i < project.share_id.length; i++) {
    if (project.share_id[i] === profile.selectedTarget.id) {
      window.alert('project is shared!!');
      return;
    }
  }
  project.share_id.push(profile.selectedTarget.id);
  putSharedId(profile.selectedProject.id, {share_id: project.share_id});
  dispatch(closeShareProject());
}

const Div = styled.div`
  position: fixed;
  z-index: 20px;
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
  transform: translate(-50%, -60%);
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
