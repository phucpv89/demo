import './answer-iframe.scss';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class AnswerIframe extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      height: '100vh',
    };
    this._onLoadIframe = this._onLoadIframe.bind(this);
  }

  _onLoadIframe() {
    const iFrameID = document.getElementById('answer-iframe');
    if (iFrameID) {
      // here you can make the height, I delete it first, then I make it again
      const height = iFrameID.contentWindow.document.body.scrollHeight + 'px';
      this.setState({ height });
    }
  }
  render() {
    return (
      <iframe
        id="answer-iframe"
        className="answer-iframe"
        src={this.props.src}
        onLoad={this._onLoadIframe}
        height={this.state.height}
      />
    );
  }
}

AnswerIframe.propTypes = {
  src: PropTypes.string.isRequired,
};