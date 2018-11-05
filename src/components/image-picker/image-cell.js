import './image-picker.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RemoveButton from './remove-button';

const URL = window.URL || window.webkitURL;
const EXPECT_MAX_IMG_W = 640;
const EXPECT_MAX_IMG_H = 640;

export function getName(name) {
  return `${name}_${Date.now()}.jpg`
}

class ImageCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resizedBlob: null,
      isProccessing: false,
      error: null,
      isShowFullScreen: false,
    };

    this.toggleFullScreen = this.toggleFullScreen.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.resizeImage = this.resizeImage.bind(this);
    this.loadImage = this.loadImage.bind(this);
  }

  componentDidMount() {
    if (this.props.image.id) {
      this.loadImage(this.props.image.id);
    } else if (this.props.image.file) {
      this.resizeImage(this.props.image.file);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const currentProps = this.props;
    const currentState = this.state;
    return nextProps.image !== currentProps.image
      || nextProps.image.id !== currentProps.image.id
      || nextProps.image.file !== currentProps.image.file
      || nextState.resizedBlob !== currentState.resizedBlob
      || nextState.isProccessing !== currentState.isProccessing
      || nextState.error !== currentState.error;
  }

  toggleFullScreen() {
    this.setState({ isShowwFullScreen: !this.state.isShowFullScreen });
  }

  deleteImage(e) {
    e.stopPropagation();
    this.props.image.id && this.props.deleteImage(this.props.image.id);
    this.props.onDeletedImage(this.props.image.id);
  }

  loadImage(id) {
    this.props.loadImage(id).then(data => {
      this.setState({ resizedBlob: data });
    }).catch(error => {
      this.setState({ error });
    })
  }

  resizeImage(file) {
    const self = this;
    self.setState({ isProccessing: true });
    const imageObj = new Image();
    const resultCanvas = document.createElement('canvas');
    imageObj.onload = function () {
      
      const ratio = this.width / this.height;
      const maxRatio = EXPECT_MAX_IMG_W / EXPECT_MAX_IMG_H;

      if (this.width <= EXPECT_MAX_IMG_W && this.height <= EXPECT_MAX_IMG_H) {
        resultCanvas.width = this.width;
        resultCanvas.height = this.height;
      } else if (ratio >= maxRatio) {
        // base on EXPECT_MAX_IMG_W
        resultCanvas.width = EXPECT_MAX_IMG_W;
        resultCanvas.height = resultCanvas.width / ratio;
      } else {
        // base on EXPECT_MAX_IMG_H
        resultCanvas.height = EXPECT_MAX_IMG_H;
        resultCanvas.width = resultCanvas.height * ratio;
      }

      // place image on resultCanvas with full resultcanvas size
      resultCanvas.getContext('2d')
        .drawImage(this, 0, 0, resultCanvas.width, resultCanvas.height);

      resultCanvas.toBlob((blob) => {
        self.setState({ resizedBlob: blob });
        self.props.uploadImage(blob, getName(file.name)).then(image => {
          self.setState({ isProccessing: false }, () => {
            self.props.onUploaded(image.id);
          });
        }).catch(error => {
          self.setState({ isProccessing: false, error });
        });
      }, 'image/jpeg');
    }
    imageObj.src = URL.createObjectURL(file);
  }

  render() {
    const { isProccessing, error, resizedBlob } = this.state;
    const originURL = resizedBlob ? URL.createObjectURL(resizedBlob) : null
    return (
      <div className="image-cell">
        <div onClick={this.toggleFullScreen}>
          <img alt="" src={originURL} />
          <RemoveButton onClick={this.deleteImage} />
        </div>
        {(isProccessing || error) && <div className="image-cell__overlay" />}
        {isProccessing && <div className="image-cell__loader" />}
        {error && <span className="image-cell__error">Lỗi</span>}
      </div>
    );
  }
}

ImageCell.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number, // id from server
    file: PropTypes.file, // raw file
  }).isRequired,
  uploadImage: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired,
  loadImage: PropTypes.func.isRequired,
  onUploaded: PropTypes.func.isRequired,
  onDeletedImage: PropTypes.func.isRequired,
};

export default ImageCell;