import React from 'react';

// router
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

// redux
import {Provider} from 'react-redux';
import store from './store';

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
import SingleNote from './pages/SingleNote';
import SingleUser from './pages/SingleUser';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/notes/:id" component={SingleNote}/>
            <Route exact path="/add-notes" component={Addnotes}/>
            <Route exact path="/registration" component={Registration}/>
            <Route exact path="/login" component={Signup}/>
            <Route exact path="/users/:id" component={SingleUser}/>
            <Route path="*" component={Error}/>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
