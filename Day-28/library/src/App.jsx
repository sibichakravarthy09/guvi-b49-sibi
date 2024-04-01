import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import AddBook from './AddBook';
import AddAuthor from './AddAuthor';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route path="/add-book">
          <AddBook />
        </Route>
        <Route path="/add-author">
          <AddAuthor />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;