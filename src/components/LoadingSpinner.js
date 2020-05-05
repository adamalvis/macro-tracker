import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ajaxLoaderGif from '../assets/imgs/ajax-loader.gif';

export default class LoadingSpinner extends Component {
  render() {
    return (
      <div>
        <img src={ajaxLoaderGif} />
      </div>
    );
  }
}
