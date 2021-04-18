import React from 'react';
import './assetss/css/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Lista from './components/Lista';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/" exact render={props => (<Login {...props} />)}></Route>
          <Route path="/lista" exact render={props => (<Lista {...props} />)}></Route>
        </Switch>
      </Router>
      
    </React.Fragment>
  );
}

export default App;
