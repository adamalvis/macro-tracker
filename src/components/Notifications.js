import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Notification, Button } from 'react-bulma-components';
import { removeNotification } from '../state/actions/notifications.actions';

function Notifications(props) {
  const { msgs } = props;

  return (
    <div className="notification-pane">
      {msgs.length > 0 && msgs.map(msg => (
        <Notification color={msg.color}>
          {msg.text}
          <Button remove onClick={() => props.removeNotification(msg.id)} />
        </Notification>
      ))}
    </div>
  );
}

Notifications.propTypes = {
  msgs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    color: PropTypes.string,
  })),
};

Notifications.defaultProps = {
  msgs: [],
};

const mapStateToProps = state => ({
  msgs: state?.notifications?.msgs,
});

const mapDispatchToProps = {
  removeNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
