import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import styled, {css} from 'styled-components';
import {
  signUp,
  signIn,
  googleSignIn,
  facebookSignIn,
  forgetPassword,
} from '../../actions/index.js';
import * as theme from '../../constants/theme.js';
import {checkValidation} from '../../utils/validate.js';
import {ReactComponent as GoogleIcon} from '../../assets/images/brands/google.svg';
import {ReactComponent as FacebookIcon} from '../../assets/images/brands/facebook.svg';
import {ReactComponent as PersonIcon} from '../../assets/images/icons/person.svg';
import {ReactComponent as EnvelopeIcon} from '../../assets/images/icons/envelope.svg';
import {ReactComponent as LockIcon} from '../../assets/images/icons/lock.svg';

function Form(props) {
  const [name, setName] = useState('');
  const [nameIsValid, setNameValidation] = useState(true);
  const [signInEmail, setSignInEmail] = useState('user@gmail.com');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [emailIsValid, setEmailValidation] = useState(true);
  const [signInPassword, setSignInPassword] = useState('batch13');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [passwordIsValid, setPasswordValidation] = useState(true);
  const history = useHistory();
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
              aria-label="sign-in-email"
              value={signInEmail}
              onChange={(event) => handleChange(event, setSignInEmail)}
            ></Input>
            <div>
              <EnvelopeIcon></EnvelopeIcon>
            </div>
          </InputDiv>
          <InputDiv>
            <Input
              type="password"
              aria-label="sign-in-password"
              value={signInPassword}
              onChange={(event) => handleChange(event, setSignInPassword)}
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
              onClick={() => handleClickForgetPassword(dispatch, signInEmail)}
            >
              Forget Password?
            </p>
          </InputDiv>
          <Buttons>
            <Button
              primary
              onClick={() =>
                handleClickSignIn(
                  dispatch,
                  history,
                  signInEmail,
                  signInPassword
                )
              }
            >
              Sign In
            </Button>
            <hr></hr>
            <Button
              onClick={() => {
                props.setType('sign-up');
              }}
            >
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
              aria-label="sign-up-name"
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
              aria-label="sign-up-email"
              placeholder="Email"
              value={signUpEmail}
              invalid={!emailIsValid}
              onChange={(event) => handleChange(event, setSignUpEmail)}
            ></Input>
            <div>
              <EnvelopeIcon></EnvelopeIcon>
            </div>
          </InputDiv>
          <InputDiv>
            <Input
              type="password"
              aria-label="sign-up-password"
              placeholder="Password"
              value={signUpPassword}
              invalid={!passwordIsValid}
              onChange={(event) => handleChange(event, setSignUpPassword)}
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
                  signUpEmail,
                  signUpPassword,
                  setNameValidation,
                  setEmailValidation,
                  setPasswordValidation
                )
              }
            >
              Sign Up
            </Button>
            <hr></hr>
            <Button
              onClick={() => {
                props.setType('sign-in');
              }}
            >
              Use an Existing Account
            </Button>
          </Buttons>
        </Div>
      );
    default:
      return null;
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

  if (!check.nameIsValid) {
    return;
  }

  if (!check.emailIsValid) {
    return;
  }

  if (!check.passwordIsValid) {
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
  width: 100%;
  height: 450px;
  border: 1px solid ${theme.WHITE};
  border-radius: 10px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  background-color: ${theme.WHITE};

  h1 {
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
    font-size: 36px;
    margin: 10px 20px 5px;
    color: ${theme.KASHMIRBLUE};
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

  hr {
    border: 1px solid ${theme.IRON};
  }

  p {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 16px;
    margin: 0 5px 0;
  }

  @media (max-width: 1023px) {
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
      color: ${theme.KASHMIRBLUE};
    }

    h3 {
      color: ${theme.KASHMIRBLUE};
    }

    hr {
      border: 1px solid ${theme.KASHMIRBLUE};
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
    color: ${theme.KASHMIRBLUE};
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
    border: 1px solid ${theme.KASHMIRBLUE};
    color: ${theme.KASHMIRBLUE};

    ::placeholder {
      color: ${theme.KASHMIRBLUE};
    }
  }

  ${(props) =>
    props.invalid &&
    css`
      background-color: ${theme.SAKURA};
      border: 1px solid ${theme.IMAYOH};
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

const Buttons = styled.div`
  margin: auto 15px 0;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0 30px;
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
    color: ${theme.KASHMIRBLUE};
    border: 1px solid ${theme.KASHMIRBLUE};

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
        border: 1px solid ${theme.KASHMIRBLUE};
        color: ${theme.ATHENSGRAY};
        background-color: ${theme.KASHMIRBLUE};

        :hover {
          cursor: pointer;
          color: ${theme.WHITE};
          background-color: ${theme.KASHMIRBLUE};
        }
      }
    `}
`;

const TPLButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5px 5px;
  margin: 10px 15px;
`;

export {Form};
