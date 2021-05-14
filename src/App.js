import React from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Header} from './components/Header.js';
import {Profile} from './components/profilePage/Profile.js';
import {Project} from './components/projectPage/Project.js';
import {Counter} from './features/counter/Counter';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/project">
            <Header />
            <Project />
          </Route>
          <Route path="/profile">
            <Header />
            <Profile />
          </Route>
          <Route path="/">
            <div className="App-redux">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Counter />
                <p>
                  Edit <code>src/App.js</code> and save to reload.
                </p>
                <span>
                  <span>Learn </span>
                  <a
                    className="App-link"
                    href="https://reactjs.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    React
                  </a>
                  <span>, </span>
                  <a
                    className="App-link"
                    href="https://redux.js.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Redux
                  </a>
                  <span>, </span>
                  <a
                    className="App-link"
                    href="https://redux-toolkit.js.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Redux Toolkit
                  </a>
                  ,<span> and </span>
                  <a
                    className="App-link"
                    href="https://react-redux.js.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    React Redux
                  </a>
                </span>
              </header>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
