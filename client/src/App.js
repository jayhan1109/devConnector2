import React, { Fragment,useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import setAuthToken from "./utils/setAuthToken";
import{loadUser} from './reducers/auth';
import {store} from './index'


if(localStorage.token){
  setAuthToken(localStorage.token);
}


const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <Fragment>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <section className="container">
        <Alert />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </section>
    </Fragment>
  );
};

export default App;
