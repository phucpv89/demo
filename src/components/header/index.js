import './header.scss';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Header extends PureComponent {
  render() {
    const className = `header ${this.props.className}`;

    return (
      <div className={className}>
        <span className="header-text">{this.props.title}</span>
      </div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};
Header.defaultProps = {
  title: '',
  className: '',
};

export default Header;