import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Header} from './components/Header.js';
import {Landing} from './components/landingPage/Landing.js';
import {Profile} from './components/profilePage/Profile.js';
import {Project} from './components/projectPage/Project.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/project">
            <Project />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
