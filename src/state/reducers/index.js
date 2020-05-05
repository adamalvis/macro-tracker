import { combineReducers } from "redux";
import navigation from './navigation.reducer';
import user from './user.reducer';
import food from './food.reducer';
import targets from './targets.reducer';
import notifications from './notifications.reducer';

export default combineReducers({
  navigation,
  user,
  food,
  targets,
  notifications,
});
