import React from 'react';
import styled from 'styled-components';

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 80%;
  border: 1px solid #fffffb;
  background-color: transparent;

  @media (max-width: 768px) {
    height: 100%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const InputDiv = styled.div`
  margin: 5px;
  p {
    font-size: 14px;
    color: #fffffb;
  }
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
`;

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
`;

const ApiButtonDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5px 5px;
  margin: auto 5px 5px 5px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
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

function SignInForm() {
  return (
    <Form>
      <InputDiv>
        <p>Name</p>
        <Input></Input>
      </InputDiv>
      <InputDiv>
        <p>Email</p>
        <Input></Input>
      </InputDiv>
      <InputDiv>
        <p>Password</p>
        <Input></Input>
      </InputDiv>
      <ButtonDiv>
        <Button>Sign Up</Button>
      </ButtonDiv>
      <ApiButtonDiv>
        <Button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
          </svg>
          <p>Google</p>
        </Button>
        <Button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
          </svg>
          <p>Facebook</p>
        </Button>
      </ApiButtonDiv>
    </Form>
  );
}

export {SignInForm};
