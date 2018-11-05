import './search-form.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HomeActions from '../../reducers/home-reducer';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: props.searchString,
    };
    this._search = this._search.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.searchString !== nextProps.searchString
      || this.state.searchString !== nextState.searchString;
  }
  _search(e) {
    this.setState({ searchString: e.target.value }, () => {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(this.props.search.bind(this, this.state.searchString), 500);
    });
  }

  render() {
    return (
      <div className="search-form">
        <input
          value={this.state.searchString}
          placeholder="Tìm kiếm nhanh vấn đề đang cần"
          onChange={this._search}
        />
        <img src={require('./_ionicons_svg_ios-search.svg')} />
      </div>
    );
  }
}

SearchForm.propTypes = {
  searchString: PropTypes.string,
  search: PropTypes.func,
};

const mapStateToProps = (state) => ({
  searchString: state.home.searchString,
});

const mapDispatchToProps = (dispatch) => ({
  search: (searchString) => dispatch(HomeActions.search(searchString)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);