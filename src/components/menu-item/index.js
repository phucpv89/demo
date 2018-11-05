import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Utils from '../../utils/commons';
import { ITEM_VALUE_TYPE } from '../../utils/constants';

export default class MenuItem extends PureComponent {
  render() {
    const { item, query } = this.props;
    const route = Utils.getNewRoute(item)
    const newRoute = route.itemValueType === ITEM_VALUE_TYPE.ROUTE ? route.value : `?query=${query}`;
    return (
      <Link className="menu-item" to={newRoute}>
        <div>
          <span className="title">{route.key}</span>
          <span className="icon-general_arrowright" />
        </div>
      </Link>
    );
  }
}

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  query: PropTypes.string,
};
