import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextBox from '../components/form/TextBox';
import { Button } from 'react-bulma-components';
import { register } from '../state/actions/user.actions';
import { isValidEmail, isValidPassword } from '../utilities/validation.utility';
import UnverifiedEmail from '../components/UnverifiedEmail';

function Register(props) {
  const { registeredSuccessfully, register } = props;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    
    if(formIsValid()) {
      register(name, email, password);
    }
  }

  function formIsValid() {
    const errors = {};

    if (!name || name.length < 2) {
      errors.name = 'Enter a valid name';
    }

    if (!email || !isValidEmail(email)) {
      errors.email = 'Enter a valid email';
    }

    if (!password || !isValidPassword(password)) {
      errors.password = 'Enter a valid password'
    }

    if (!confirmedPassword || !isValidPassword(password)) {
      errors.confirmedPassword = 'Enter a valid password';
    }

    if (confirmedPassword !== password) {
      errors.password = 'Passwords do not match';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }

  return (
    <div className="registration-page">
      {registeredSuccessfully && (
        <UnverifiedEmail title="Registration successful" />
      )}
      {!registeredSuccessfully && (
        <div>
          <h2 className="title is-2">Register</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <TextBox
              value={name}
              error={errors?.name}
              onChange={value => setName(value)}
              label="Full name"
            />
            <TextBox
              value={email}
              error={errors?.email}
              onChange={value => setEmail(value)}
              label="Email address"
            />
            <TextBox
              type="password"
              value={password}
              error={errors?.password}
              onChange={value => setPassword(value)}
              label="Password"
            />
            <p className="is-size-6">Password rules:</p>
            <ul className="is-size-7" style={{ marginBottom: '10px' }}>
              <li>Must be at least 8 characters long</li>
              <li>Can contain these symbols: $ # @ *</li>
            </ul>
            <TextBox
              type="password"
              value={confirmedPassword}
              error={errors?.confirmedPassword}
              onChange={value => setConfirmedPassword(value)}
              label="Confirm password"
            />
            <Button color="primary">
              Register
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

Register.propTypes = {
  registeredSuccessfully: PropTypes.bool,
};

Register.defaultProps = {
  registeredSuccessfully: false,
};

const mapStateToProps = state => ({
  registeredSuccessfully: state?.user?.registeredSuccessfully,
});

const mapDispatchToProps = {
  register,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
