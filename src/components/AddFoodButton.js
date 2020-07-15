import React from 'react';
import { Link } from 'react-router-dom';

export default function AddFoodButton() {
  return (
    <div className="add-food-button">
      <Link to="/add-food" className="button is-primary">
        <i className="fa fa-plus" aria-hidden="true"></i> Food Item
      </Link>
    </div>
  );
}
