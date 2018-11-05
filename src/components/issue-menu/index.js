import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import IssueItem from '../issue-item';

export default class Menu extends PureComponent {
  render() {
    const { items, className } = this.props;
    const clsName = className ? `menu ${className}` : 'menu';
    return (
      <div className={clsName}>
        {items.map((item, index) =>
          <IssueItem
            key={index}
            item={item}
          />
        )}
      </div>
    );
  }
}

Menu.propTypes = {
  items: PropTypes.array,
  className: PropTypes.string,
};

Menu.defaultProps = {
  items: [],
};