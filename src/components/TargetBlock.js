import React from 'react';
import PropTypes from 'prop-types';

function TargetBlock(props) {
  const { consumed, target, title, unit } = props;
  const consumedPercentage = (consumed / target) * 100;
  const fillStyles = {
    height: `${consumedPercentage}%`,
  };

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
