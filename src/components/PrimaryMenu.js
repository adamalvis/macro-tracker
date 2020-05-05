import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'react-bulma-components';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { getMenuIsOpen } from '../state/selectors/navigation.selectors';

class PrimaryMenu extends Component {
  render() {
    const { isOpen } = this.props;

    return (
      <Menu className={classNames('primary-menu', { open: isOpen })}>
        <Menu.List>
          <Menu.List.Item><i className="fa fa-calendar" aria-hidden="true"></i> Last 7 days</Menu.List.Item>
          <Menu.List.Item><i className="fa fa-bullseye" aria-hidden="true"></i> Targets</Menu.List.Item>
          <Menu.List.Item><i className="fa fa-cog" aria-hidden="true"></i> Settings</Menu.List.Item>
        </Menu.List>
      </Menu>
    );
  }
}

PrimaryMenu.propTypes = {
  isOpen: PropTypes.bool,
};

PrimaryMenu.defaultProps = {
  isOpen: false,
};

const mapStateToProps = state => ({
  isOpen: getMenuIsOpen(state),
});

export default connect(mapStateToProps)(PrimaryMenu);
