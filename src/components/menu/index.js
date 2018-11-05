import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '../menu-item';

export default class Menu extends PureComponent {
  render() {
    const { items, query, className } = this.props;
    const clsName = className ? `menu ${className}` : 'menu';
    return (
      <div className={clsName}>
        {items.map((item, index) =>
          <MenuItem
            key={index}
            query={query ? `${query}-${index}` : `${index}`}
            item={item}
          />
        )}
      </div>
    );
  }
}

Menu.propTypes = {
  items: PropTypes.array,
  query: PropTypes.string,
  className: PropTypes.string,
};

Menu.defaultProps = {
  items: [],
};