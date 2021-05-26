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
import {checkValidation} from '../../app/utils/validate.js';
import {ReactComponent as GoogleIcon} from '../../static/images/icons/google.svg';
import {ReactComponent as FacebookIcon} from '../../static/images/icons/facebook.svg';

function Form(props) {
  let history = useHistory();
  const [name, setName] = useState('');
  const [nameIsValid, setNameValidation] = useState(true);
  const [email, setEmail] = useState('test1@gmail.com');
  const [emailIsValid, setEmailValidation] = useState(true);
  const [password, setPassword] = useState('');
  const [passwordIsValid, setPasswordValidation] = useState(true);
  const dispatch = useDispatch();

  switch (props.type) {
    case 'sign-in':
      return (
        <Div>
          <InputDiv>
            Email
            <Input
              type="text"
              value={email}
              onChange={(event) => handleChange(event, setEmail)}
            ></Input>
          </InputDiv>
          <InputDiv>
            Password
            <Input
              type="text"
              value={password}
              onChange={(event) => handleChange(event, setPassword)}
            ></Input>
            <p
              style={{cursor: 'pointer'}}
              onClick={() => handleClickForgetPassword(dispatch, email)}
            >
              Forget Password?
            </p>
          </InputDiv>
          <Buttons>
            <Button
              onClick={() =>
                handleClickSignIn(dispatch, history, email, password)
              }
            >
              Sign In
            </Button>
          </Buttons>
          <TPLButtons>
            <Button onClick={() => handleClickGoogleSignIn(dispatch, history)}>
              <GoogleIcon width="16" height="16" />
              <p>Google</p>
            </Button>
            <Button
              onClick={() => handleClickFacebookSignIn(dispatch, history)}
            >
              <FacebookIcon width="24" hieght="24" />
              <p>Facebook</p>
            </Button>
          </TPLButtons>
        </Div>
      );
    case 'sign-up':
      return (
        <Div>
          <InputDiv>
            Name
            <Input
              type="text"
              value={name}
              invalid={!nameIsValid}
              onChange={(event) => handleChange(event, setName)}
            ></Input>
          </InputDiv>
          <InputDiv>
            Email
            <Input
              type="text"
              value={email}
              invalid={!emailIsValid}
              onChange={(event) => handleChange(event, setEmail)}
            ></Input>
          </InputDiv>
          <InputDiv>
            Password
            <Input
              type="text"
              value={password}
              invalid={!passwordIsValid}
              onChange={(event) => handleChange(event, setPassword)}
            ></Input>
          </InputDiv>
          <Buttons>
            <Button
              onClick={() =>
                handleClickSignUp(
                  dispatch,
                  history,
                  name,
                  email,
                  password,
                  setNameValidation,
                  setEmailValidation,
                  setPasswordValidation
                )
              }
            >
              Sign Up
            </Button>
          </Buttons>
          <TPLButtons>
            <Button onClick={() => handleClickGoogleSignIn(dispatch, history)}>
              <GoogleIcon width="16" height="16" />
              <p>Google</p>
            </Button>
            <Button
              onClick={() => handleClickFacebookSignIn(dispatch, history)}
            >
              <FacebookIcon width="24" hieght="24" />
              <p>Facebook</p>
            </Button>
          </TPLButtons>
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
  if (credential.user.emailVerified) {
    history.push('/profile');
  } else {
    alert('Email not verify');
  }
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
  width: 300px;
  height: 80%;
  border-left: 1px solid #fffffb;
  border-right: 1px solid #fffffb;
  border-bottom: 1px solid #fffffb;
  background-color: transparent;

  @media (max-width: 768px) {
    height: 100%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const InputDiv = styled.div`
  margin: 10px 10px 5px;
  font-size: 16px;
  color: #fffffb;
`;

const Input = styled.input`
  padding: 0 10px;
  width: 100%;
  height: 30px;
  border: 1px solid #fffffb;
  border-radius: 5px;
  color: #fffffb;
  background-color: transparent;

  :focus {
    outline: none !important;
  }

  ${(props) =>
    props.invalid &&
    css`
      background-color: #336774;
    `}
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 0 0 10px;
  width: 100%;
  height: 30px;
  border: 1px solid #fffffb;
  border-radius: 5px;
  font-size: 16px;
  color: #fffffb;
  background-color: transparent;

  :hover {
    cursor: pointer;
    color: #81c7d4;
    background-color: #fffffb;
  }
`;

const Buttons = styled.div`
  align-items: center;
  justify-content: center;
  margin: 10px;
`;

const TPLButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5px 5px;
  margin: auto 10px 10px 10px;
`;

export {Form};
