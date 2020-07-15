import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TextBox from '../components/form/TextBox';
import { connect } from 'react-redux';
import { Button } from 'react-bulma-components';
import { isValidEmail } from '../utilities/validation.utility';
import { login } from '../state/actions/user.actions';
import { hasFailedLogin } from '../state/selectors/user.selectors';

function Login(props) {
  const { hasFailedLogin, login } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  function formIsValid() {
    let errors = {};

    if (!email || !isValidEmail(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) {
      errors.password = 'Please enter your password';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (formIsValid()) {
      login(email, password);
    }
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <TextBox
          value={email}
          onChange={value => setEmail(value)}
          placeholder="Email Address"
          error={errors.email}
          label="Email Address"
        />
        <TextBox
          value={password}
          onChange={value => setPassword(value)}
          placeholder="Password"
          error={errors.password}
          label="Password"
          type="password"
        />
        <Button color="primary" onClick={handleSubmit}>Log in</Button>
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
  );
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
