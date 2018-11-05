import './full-width-button.scss';
import React from 'react';
import PropTypes from 'prop-types';

const FullWidthButton = (props) => {
  const btnClass = props.disabled ? 'full-width-btn full-width-btn--disabled' : 'full-width-btn';
  return (
    <button disabled={props.disabled} className={btnClass} onClick={props.onClick}>
      <span>{props.text}</span>
    </button>
  );
};

FullWidthButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
FullWidthButton.defaultProps = {
  text: '',
  onClick: () => { },
  disabled: false,
};

export default FullWidthButton;