import React, { useCallback, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { ScrollView } from "react-native-gesture-handler";
import DefaultText from "../components/DefaultText";
import {
    makeSelectFavMealData,
    makeSelectFilteredMealData,
    makeSelectMealData,
} from "../store/selector";
import { connect, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import actionFunction from "../store/actions/actions";
import { FAVORITE_MEAL } from "../store/constants";
const ListItem = props => {
    return (
        <View style={styles.listItem}>
            <Text>{props.children}</Text>
        </View>
    );
};
const MealDetailsScreen = props => {
    const mealId = props.navigation.getParam("mealId");
    const favMeals = useSelector(state =>
        state.meals.favoriteMeals.some(meal => meal.id === mealId)
    );

    const selectedMeal = props.mealsData.find(meal => meal.id === mealId);
    const { toggleFavMeal } = props;

    const onToggleFavoriteButton = useCallback(() => {
        toggleFavMeal({ mealId: mealId });
    }, [toggleFavMeal, mealId]);

    useEffect(() => {
        props.navigation.setParams({
            toggleFavoriteMeal: onToggleFavoriteButton,
        });
    }, [onToggleFavoriteButton]);

    useEffect(() => {
        props.navigation.setParams({
            isFav: favMeals,
        });
    }, [favMeals]);
    
    return (
        <ScrollView>
            <Image
                source={{ uri: selectedMeal.imageUrl }}
                style={styles.image}
            />
            <View style={styles.details}>
                <DefaultText>{selectedMeal.duration}m</DefaultText>
                <DefaultText>
                    {selectedMeal.complexity.toUpperCase()}
                </DefaultText>
                <DefaultText>
                    {selectedMeal.affordability.toUpperCase()}
                </DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map(ingredients => (
                <ListItem key={ingredients}>{ingredients}</ListItem>
            ))}
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map(steps => (
                <ListItem key={steps}>{steps}</ListItem>
            ))}
        </ScrollView>
    );
};

MealDetailsScreen.navigationOptions = navigationData => {
    const mealTitle = navigationData.navigation.getParam("mealTitle");
    const isFav = navigationData.navigation.getParam("isFav");
    // console.log('isFav',isFav);

    return {
        headerTitle: mealTitle,
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Favorite"
                    iconName={!isFav ? "ios-star-outline" : "ios-star"}
                    onPress={navigationData.navigation.getParam(
                        "toggleFavoriteMeal"
                    )}
                />
            </HeaderButtons>
        ),
    };
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: 200,
    },
    details: {
        padding: 15,
        justifyContent: "space-around",
        flexDirection: "row",
    },
    title: {
        fontFamily: "open-sans-bold",
        fontSize: 25,
        textAlign: "center",
    },
    listItem: {
        fontFamily: "open-sans",
        padding: 15,
        borderColor: "#ccc",
        borderWidth: 1,
        marginVertical: 10,
        marginHorizontal: 20,
    },
});

export const mapStateToProps = createStructuredSelector({
    filterMealsData: makeSelectFilteredMealData(),
    favMeal: makeSelectFavMealData(),
    mealsData: makeSelectMealData(),
});

const mapDispatchToProps = dispatch => ({
    toggleFavMeal: (...payload) =>
        dispatch(actionFunction(FAVORITE_MEAL, ...payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MealDetailsScreen);
