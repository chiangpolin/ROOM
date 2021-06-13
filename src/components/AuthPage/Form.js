import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {
  signUp,
  signIn,
  googleSignIn,
  facebookSignIn,
  forgetPassword,
} from '../../app/actions/index.js';
import * as theme from '../../app/constants/theme.js';
import {checkValidation} from '../../app/utils/validate.js';
import {ReactComponent as GoogleIcon} from '../../static/images/brands/google.svg';
import {ReactComponent as FacebookIcon} from '../../static/images/brands/facebook.svg';
import {ReactComponent as PersonIcon} from '../../static/images/icons/person.svg';
import {ReactComponent as EnvelopeIcon} from '../../static/images/icons/envelope.svg';
import {ReactComponent as LockIcon} from '../../static/images/icons/lock.svg';

function Form(props) {
  let history = useHistory();
  const [name, setName] = useState('');
  const [nameIsValid, setNameValidation] = useState(true);
  const [email, setEmail] = useState('user@gmail.com');
  const [newEmail, setNewEmail] = useState('');
  const [emailIsValid, setEmailValidation] = useState(true);
  const [password, setPassword] = useState('batch13');
  const [newPassword, setNewPassword] = useState('');
  const [passwordIsValid, setPasswordValidation] = useState(true);
  const dispatch = useDispatch();

  switch (props.type) {
    case 'sign-in':
      return (
        <Div>
          <h1>Sign In</h1>
          <h2>Room</h2>
          <TPLButtons>
            <GoogleButton
              onClick={() => handleClickGoogleSignIn(dispatch, history)}
            >
              <GoogleIcon width="20" height="20" />
              <p>Google</p>
            </GoogleButton>
            <FacebookButton
              onClick={() => handleClickFacebookSignIn(dispatch, history)}
            >
              <FacebookIcon width="20" height="20" />
              <p>Facebook</p>
            </FacebookButton>
          </TPLButtons>
          <h3>or use your email to sign in:</h3>
          <InputDiv>
            <Input
              type="text"
              value={email}
              onChange={(event) => handleChange(event, setEmail)}
            ></Input>
            <div>
              <EnvelopeIcon></EnvelopeIcon>
            </div>
          </InputDiv>
          <InputDiv>
            <Input
              type="password"
              value={password}
              onChange={(event) => handleChange(event, setPassword)}
            ></Input>
            <div>
              <LockIcon></LockIcon>
            </div>
            <p
              style={{
                display: 'inline-block',
                margin: '10px 0 0 5px',
                cursor: 'pointer',
              }}
              onClick={() => handleClickForgetPassword(dispatch, email)}
            >
              Forget Password?
            </p>
          </InputDiv>
          <Buttons>
            <Button
              primary
              onClick={() =>
                handleClickSignIn(dispatch, history, email, password)
              }
            >
              Sign In
            </Button>
          </Buttons>
          <hr></hr>
          <Buttons>
            <Button onClick={() => props.setType('sign-up')}>
              Create New Account
            </Button>
          </Buttons>
        </Div>
      );
    case 'sign-up':
      return (
        <Div>
          <h1>Sign Up</h1>
          <h2>Room</h2>
          <TPLButtons>
            <GoogleButton
              onClick={() => handleClickGoogleSignIn(dispatch, history)}
            >
              <GoogleIcon width="20" height="20" />
              <p>Google</p>
            </GoogleButton>
            <FacebookButton
              onClick={() => handleClickFacebookSignIn(dispatch, history)}
            >
              <FacebookIcon width="20" height="20" />
              <p>Facebook</p>
            </FacebookButton>
          </TPLButtons>
          <InputDiv>
            <Input
              type="text"
              placeholder="Name"
              value={name}
              invalid={!nameIsValid}
              onChange={(event) => handleChange(event, setName)}
            ></Input>
            <div>
              <PersonIcon></PersonIcon>
            </div>
          </InputDiv>
          <InputDiv>
            <Input
              type="text"
              placeholder="Email"
              value={newEmail}
              invalid={!emailIsValid}
              onChange={(event) => handleChange(event, setNewEmail)}
            ></Input>
            <div>
              <EnvelopeIcon></EnvelopeIcon>
            </div>
          </InputDiv>
          <InputDiv>
            <Input
              type="password"
              placeholder="Password"
              value={newPassword}
              invalid={!passwordIsValid}
              onChange={(event) => handleChange(event, setNewPassword)}
            ></Input>
            <div>
              <LockIcon></LockIcon>
            </div>
          </InputDiv>
          <Buttons>
            <Button
              primary
              onClick={() =>
                handleClickSignUp(
                  dispatch,
                  history,
                  name,
                  newEmail,
                  newPassword,
                  setNameValidation,
                  setEmailValidation,
                  setPasswordValidation
                )
              }
            >
              Sign Up
            </Button>
          </Buttons>
          <hr></hr>
          <Buttons>
            <Button onClick={() => props.setType('sign-in')}>
              Use an Existing Account
            </Button>
          </Buttons>
        </Div>
      );
    default:
      return <Div></Div>;
  }
}

function handleChange(event, setValue) {
  setValue(event.target.value);
}

async function handleClickSignIn(dispatch, history, email, password) {
  const credential = await dispatch(signIn(email, password));
  if (credential.user.uid) {
    history.push('/profile');
  } else {
    alert('User not exist');
  }

  // if (credential.user.emailVerified) {
  //   history.push('/profile');
  // } else {
  //   alert('Email not verify');
  // }
}

