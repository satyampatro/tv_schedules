import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import ShowDetail from './components/ShowDetail/ShowDetail';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';


const Root = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/:id" exact component={ShowDetail} />
        </Switch>
      </div>
    </Router>
  )
}
ReactDOM.render(<Root />, document.getElementById('root'));
serviceWorker.unregister();
