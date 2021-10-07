import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CustomHeaderButton from "../components/CustomHeaderButton";
import DefaultText from "../components/DefaultText";
import MealList from "../components/MealList";
import { makeSelectFavMealData } from "../store/selector";

const FavouriteMealsScreen = props => {
    if (props.favMeals.length === 0 || !props.favMeals) {
        return (
            <View style={styles.container}>
                <DefaultText>
                    No Favorite Meals Found. Start Adding Some.
                </DefaultText>
            </View>
        );
    }
    return <MealList data={props.favMeals} navigation={props.navigation} />;
};

FavouriteMealsScreen.navigationOptions = navData => {
    return {
        headerTitle: "Favorite Meals",
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Menu"
                    iconName="ios-menu"
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
    };
};

export const mapStateToProps = createStructuredSelector({
    favMeals: makeSelectFavMealData(),
});
// const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, null)(FavouriteMealsScreen);

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex:1,
    },
});
