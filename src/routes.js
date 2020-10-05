import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import App from './App';
import Employees from './Employees';
import Skills from './Skills';
import Header from './Header';

const Routes = () => {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/employees" component={Employees} />
          <Route path="/skills" component={Skills} />
        </Switch>
      </div>
    </Router>
  );
}

export default Routes;
