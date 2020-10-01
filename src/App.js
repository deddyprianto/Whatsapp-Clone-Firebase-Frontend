import React from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import { useStateValues } from './StateProvider';

function App() {
  const [{ user }] = useStateValues();
  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (
          <div className="app__body">
            <Router>
              <Sidebar />
              <Switch>
                <Route path="/rooms/:id"><Chat /></Route >
                <Route path="/"><Chat /></Route>
              </Switch>
            </Router>
          </div>
        )}
    </div>
  );
}

export default App;
