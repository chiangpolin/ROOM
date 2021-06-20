import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Auth} from './containers/AuthPage/Auth.js';
import {Profile} from './containers/ProfilePage/Profile.js';
import {Project} from './containers/ProjectPage/Project.js';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/project/:id">
          <Project />
        </Route>
        <Route path="/profile">
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
