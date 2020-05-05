import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bulma-components';

class SelectBox extends Component {
  constructor(props) {
    super(props);
    
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { onChange } = this.props;
    const { value } = e.target;

    if (typeof onChange === 'function') {
      onChange(value);
    }
  }

  render() {
    const { options, label, error, value } = this.props;

    return (
      <Form.Field>
        {label && (
          <Form.Label>{label}</Form.Label>
        )}
        <Form.Control>
          <Form.Select onChange={this.handleChange} value={value}>
            <option></option>
            {Array.isArray(options) && options.map(option => (
              <option key={`option-${option.value}`} value={option.value}>{option.label}</option>
            ))}
          </Form.Select>
          {error && (
            <Form.Help color="danger">{error}</Form.Help>
          )}
        </Form.Control>
      </Form.Field>
    );
  }
}

const valuePropTypes = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);

SelectBox.propTypes = {
  value: valuePropTypes,
  label: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: valuePropTypes,
  })),
}

export default SelectBox;