async function handleClickSignUp(
  dispatch,
  history,
  name,
  email,
  password,
  setNameValidation,
  setEmailValidation,
  setPasswordValidation
) {
  const check = checkValidation({name, email, password});
  setNameValidation(check.nameIsValid);
  setEmailValidation(check.emailIsValid);
  setPasswordValidation(check.passwordIsValid);
  if (!check.nameIsValid || !check.emailIsValid || !check.passwordIsValid) {
    return;
  }

  const id = await dispatch(signUp(name, email, password));
  if (id) {
    history.push('/profile');
  } else {
    alert('Something went wrong');
  }
}

async function handleClickGoogleSignIn(dispatch, history) {
  const result = await dispatch(googleSignIn());
  if (result.user.uid) {
    history.push('/profile');
  } else {
    alert('User not exist');
  }
}

async function handleClickFacebookSignIn(dispatch, history) {
  const result = await dispatch(facebookSignIn());
  if (result.user.uid) {
    history.push('/profile');
  } else {
    alert('User not exist');
  }
}

async function handleClickForgetPassword(dispatch, email) {
  if (email === '') {
    return;
  }
  dispatch(forgetPassword(email));
}

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 360px;
  height: 100%;
  border: 1px solid ${theme.WHITE};
  border-radius: 10px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  background-color: ${theme.WHITE};

  h1 {
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
    font-size: 36px;
    margin: 10px 20px 5px;
    color: ${theme.PALESKY};
  }

  h2 {
    display: none;
  }

  h3 {
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
    font-size: 16px;
    margin: 0 20px;
    color: ${theme.PALESKY};
  }

  p {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 16px;
    margin: 0 5px 0;
  }

  hr {
    margin: 0 15px;
    border: 1px solid ${theme.IRON};
  }

  @media (max-width: 768px) {
    height: 100%;
    hr {
      margin: 0 15px 10px;
    }
  }

  @media (max-width: 480px) {
    width: 100%;
  }

  @media (max-width: 375px) {
    width: 300px;
    border: none;
    box-shadow: none;
    background-color: transparent;

    h1 {
      display: none;
    }

    h2 {
      display: block;
      font-family: 'Varela Round';
      font-weight: 600;
      font-size: 36px;
      margin: 10px 20px 5px;
      color: ${theme.WHITE};
    }

    h3 {
      color: ${theme.WHITE};
    }

    hr {
      border: 1px solid ${theme.WHITE};
    }
  }
`;

const InputDiv = styled.div`
  position: relative;
  margin: 5px 15px 5px;
  font-size: 16px;
  color: ${theme.PALESKY};

  div {
    position: absolute;
    top: 10px;
    left: 20px;
  }

  @media (max-width: 375px) {
    color: ${theme.WHITE};
  }
`;

const Input = styled.input`
  margin: 5px 0 0;
  padding: 0 0 0 50px;
  width: 100%;
  height: 30px;
  border: 1px solid ${theme.IRON};
  border-radius: 5px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: ${theme.PALESKY};
  background-color: transparent;

  :focus {
    outline: none !important;
  }

  ::placeholder {
    color: ${theme.PALESKY};
  }

  @media (max-width: 375px) {
    border: 1px solid ${theme.WHITE};
    color: ${theme.WHITE};

    ::placeholder {
      color: ${theme.WHITE};
    }
  }

  ${(props) =>
    props.invalid &&
    css`
      background-color: ${theme.KASHMIRBLUE};
    `}
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 10px;
  width: 100%;
  height: 30px;
  border: 1px solid ${theme.IRON};
  border-radius: 5px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: ${theme.PALESKY};
  background-color: ${theme.WHITE};

  :hover {
    cursor: pointer;
  }

  svg {
    margin: 0 5px 0 0;
  }

  @media (max-width: 375px) {
    border: 1px solid ${theme.WHITE};
  }
`;

const FacebookButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 10px;
  width: 100%;
  height: 30px;
  border: 1px solid ${theme.FACEBOOK};
  border-radius: 5px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: ${theme.WHITE};
  background-color: ${theme.FACEBOOK};

  :hover {
    cursor: pointer;
  }

  svg {
    margin: 0 5px 0 0;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 10px;
  width: 100%;
  height: 30px;
  border: 1px solid ${theme.IRON};
  border-radius: 5px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: ${theme.PALESKY};
  background-color: transparent;

  svg {
    margin: 0 5px 0 0;
  }

  :hover {
    cursor: pointer;
    color: ${theme.WHITE};
    background-color: ${theme.KASHMIRBLUE};
    border: 1px solid ${theme.KASHMIRBLUE};
  }

  @media (max-width: 375px) {
    color: ${theme.WHITE};
    border: 1px solid ${theme.WHITE};

    :hover {
      cursor: pointer;
      color: ${theme.WHITE};
      background-color: ${theme.KASHMIRBLUE};
    }
  }

  ${(props) =>
    props.primary &&
    css`
      margin: 10px 0 10px;
      color: ${theme.WHITE};
      background-color: ${theme.KASHMIRBLUE};
      border: 1px solid ${theme.KASHMIRBLUE};

      :hover {
        cursor: pointer;
        color: ${theme.WHITE};
        background-color: ${theme.KASHMIRBLUE};
        border: 1px solid ${theme.KASHMIRBLUE};
      }

      @media (max-width: 375px) {
        border: 1px solid ${theme.WHITE};
        color: ${theme.KASHMIRBLUE};
        background-color: ${theme.WHITE};

        :hover {
          cursor: pointer;
          color: ${theme.KASHMIRBLUE};
          background-color: ${theme.WHITE};
        }
      }
    `}
`;

const Buttons = styled.div`
  align-items: center;
  justify-content: center;
  margin: auto 15px 5px;
`;

const TPLButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5px 5px;
  margin: 10px 15px;
`;

export {Form};
