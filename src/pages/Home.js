import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withUserAuthentication } from '../components/withUserAuthentication.hoc';
import { getActiveUser } from '../state/selectors/user.selectors';
import { loadTodaysFood } from '../state/actions/food.actions';
import DailyTargets from '../components/DailyTargets';
import { loadTargets } from '../state/actions/targets.actions';
import AddFoodButton from '../components/AddFoodButton';
import FoodCategories from '../components/FoodCategories';

class Home extends Component {
  componentDidMount() {
    const { loadTodaysFood, loadTargets, todaysFood, targets } = this.props;

    if (!todaysFood || todaysFood.length < 1) {
      loadTodaysFood();
    }
    
    if (!targets || !targets.isLoaded) {
      loadTargets();
    }
  }

  render() {
    const { todaysFood, targets } = this.props;

    // if (!targets.isUpdated) {
    //   return (
    //     <div>
    //       <p>It looks like you haven't updated your macro targets yet. Please click below to set your daily targets.</p>
    //       <Button style={{ marginTop: '10px' }} color="primary">Update Targets</Button>
    //     </div>
    //   );
    // }

    return (
      <div className="home-page">
        <DailyTargets
          targets={targets}
          food={todaysFood}
        />
        <FoodCategories food={todaysFood} />
        <AddFoodButton onClick={this.handleAddFoodButtonClick} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: getActiveUser(state),
  todaysFood: state?.food?.todaysFood,
  targets: state?.targets,
});

const mapDispatchToProps = {
  loadTodaysFood,
  loadTargets,
};

export default withUserAuthentication(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home));
