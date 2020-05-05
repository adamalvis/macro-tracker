import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TargetBlock extends Component {
  getFillStyles() {
    const { consumed, target } = this.props;
    const styles = {};
    const consumedPercentage = (consumed / target) * 100;

    styles.height = `${consumedPercentage}%`;

    return styles;
  }

  render() {
    const { consumed, target, title, unit } = this.props;
    const fillStyles = this.getFillStyles();

    return (
      <div className="target-block">
        <div className="fill" style={fillStyles}></div>
        <div className="content">
          <h6>{title}</h6>
          <p>
            {consumed}
            <span>of {`${target}${unit}`}</span>
          </p>
        </div>
      </div>
    );
  }
}

TargetBlock.propTypes = {
  consumed: PropTypes.number.isRequired,
  target: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  unit: PropTypes.string,
};

TargetBlock.defaultProps = {
  unit: '',
};

export default TargetBlock;
