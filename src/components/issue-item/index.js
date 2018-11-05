import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class MenuItem extends PureComponent {
  render() {
    const { item } = this.props;
    return (
      <Link className="menu-item" to={`/ticket?issueId=${item.id}&issueMsg=${item.message}`}>
        <div>
          <span className="title">{item.message}</span>
          <span className="icon-general_arrowright" />
        </div>
      </Link>
    );
  }
}

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
};
