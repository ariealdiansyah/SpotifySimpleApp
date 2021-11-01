import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { Authorization } from './features/authorization/Authorization';
import { SpotifyExample } from './features/spotifyExample/SpotifyExample';
import './App.css';
// import { IoChevronBackCircleOutline ,IoChevronForwardCircleOutline } from 'react-icons/io5'
// import { IconContext  } from 'react-icons'

function App() {
  return (
    <Router >
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route exact path='/' component={SpotifyExample} />
            {/* <SpotifyExample />
            <Authorization /> */}
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
