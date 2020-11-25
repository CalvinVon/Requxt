import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import routes from '../routers';

export default class Main extends React.Component {
  render() {
    return (
      <Suspense fallback="loading...">
        <Router>
          <Switch>
            <Route path="/" exact={true}>
              <h1>Menu</h1>
              <div>
                <ul>
                  {
                    routes.map(it => (
                      <li key={it.path}>
                        <Link to={it.path}>{it.path}</Link>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </Route>

            {
              routes.map(route => {
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