import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

class FileInput extends PureComponent {
  constructor(props) {
    super(props);
    this.handleFiles = this.handleFiles.bind(this);
  }

  handleFiles = (e) => {
    const files = []
    if (!e.target.files.length) {
      return;
    }
    Array.from(e.target.files).forEach(file => {
      files.push(file);
    })
    this.props.onChooseFiles(files);
    ReactDOM.findDOMNode(this._input).value = '' // eslint-disable-line
  }

  render() {
    return (
      <div className="image-cell file-input">
        <input
          multiple
          ref={input => this._input = input }
          type="file"
          accept="image/*"
          onChange={this.handleFiles}
        />
        <span className="icon-profile_camera" />
      </div>
    );
  }
}

FileInput.propTypes = {
  onChooseFiles: PropTypes.func,
};
FileInput.defaultProps = {
  onChooseFiles: () => { },
};

export default FileInput;