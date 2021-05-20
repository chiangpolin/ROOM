import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Header} from './Components/Header.js';
import {Landing} from './Components/LandingPage/Landing.js';
import {Profile} from './Components/ProfilePage/Profile.js';
import {Project} from './Components/ProjectPage/Project.js';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/project/:id">
          <Project />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
