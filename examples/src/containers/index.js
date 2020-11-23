import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import routers from '../routers';

export default class Main extends React.Component {
  render() {
    return (
      <Suspense fallback="loading...">
        <Router>
          <Switch>
            <Route path="/" exact={true}>
              <Redirect to="/fetch"></Redirect>
            </Route>

            {
              routers.map(route => {
                const Cmp = route.component;
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    component={lazy(Cmp)}
                    exact={route.extact} />
                );
              })
            }
          </Switch>
        </Router>
      </Suspense>
    );
  }
}