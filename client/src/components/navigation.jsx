import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import Logo from "../repairable.png";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class Navigation extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <Nav className="py-0 justify-content-center fixed-top">
        <img src={Logo} alt="Repairable Logo" id="repLogo" />
        <h1 id="repHeader">Repairable</h1>
        <NavLink
          className="mt-3  mr-2 d-inline-block p-4 "
          to="/customers"
          style={{
            color: "#ffffff",
          }}
          activeStyle={{
            background: "#EBE1E1",
            color: "#34343B",
            borderTopLeftRadius: "45%",
            borderTopRightRadius: "45%",
          }}
        >
          Kunder
        </NavLink>
        <NavLink
          className="mt-3 mr-2 d-inline-block p-4"
          to="/products"
          style={{ color: "#ffffff" }}
          activeStyle={{
            background: "#EBE1E1",
            color: "#34343B",
            borderTopLeftRadius: "45%",
            borderTopRightRadius: "45%",
          }}
        >
          Produkter
        </NavLink>
        <NavLink
          className="mt-3 mr-2 d-inline-block p-4"
          to="/rented"
          style={{ color: "#ffffff" }}
          activeStyle={{
            background: "#EBE1E1",
            color: "#34343B",
            borderTopLeftRadius: "45%",
            borderTopRightRadius: "45%",
          }}
        >
          Utleide Produkter
        </NavLink>
        <NavLink
          className="mt-3 mr-2 d-inline-block p-4"
          to="/delivery"
          style={{ color: "#ffffff" }}
          activeStyle={{
            background: "#EBE1E1",
            color: "#34343B",
            borderTopLeftRadius: "45%",
            borderTopRightRadius: "45%",
          }}
        >
          Innlevering
        </NavLink>
        <NavLink
          className="mt-3 mr-2 d-inline-block p-4"
          to="/reciepts"
          style={{ color: "#ffffff" }}
          activeStyle={{
            background: "#EBE1E1",
            color: "#34343B",
            borderTopLeftRadius: "45%",
            borderTopRightRadius: "45%",
          }}
        >
          Kvitteringer
        </NavLink>
        <NavLink
          className=".display-2 mt-3 mr-2 d-inline-block p-4"
          to="/addProduct"
          style={{ color: "#ffffff" }}
          activeStyle={{
            background: "#EBE1E1",
            color: "#34343B",
            borderTopLeftRadius: "45%",
            borderTopRightRadius: "45%",
          }}
        >
          Admin
        </NavLink>
        <button
          style={{
            left: "400px",
            width: "150px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            marginTop: "1rem",
            color: "#ffffff",
          }}
          onClick={this.onLogoutClick}
          className="btn btn-large waves-effect waves-light hoverable accent-3"
        >
          Logout
        </button>
      </Nav>
    );
  }
}

Navigation.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navigation);
