import './text-input.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DefaultTextInput extends Component {
  render() {
    const { className, placeholder, ...otherProps } = this.props;
    return (
      <div className={`text-input ${className}`}>
        <input
          className="input"
          required
          {...otherProps}
        />
        <span className="floating-label">{placeholder}</span>
      </div>
    );
  }
}

DefaultTextInput.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
};
DefaultTextInput.defaultProps = {
  className: '',
  placeholder: 'Enter text',
};

export default DefaultTextInput;