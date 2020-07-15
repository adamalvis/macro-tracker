import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withUserAuthentication } from '../components/withUserAuthentication.hoc';
import { getActiveUser } from '../state/selectors/user.selectors';
import { loadTodaysFood } from '../state/actions/food.actions';
import DailyTargets from '../components/DailyTargets';
import { loadTargets } from '../state/actions/targets.actions';
import AddFoodButton from '../components/AddFoodButton';
import FoodCategories from '../components/FoodCategories';

function Home(props) {
  const { loadTodaysFood, loadTargets, todaysFood, targets } = props;

  useEffect(() => {
    if (!todaysFood || todaysFood.length < 1) {
      loadTodaysFood();
    }
    
    if (!targets || !targets.isLoaded) {
      loadTargets();
    }
  });

  return (
    <div className="home-page">
      <DailyTargets
        targets={targets}
        food={todaysFood}
      />
      <FoodCategories food={todaysFood} />
      <AddFoodButton />
    </div>
  );
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
