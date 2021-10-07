import React from "react";
import { StyleSheet, View } from "react-native";
import { CATEGORIES } from "../data/dumy-category-data";
import MealList from "../components/MealList";
import { createStructuredSelector } from "reselect";
import { makeSelectFilteredMealData } from "../store/selector";
import { connect } from "react-redux";
import DefaultText from "../components/DefaultText";

const CategoryMealsScreen = props => {
    const categoryId = props.navigation.getParam("categoryId");
    let meals = props.filterMealsData.filter(meal =>
        meal.categoryIds.find(id => id === categoryId)
    );
    if (meals.length === 0 || !meals) {
        return (
            <View style={styles.fallbackText}>
                <DefaultText>There is no meal in this category. Maybe check your filters?</DefaultText>
            </View>
        );
    }

    return <MealList data={meals} navigation={props.navigation} />;
};
CategoryMealsScreen.navigationOptions = navigationData => {
    const categoryId = navigationData.navigation.getParam("categoryId");
    let categoryMeal = CATEGORIES.find(category => category.id === categoryId);
    return {
        headerTitle: categoryMeal.title,
    };
};

export const mapStateToProps = createStructuredSelector({
    filterMealsData: makeSelectFilteredMealData(),
});
// const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, null)(CategoryMealsScreen);

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    mealCont: {
        flex: 1,
        height: 200,
        overflow: "hidden",
        borderRadius: 20,
    },
    image: {
        margin: 15,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        shadowOpacity: 0.28,
        elevation: 3,
        flex: 1,
        overflow: "hidden",
        borderRadius: 20,
        backgroundColor: "black",
    },
    textCont: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    mealText: {
        fontFamily: "open-sans-bold",
        fontSize: 25,
        color: "white",
        textAlign: "center",
    },
    fallbackText: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        textAlign:'center'
    },
});
