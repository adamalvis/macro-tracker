import React, { Component } from 'react';
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

class AddFood extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      category: '',
      calories: 0,
      protein: 0,
      fat: 0,
      carbohydrates: 0,
      errors: {},
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(value, field) {
    this.setState({
      [field]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    
    if (this.formIsValid()) {
      this.submitForm();
    }
  }

  submitForm() {
    const {
      name,
      category,
      calories,
      protein,
      fat,
      carbohydrates,
    } = this.state;
    
    this.props.addFood({
      name,
      category,
      calories,
      protein,
      fat,
      carbohydrates,
    });

    // redirect to homepage
    this.props.history.push('/');
  }

  formIsValid() {
    const {
      name,
      category,
      calories,
      protein,
      fat,
      carbohydrates,
    } = this.state;
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

    this.setState({ errors });

    return Object.keys(errors).length === 0;
  }

  render() {
    const {
      name,
      category,
      calories,
      protein,
      fat,
      carbohydrates,
      errors,
    } = this.state;
    const categoryOptions = getCategoriesAsOptions();

    return (
      <div>
        <h2 className="is-size-2">New Food Item</h2>
        <form onSubmit={this.handleSubmit}>
          <TextBox
            value={name}
            error={errors?.name}
            onChange={value => this.handleInputChange(value, 'name')}
            label="Name"
          />
          <SelectBox
            label="Category"
            value={category}
            onChange={value => this.handleInputChange(value, 'category')}
            options={categoryOptions}
            error={errors?.category}
          />
          <TextBox
            type="number"
            value={calories}
            error={errors?.calories}
            onChange={value => this.handleInputChange(value, 'calories')}
            label="Calories"
          />
          <TextBox
            type="number"
            value={protein}
            error={errors?.protein}
            onChange={value => this.handleInputChange(value, 'protein')}
            label="Protein"
          />
          <TextBox
            type="number"
            value={fat}
            error={errors?.fat}
            onChange={value => this.handleInputChange(value, 'fat')}
            label="Fat"
          />
          <TextBox
            type="number"
            value={carbohydrates}
            error={errors?.carbohydrates}
            onChange={value => this.handleInputChange(value, 'carbohydrates')}
            label="Carbohydrates"
          />
          <Button
            color="primary"
            className="is-medium is-fullwidth"
            style={{ marginBottom: '15px', marginTop: '30px' }}
            onClick={this.handleSubmit}
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
    )
  }
}

AddFood.propTypes = {
  addFood: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  addFood,
};

export default connect(null, mapDispatchToProps)(withRouter(AddFood));
