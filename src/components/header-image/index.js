import './index.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class HeaderImage extends Component {

  static propTypes = {
    src: PropTypes.string.isRequired,
  };
  render() {
    return (
      <img
        className="img_reponsive"
        src={this.props.src}
      />
    );
  }
}