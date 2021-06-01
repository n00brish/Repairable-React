import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import "./App.css";

import { Provider } from "react-redux";
import store from "./store";

import Products from "./components/products";
import Customers from "./components/customers";
import Navigation from "./components/navigation";
import SalesForm from "./components/salesForm";
import Reciepts from "./components/reciepts";
import Rented from "./components/rented";
import Login from "./components/auth/login";
import Admin from "./components/admin";
import Delivery from "./components/delivery";
import Register from "./components/auth/register";
import PrivateRoute from "./components/private-route/privateRoute";

import { BrowserRouter, Route, Switch } from "react-router-dom";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="container-fluid p-0">
            <Navigation />
            <div className="row">
              <div className="col-md-2 pt-5">
                <PrivateRoute component={SalesForm} />
              </div>
              <div className="col-md-10 pt-5 mt-5">
                <Switch>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <PrivateRoute exact path="/products" component={Products} />
                  <PrivateRoute exact path="/customers" component={Customers} />
                  <PrivateRoute exact path="/reciepts" component={Reciepts} />
                  <PrivateRoute exact path="/delivery" component={Delivery} />
                  <PrivateRoute exact path="/rented" component={Rented} />
                  <PrivateRoute exact path="/addProduct" component={Admin} />
                </Switch>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
