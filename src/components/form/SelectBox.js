import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bulma-components';

function SelectBox(props) {
  const { options, label, error, value, onChange } = props;

  function handleChange(e) {
    const { value } = e.target;

    if (typeof onChange === 'function') {
      onChange(value);
    }
  }

  return (
    <Form.Field>
      {label && (
        <Form.Label>{label}</Form.Label>
      )}
      <Form.Control>
        <Form.Select onChange={handleChange} value={value}>
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
