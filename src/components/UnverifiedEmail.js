import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bulma-components';
import { resendEmailVerification } from '../state/actions/user.actions';

class UnverifiedEmail extends Component {
  constructor(props) {
    super(props);

    this.handleResendClick = this.handleResendClick.bind(this);
  }

  handleResendClick() {
    this.props.resendEmailVerification();
  }

  render() {
    const { title, registeredEmail, emailVerificationResent } = this.props;

    return (
      <div>
        <h2 className="title is-2">{title}</h2>
        <p>Before you can use MacroTracker, please verify the email we sent you at {registeredEmail}.</p>
        {!emailVerificationResent && (
          <Button color="primary" onClick={this.handleResendClick}>Resend Verification Email</Button>
        )}
        {emailVerificationResent && (
          <p className="has-text-weight-bold">Email verification resent.</p>
        )}
      </div>
    )
  }
}

UnverifiedEmail.propTypes = {
  title: PropTypes.string,
  registeredEmail: PropTypes.string.isRequired,
};

UnverifiedEmail.defaultProps = {
  title: 'Please verify your email',
};

const mapStateToProps = state => ({
  registeredEmail: state?.user?.email,
  emailVerificationResent: state?.user?.emailVerificationResent,
});

const mapDispatchToProps = {
  resendEmailVerification,
}

export default connect(mapStateToProps, mapDispatchToProps)(UnverifiedEmail);
