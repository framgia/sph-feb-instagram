import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVORITE, SET_FILTERS } from "../actions/meals";

const iniitalState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealReducers = (state = iniitalState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteMeals.findIndex(
        (meal) => meal.id === action.payload.mealId
      );

      if (existingIndex >= 0) {
        const updatedFav = [...state.favoriteMeals];
        updatedFav.splice(existingIndex, 1);
        return { ...state, favoriteMeals: updatedFav };
      } else {
        const meal = state.meals.find(
          (meal) => meal.id === action.payload.mealId
        );
        return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) };
      }

    case SET_FILTERS:
      const appliedFilters = action.payload.filters;
      const updatedFilteredMeals = state.meals.filter((meal) => {
        if (appliedFilters.glutenFree && !meal.isGlutenFree) {
          return false;
        }

        if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
          return false;
        }

        if (appliedFilters.vegan && !meal.isVegan) {
          return false;
        }

        if (appliedFilters.vegetarian && !meal.isVegetarian) {
          return false;
        }
      });
      return { ...state, filteredMeals: updatedFilteredMeals };
    default:
      return state;
  }
  return state;
};

export default mealReducers;
