import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Notification, Button } from 'react-bulma-components';
import { removeNotification } from '../state/actions/notifications.actions';

class Notifications extends Component {
  handleRemoveClick(id) {
    this.props.removeNotification(id);
  }

  render() {
    const { msgs } = this.props;

    return (
      <div className="notification-pane">
        {msgs.length > 0 && msgs.map(msg => (
          <Notification color={msg.color}>
            {msg.text}
            <Button remove onClick={() => this.handleRemoveClick(msg.id)} />
          </Notification>
        ))}
      </div>
    )
  }
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
