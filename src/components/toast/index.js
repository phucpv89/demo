import './toast.scss';
import React from 'react';
import PropTypes from 'prop-types';

const TOAST_TIME = 2000;

export default class Toast extends React.PureComponent {
  componentDidMount() {
    setTimeout(() => {
      this.props.requestClose();
    }, TOAST_TIME);
  }
  render() {
    return (
      <div className="toast">
        <div className="toast__toast-content">
          <span className="icon-general_check"></span>
          <span className="toast__toast-content__toast-msg">{this.props.message}</span>
        </div>
      </div>
    );
  }
}

Toast.propTypes = {
  message: PropTypes.string,
  requestClose: PropTypes.func.isRequired,
};
Toast.defaultProps = {
  message: '',
  requestClose: () => { },
};