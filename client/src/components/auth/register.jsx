import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import "bootstrap/dist/css/bootstrap.css";
import { connect } from "react-redux";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/products");
    }
  }

  componentWillReceiveProps(nextProps) {
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
    const newUser = {
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s0">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
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
                    invalid: errors.email,
                  })}
                />
                <label htmlFor="email">UserId</label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password,
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2,
                  })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button className="btn btn-primary mt-3" type="submit" to="/">
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
// class SignUp extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       userId: "",
//       password: "",
//       confirm: "",
//       errorMsg: null,
//     };
//   }

//   onUserIdChange = (event) => {
//     this.setState({ userId: event.target.value, errorMsg: null });
//   };

//   onPasswordChange = (event) => {
//     this.setState({ password: event.target.value, errorMsg: null });
//   };

//   onConfirmChange = (event) => {
//     this.setState({ confirm: event.target.value, errorMsg: null });
//   };

//   doSignUp = async () => {
//     const { userId, password, confirm } = this.state;

//     if (confirm !== password) {
//       this.setState({ errorMsg: "Passwords do not match" });
//       return;
//     }

//     const url = "http://localhost/api/users/register";

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
//       return;
//     }

//     if (response.status === 400) {
//       this.setState({ errorMsg: "Invalid userId/password" });
//       return;
//     }

//     if (response.status !== 201) {
//       this.setState({
//         errorMsg:
//           "Error when connecting to server: status code " + response.status,
//       });
//       return;
//     }

//     this.setState({ errorMsg: null });
//     this.props.updateLoggedInUserId(userId);
//     this.props.history.push("/customers");
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

//     let confirmMsg = "Ok";
//     if (this.state.confirm !== this.state.password) {
//       confirmMsg = "Not matching";
//     }

//     return (
//       <div>
//         <div className="signupArea">
//           <h2>Registrering</h2>
//           <div>
//             <input
//               className="mt-3"
//               type="text"
//               placeholder="Username"
//               value={this.state.userId}
//               onChange={this.onUserIdChange}
//             />
//           </div>
//           <div>
//             <input
//               className="mt-3"
//               type="password"
//               placeholder="Password"
//               value={this.state.password}
//               onChange={this.onPasswordChange}
//             />
//           </div>
//           <div>
//             <input
//               className="mt-3"
//               type="password"
//               placeholder="Type password again"
//               value={this.state.confirm}
//               onChange={this.onConfirmChange}
//             />
//             <div className="mt-3">{confirmMsg}</div>
//           </div>
//           {error}
//           <Link
//             className="btn btn-primary mt-3"
//             onClick={this.doSignUp}
//             to="/login"
//           >
//             Sign up
//           </Link>
//         </div>
//       </div>
//     );
//   }
// }

// export default SignUp;
