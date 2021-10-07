import { createSelector } from "reselect";
import { initialState } from "./reducer/mealReducer";

const selectMeal = state => state.meals || initialState;

export const makeSelectMealData = () =>
    createSelector(selectMeal, substate => substate.meal);

export const makeSelectFavMealData = () =>
    createSelector(selectMeal, substate => substate.favoriteMeals);

export const makeSelectFilteredMealData = () =>
    createSelector(selectMeal, substate => substate.filteredMeals);
