import React from 'react';
import PropTypes from 'prop-types';

const RemoveButton = (props) => (
  <div
    className="remove-image-btn"
    onClick={props.onClick.bind(this)}
  >
    <span className="icon-pop_close" />
  </div>
);

RemoveButton.propTypes = {
  onClick: PropTypes.func,
};
RemoveButton.defaultProps = {
  onClick: () => { },
};

export default RemoveButton;