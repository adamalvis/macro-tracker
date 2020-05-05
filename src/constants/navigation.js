import Home from "../pages/Home";
import Register from "../pages/Register";
import AddFood from "../pages/AddFood";

export const PAGE_NAMES = {
  HOME: 'home',
  REGISTER: 'register',
  ADD_FOOD: 'addFood',
};

export const PAGES = {
  [PAGE_NAMES.HOME]: {
    title: 'Home',
    component: Home,
    path: '/',
  },
  [PAGE_NAMES.REGISTER]: {
    title: 'Register',
    component: Register,
    path: '/register',
  },
  [PAGE_NAMES.ADD_FOOD]: {
    title: 'Add Food',
    component: AddFood,
    path: '/add-food',
  },
};
