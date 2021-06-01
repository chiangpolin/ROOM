import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Auth} from './Components/AuthPage/Auth.js';
import {Profile} from './Components/ProfilePage/Profile.js';
import {Project} from './Components/ProjectPage/Project.js';
import {Header} from './Components/Header.js';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/project/:id">
          <Header></Header>
          <Project />
        </Route>
        <Route path="/profile">
          <Header></Header>
          <Profile />
        </Route>
        <Route path="/">
          <Auth />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
