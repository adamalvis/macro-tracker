import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, List, Button } from 'react-bulma-components';
import { CATEGORY_LABELS } from '../constants/food';
import { getCategorizedFood } from '../utilities/food.utility';
import { removeFood } from '../state/actions/food.actions';

class FoodCategories extends Component {
  handleDeleteItem(id) {
    this.props.removeFood(id);
  }

  render() {
    const { food } = this.props;
    const categorizedFood = getCategorizedFood(food);

    return (
      <div className="food-categories">
        {Object.entries(categorizedFood).map(([id, items], index) => (
          <Card style={{ marginTop: '15px' }} key={`category${index}`}>
            <Card.Header className="has-background-info">
              <Card.Header.Title className="has-text-white">{CATEGORY_LABELS[id]}</Card.Header.Title>
            </Card.Header>
            <Card.Content>
              {items.length && (
                <List>
                  {items.map((item, itemIndex) => (
                    <List.Item key={`cat${index}-food${itemIndex}`}>
                      <span>{item.name}</span>
                      <Button color="danger" size="small" onClick={() => this.handleDeleteItem(item.id)}>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </Button>
                    </List.Item>
                  ))}
                </List>
              )}
              {!items.length && (
                <p>No food items logged yet.</p>
              )}
            </Card.Content>
          </Card>
        ))}
      </div>
    );
  }
}

FoodCategories.propTypes = {
  food: PropTypes.array,
};

FoodCategories.defaultProps = {
  food: [],
};

const mapDispatchToProps = {
  removeFood,
};

export default connect(null, mapDispatchToProps)(FoodCategories);
