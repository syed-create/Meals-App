import { MEALS } from "../../data/dumy-category-data";
import { FAVORITE_MEAL, FILTER_MEALS } from "../constants";

export const initialState = {
    meal: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: [],
};

const MealReducer = (state = initialState, action) => {
    switch (action.type) {
        case FAVORITE_MEAL:
            const existingMealIndex = state.favoriteMeals.findIndex(
                meal => meal.id === action.payload.mealId
            );
            if (existingMealIndex >= 0) {
                const newFavMeals = [...state.favoriteMeals];
                newFavMeals.splice(existingMealIndex, 1);
                return {
                    ...state,
                    favoriteMeals: newFavMeals,
                };
            } else {
                const meal = state.meal.find(
                    meal => meal.id === action.payload.mealId
                );
                return {
                    ...state,
                    favoriteMeals: state.favoriteMeals.concat(meal),
                };
            }
        case FILTER_MEALS:
            const appliedFilters = action.payload.filters;
            const newFilterMeals = state.meal.filter(meal => {
                if (appliedFilters.gluten && !meal.isGlutenFree) {
                    return false;
                }
                if (appliedFilters.vegan && !meal.isVegan) {
                    return false;
                }
                if (appliedFilters.vegetarian && !meal.isVegetarian) {
                    return false;
                }
                if (appliedFilters.lactose && !meal.isLactoseFree) {
                    return false;
                }
                return true;
            });
            return {
                ...state,
                filteredMeals: newFilterMeals,
            };
        default:
            return state;
    }
    return {
        state,
    };
};

export default MealReducer;
