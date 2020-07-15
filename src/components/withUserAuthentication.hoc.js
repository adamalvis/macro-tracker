import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserToken, hasVerifiedEmail } from '../state/selectors/user.selectors';
import Login from '../pages/Login';
import { getAuthToken } from '../utilities/auth.utility';
import { validateToken } from '../state/actions/user.actions';
import UnverifiedEmail from './UnverifiedEmail';

export function withUserAuthentication(WrappedComponent) {
  function Wrapper(props) {
    const { token, validateToken, hasVerifiedEmail } = props;

    useEffect(() => {
      if (!token) {
        const storedToken = getAuthToken();

        if (storedToken) {
          validateToken(storedToken);
        }
      }
    });

    let RenderedComponent = WrappedComponent;

    if (!token) {
      RenderedComponent = Login;
    } else if (!hasVerifiedEmail) {
      RenderedComponent = UnverifiedEmail;
    }

    return <RenderedComponent {...props} />;
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
