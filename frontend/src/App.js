import React from 'react';

// router
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

// style
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/sass/index.scss';

// components
import Header from './layout/Header';

// pages
import Home from './pages/Home';
import Error from './pages/Error';
import Registration from './pages/Registration';
import Signup from './pages/Signup';
import Addnotes from './pages/Addnotes';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/add-notes" component={Addnotes}/>
          <Route exact path="/registration" component={Registration}/>
          <Route exact path="/login" component={Signup}/>
          <Route path="*" component={Error}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
