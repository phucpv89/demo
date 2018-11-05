import './image-picker.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageCell from './image-cell';
import FileInput from './file-input';

class ImagePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [...props.images],
    };

    this.onChooseFiles = this.onChooseFiles.bind(this);
    this.getImages = this.getImages.bind(this);
  }

  onChooseFiles(files) {
    if (files.length + this.state.images.length > this.props.numOfImage) {
      alert('Số ảnh tối đa cho phép là ' + this.props.numOfImage);
    } else {
      this.setState({ images: this.state.images.concat(files.map(file => ({ file }))) });
    }
  }

  getImages() {
    return this.state.images.filter(image => !!image.id).map(image => image.id);
  }

  render() {
    const { numOfImage, uploadImage, deleteImage, loadImage } = this.props;
    const { images } = this.state;
    return (
      <div className="image-picker">
        <span className="image-picker__title">{`Đính kèm màn hình (${images.length}/${numOfImage})`}</span>
        <div className="image-picker__images-container">
          {images.map((image, index) => (
            <ImageCell
              key={index}
              image={image}
              uploadImage={uploadImage}
              deleteImage={deleteImage}
              loadImage={loadImage}
              onUploaded={(id) => {
                image.id = id;
                // this.setState({ images: [...this.state.images] });
              }}
              onDeletedImage={() => {
                images.splice(index, 1);
                this.setState({ images: [...this.state.images] })
              }}
            />
          ))}
          {numOfImage > images.length && <FileInput onChooseFiles={this.onChooseFiles} />}
        </div>
      </div>
    );
  }
}

ImagePicker.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    file: PropTypes.file,
  })),
  numOfImage: PropTypes.number,
  uploadImage: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired,
  loadImage: PropTypes.func.isRequired,

};
ImagePicker.defaultProps = {
  images: [],
  numOfImage: 4,
};

export default ImagePicker;