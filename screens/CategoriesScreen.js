import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CategoryGridTitle from "../components/CategoryGridTitle";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { CATEGORIES } from "../data/dumy-category-data";

const CategoriesScreen = props => {
    const renderCategories = itemData => {
        return (
            <CategoryGridTitle
                title={itemData.item.title}
                onSelect={() => {
                    props.navigation.navigate("CategoryMeals", {
                        categoryId: itemData.item.id,
                    });
                }}
                color={itemData.item.color}
            />
        );
    };
    return (
        <FlatList
            data={CATEGORIES}
            renderItem={renderCategories}
            numColumns={2}
        />
    );
};

export default CategoriesScreen;

CategoriesScreen.navigationOptions = navData => {
    return {
        headerTitle: "Meal Categories",
        headerLeft:()=> (
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

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
