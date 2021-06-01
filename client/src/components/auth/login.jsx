import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/products");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/products"); // push user to products when they login
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s0">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound,
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect,
                  })}
                />
                <label htmlFor="password">Passord</label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);

// class Login extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       userId: "",
//       password: "",
//       errorMsg: null,
//     };
//   }

//   onUserIdChange = (event) => {
//     this.setState({
//       userId: event.target.value,
//     });
//   };

//   onPasswordChange = (event) => {
//     this.setState({
//       password: event.target.value,
//     });
//   };

//   doLogin = async () => {
//     const { userId, password } = this.setState;

//     const url = "http://localhost/api/users/login";

//     const payload = { userId: userId, password: password };

//     let response;

//     try {
//       response = await fetch(url, {
//         method: "post",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });
//     } catch (err) {
//       this.setState({ errorMsg: "Failed to connect to server: " + err });
//     }

//     if (response.status === 401) {
//       this.setState({ errorMsg: "invalid userId/password" });
//       return;
//     }

//     if (response.status !== 204) {
//       this.setState({
//         errorMsg:
//           "Error when connecting to server: status code " + response.status,
//       });
//       return;
//     }

//     this.setState({ errorMsg: null });
//     this.props.updateLoggedInUserId(userId);
//     this.props.history.push("/");
//   };

//   render() {
//     let error = <div />;
//     if (this.state.errorMsg) {
//       error = (
//         <div className="errorMsg">
//           <p>{this.state.errorMsg}</p>
//         </div>
//       );
//     }
//     return (
//       <div>
//         <div className="loginArea">
//           <h2>Innlogging</h2>
//           <form>
//             <input
//               id="userId"
//               type="text"
//               name="userId"
//               placeholder="Username"
//               value={this.state.userId}
//               onChange={this.onUserIdChange}
//             />

//             <input
//               className="mt-3"
//               id="password"
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={this.state.password}
//               onChange={this.onPasswordChange}
//             />
//             <div>
//               {error}

//               <div
//                 className="btn btn-primary btn-sm mt-2"
//                 onClick={this.doLogin}
//               >
//                 Logg Inn
//               </div>
//             </div>
//             <Link className="btn btn-primary btn-sm mt-2" to="/signUp">
//               Register
//             </Link>
//           </form>
//         </div>
//       </div>
//     );
//   }
// }

// export default Login;
