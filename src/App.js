import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Section, Container } from 'react-bulma-components';
import thunk from 'redux-thunk';
import PrimaryMenu from './components/PrimaryMenu';
import PrimaryNav from './components/PrimaryNav';
import rootReducer from './state/reducers';
import { PAGES } from './constants/navigation';
import Notifications from './components/Notifications';

import 'react-bulma-components/dist/react-bulma-components.min.css';

const store = createStore(rootReducer, applyMiddleware(thunk));

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Provider store={store}>
          <BrowserRouter>
            <PrimaryNav />
            <PrimaryMenu />
            <div className="page-container">
              <Section>
                <Container>
                  <Switch>
                    {Object.values(PAGES).map((page, index) => (
                      <Route exact path={page.path} key={`page-${index}`}>
                        <page.component />
                      </Route>
                    ))}
                  </Switch>
                </Container>
              </Section>
              <Notifications />
            </div>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
