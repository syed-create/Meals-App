import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import Colors from "../constants/Colors";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import FavouriteMealsScreen from "../screens/FavouriteMealsScreen";
import MealDetailsScreen from "../screens/MealDetailsScreen";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Platform } from "react-native";
import FIlterCategoryScreen from "../screens/FIlterCategoryScreen";

const defaultNavigations = {
    headerStyle: {
        backgroundColor: Colors.primaryColor,
    },
    headerTintColor: Colors.textColor,
};
const MealsNavigator = createStackNavigator(
    {
        Categories: CategoriesScreen,
        CategoryMeals: {
            screen: CategoryMealsScreen,
        },
        MealDetail: MealDetailsScreen,
    },
    {
        defaultNavigationOptions: defaultNavigations,
    }
);

const FavNavigator = createStackNavigator(
    {
        Favorites: FavouriteMealsScreen,
        MealDetail: MealDetailsScreen,
    },
    {
        defaultNavigationOptions: defaultNavigations,
    }
);
const FIlterNavigator = createStackNavigator(
    {
        Filters: FIlterCategoryScreen,
    },
    {
        defaultNavigationOptions: defaultNavigations,
    }
);

const configNavigation = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (
                    <Ionicons
                        name="ios-restaurant"
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );
            },
            tabBarColor: Colors.primaryColor,
        },
    },
    Favorite: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (
                    <Ionicons
                        name="ios-star"
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );
            },
            tabBarColor: Colors.foodText,
        },
    },
};

const MealsFavTabNavigator =
    Platform.OS === "android"
        ? createMaterialBottomTabNavigator(configNavigation, {
              activeColor: Colors.textColor,
              activeTintColor: Colors.primaryColor,
              shifting: true,
          })
        : createBottomTabNavigator(configNavigation, {
              tabBarOptions: {
                  activeTintColor: Colors.foodText,
              },
          });

const MealDrawer = createDrawerNavigator(
    {
        MealsFavs: {
            screen: MealsFavTabNavigator,
            navigationOptions: {
                drawerLabel: "Meals",
            },
        },
        Filters: FIlterNavigator,
    },
    {
        contentOptions: {
            activeTintColor: Colors.foodText,
            labelStyle: {
                fontFamily: "open-sans-bold",
            },
            itemsContainerStyle: {
                marginVertical: 20,
            },
        },
    }
);

export default createAppContainer(MealDrawer);
