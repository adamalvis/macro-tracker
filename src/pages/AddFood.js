import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TextBox from '../components/form/TextBox';
import SelectBox from '../components/form/SelectBox';
import { getCategoriesAsOptions } from '../utilities/food.utility';
import { Button } from 'react-bulma-components';
import { Link } from 'react-router-dom';
import { PAGES, PAGE_NAMES } from '../constants/navigation';
import { isValidMacro } from '../constants/food';
import { addFood } from '../state/actions/food.actions';

function AddFood(props) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);
  const [carbohydrates, setCarbohydrates] = useState(0);
  const [errors, setErrors] = useState({});

  const categoryOptions = getCategoriesAsOptions();

  function handleSubmit(e) {
    e.preventDefault();
    
    if (formIsValid()) {
      submitForm();
    }
  }

  function submitForm() {
    props.addFood({
      name,
      category,
      calories,
      protein,
      fat,
      carbohydrates,
    });

    // redirect to homepage
    props.history.push('/');
  }

  function formIsValid() {
    const errors = {};

    if (!name || typeof name !== 'string' || name.length < 3) {
      errors.name = 'Please enter a name of at least 3 characters';
    }

    if (!category) {
      errors.category = 'Please select a category';
    }

    if (!isValidMacro(calories)) {
      errors.calories = 'Please enter a valid number';
    }

    if (!isValidMacro(protein)) {
      errors.protein = 'Please enter a valid number';
    }

    if (!isValidMacro(carbohydrates)) {
      errors.carbohydrates = 'Please enter a valid number';
    }

    if (!isValidMacro(fat)) {
      errors.fat = 'Please enter a valid number';
    }

    if (!isValidMacro(carbohydrates)) {
      errors.carbohydrates = 'Please enter a valid number';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }

  return (
    <div>
      <h2 className="is-size-2">New Food Item</h2>
      <form onSubmit={handleSubmit}>
        <TextBox
          value={name}
          error={errors?.name}
          onChange={value => setName(value)}
          label="Name"
        />
        <SelectBox
          label="Category"
          value={category}
          onChange={value => setCategory(value)}
          options={categoryOptions}
          error={errors?.category}
        />
        <TextBox
          type="number"
          value={calories}
          error={errors?.calories}
          onChange={value => setCalories(value)}
          label="Calories"
        />
        <TextBox
          type="number"
          value={protein}
          error={errors?.protein}
          onChange={value => setProtein(value)}
          label="Protein"
        />
        <TextBox
          type="number"
          value={fat}
          error={errors?.fat}
          onChange={value => setFat(value)}
          label="Fat"
        />
        <TextBox
          type="number"
          value={carbohydrates}
          error={errors?.carbohydrates}
          onChange={value => setCarbohydrates(value)}
          label="Carbohydrates"
        />
        <Button
          color="primary"
          className="is-medium is-fullwidth"
          style={{ marginBottom: '15px', marginTop: '30px' }}
          onClick={handleSubmit}
        >
          Add Food
        </Button>
        <Link
          color="light"
          className="button is-medium is-fullwidth"
          to={PAGES[PAGE_NAMES.HOME].path}
        >
          Cancel
        </Link>
      </form>
    </div>
  );
}

AddFood.propTypes = {
  addFood: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  addFood,
};

export default connect(null, mapDispatchToProps)(withRouter(AddFood));
