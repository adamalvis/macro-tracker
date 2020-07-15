import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bulma-components';

function TextBox(props) {
  const { value, label, error, placeholder, type, onChange } = props;

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
        <Form.Input
          placeholder={placeholder}
          value={value}
          type={type}
          onChange={handleChange}
        />
        {error && (
          <Form.Help color="danger">{error}</Form.Help>
        )}
      </Form.Control>
    </Form.Field>
  );
}

TextBox.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
  onEnter: PropTypes.func,
  error: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

TextBox.defaultProps = {
  value: '',
  error: null,
  label: null,
  placeholder: '',
  type: 'text',
};

export default TextBox;
