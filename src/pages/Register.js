import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextBox from '../components/form/TextBox';
import { Button } from 'react-bulma-components';
import { register } from '../state/actions/user.actions';
import { isValidEmail, isValidPassword } from '../utilities/validation.utility';
import UnverifiedEmail from '../components/UnverifiedEmail';

const FIELDS = {
  NAME: 'name',
  EMAIL: 'email',
  PASSWORD: 'password',
  CONFIRMED_PASSWORD: 'confirmedPassword',
}

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      [FIELDS.NAME]: '',
      [FIELDS.EMAIL]: '',
      [FIELDS.PASSWORD]: '',
      [FIELDS.CONFIRMED_PASSWORD]: '',
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, email, password } = this.state;
    
    if(this.formIsValid()) {
      this.props.register(name, email, password);
    }
  }

  handleInputChange(value, field) {
    this.setState({ [field]: value });
  }

  formIsValid() {
    const errors = {};
    const { name, email, password, confirmedPassword } = this.state;

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

    this.setState({ errors });

    return Object.keys(errors).length === 0;
  }

  render() {
    const { errors, name, email, password, confirmedPassword } = this.state;
    const { registeredSuccessfully } = this.props;

    return (
      <div className="registration-page">
        {registeredSuccessfully && (
          <UnverifiedEmail title="Registration successful" />
        )}
        {!registeredSuccessfully && (
          <div>
            <h2 className="title is-2">Register</h2>
            <form className="login-form" onSubmit={this.handleSubmit}>
              <TextBox
                value={name}
                error={errors?.name}
                onChange={value => this.handleInputChange(value, FIELDS.NAME)}
                label="Full name"
              />
              <TextBox
                value={email}
                error={errors?.email}
                onChange={value => this.handleInputChange(value, FIELDS.EMAIL)}
                label="Email address"
              />
              <TextBox
                type="password"
                value={password}
                error={errors?.password}
                onChange={value => this.handleInputChange(value, FIELDS.PASSWORD)}
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
                onChange={value => this.handleInputChange(value, FIELDS.CONFIRMED_PASSWORD)}
                label="Confirm password"
              />
              <Button color="primary">
                Register
              </Button>
            </form>
          </div>
        )}
      </div>
    )
  }
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
