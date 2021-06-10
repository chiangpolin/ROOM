import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Auth} from './Components/AuthPage/Auth.js';
import {Profile} from './Components/ProfilePage/Profile.js';
import {Project} from './Components/ProjectPage/Project.js';

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
