import './text-input.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class ExpandTextInput extends Component {
  constructor(props) {
    super(props);
    this.emitChange = this.emitChange.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    // (fix for safari + firefox)
    if (!nextProps.value) {
      ReactDOM.findDOMNode(this._input).innerHTML = ''; // eslint-disable-line
    }
    return nextProps.value !== ReactDOM.findDOMNode(this._input).textContent; // eslint-disable-line
  }
  emitChange() {
    var html = ReactDOM.findDOMNode(this._input).textContent; // eslint-disable-line
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({ target: { value: html } });
    }
    this.lastHtml = html;
  }

  render() {
    const { className, placeholder, value, disabled, ...otherProps } = this.props;
    return (
      <div className={`text-input ${className}`}>
        <div
          ref={ref => this._input = ref}
          className="input input--auto-expand"
          onInput={this.emitChange}
          onBlur={this.emitChange}
          contentEditable={!disabled}
          dangerouslySetInnerHTML={{ __html: value }}
          {...otherProps}
          required
        />
        <span className="floating-label">{placeholder}</span>
      </div>
    );
  }
}

ExpandTextInput.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,

};
ExpandTextInput.defaultProps = {
  className: '',
  value: '',
  placeholder: 'Enter text',
  disabled: false,
};

export default ExpandTextInput;