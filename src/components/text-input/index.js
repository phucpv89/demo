import React from 'react';
import PropTypes from 'prop-types';
import DefaultTextInput from './default-text-input';
import ExpandTextInput from './expand-text-input';

const TextInput = (props) => {
  const { autoExpand, ...otherProps } = props;
  return autoExpand
    ? <ExpandTextInput {...otherProps} />
    : <DefaultTextInput {...otherProps} />
};

TextInput.propTypes = {
  autoExpand: PropTypes.bool,
};
TextInput.defaultProps = {
  autoExpand: false,
};

export default TextInput;