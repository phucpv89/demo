import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PageHome from './page-home';
import PageError from './page-error';

const App = () => (
  <Switch>
    <Route exact path="/" component={PageHome} />
    <Route path="" component={PageError} />
  </Switch>
);

export default App;
