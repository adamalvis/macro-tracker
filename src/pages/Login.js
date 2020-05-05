import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TextBox from '../components/form/TextBox';
import { connect } from 'react-redux';
import { Button } from 'react-bulma-components';
import { isValidEmail } from '../utilities/validation.utility';
import { login } from '../state/actions/user.actions';
import { hasFailedLogin } from '../state/selectors/user.selectors';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {},
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePasswordChange(password) {
    this.setState({ password });
  }

  handleEmailChange(email) {
    this.setState({ email });
  }
  
  formIsValid() {
    const { email, password } = this.state;

    let errors = {};

    if (!email || !isValidEmail(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) {
      errors.password = 'Please enter your password';
    }

    this.setState({ errors });

    return Object.keys(errors).length === 0;
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const { login } = this.props;

    if (this.formIsValid()) {
      login(email, password);
    }
  }

  render() {
    const { email, password, errors } = this.state;
    const { hasFailedLogin } = this.props;

    return (
      <div className="login-page">
        <form className="login-form" onSubmit={this.handleSubmit}>
          <TextBox
            value={email}
            onChange={this.handleEmailChange}
            placeholder="Email Address"
            error={errors.email}
            label="Email Address"
          />
          <TextBox
            value={password}
            onChange={this.handlePasswordChange}
            placeholder="Password"
            error={errors.password}
            label="Password"
            type="password"
          />
          <Button color="primary" onClick={this.handleSubmit}>Log in</Button>
          {hasFailedLogin && (
            <p
              className="has-text-danger"
              style={{ marginTop: '10px' }}
            >
              Username and password combination is incorrect
            </p>
          )}
          <p style={{ marginTop: '10px' }}>Don't have an account? <Link to="/register">Register now</Link></p>
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  hasFailedLogin: PropTypes.bool.isRequired,
};

Login.defaultProps = {
  hasFailedLogin: false,
};

const mapStateToProps = state => ({
  hasFailedLogin: hasFailedLogin(state),
});

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
