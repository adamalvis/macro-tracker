import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserToken, hasVerifiedEmail } from '../state/selectors/user.selectors';
import Login from '../pages/Login';
import { getAuthToken } from '../utilities/auth.utility';
import { validateToken } from '../state/actions/user.actions';
import UnverifiedEmail from './UnverifiedEmail';

export function withUserAuthentication(WrappedComponent) {
  class Wrapper extends Component {
    componentDidMount() {
      const { token, validateToken } = this.props;

      if (!token) {
        const storedToken = getAuthToken();

        if (storedToken) {
          validateToken(storedToken);
        }
      }
    }

    render() {
      const { token, hasVerifiedEmail } = this.props;

      let RenderedComponent = WrappedComponent;

      if (!token) {
        RenderedComponent = Login;
      } else if (!hasVerifiedEmail) {
        RenderedComponent = UnverifiedEmail;
      }

      return <RenderedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    token: getUserToken(state),
    hasVerifiedEmail: hasVerifiedEmail(state),
  });

  const mapDispatchToProps = {
    validateToken,
  };

  return connect(mapStateToProps, mapDispatchToProps)(Wrapper);
}
