import React from 'react';
import ajaxLoaderGif from '../assets/imgs/ajax-loader.gif';

export default function LoadingSpinner() {
  return (
    <div>
      <img alt="Loading" src={ajaxLoaderGif} />
    </div>
  );
}
