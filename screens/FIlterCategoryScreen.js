import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { connect } from "react-redux";
import CustomHeaderButton from "../components/CustomHeaderButton";
import Colors from "../constants/Colors";
import actionFunction from "../store/actions/actions";
import { FILTER_MEALS } from "../store/constants";

const CustomSwitch = props => {
    return (
        <View style={styles.switchContainer}>
            <Text>{props.label}</Text>
            <Switch
                trackColor={{
                    false: Colors.secondaryColor,
                    true: Colors.primaryColor,
                }}
                thumbColor={Colors.primaryColor}
                value={props.state}
                onValueChange={props.onChange}
            />
        </View>
    );
};

const FIlterCategoryScreen = props => {
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const saveFilters = useCallback(() => {
        const selectedFilters = {
            gluten: isGlutenFree,
            vegan: isVegan,
            vegetarian: isVegetarian,
            lactose: isLactoseFree,
        };
        console.log("filters", selectedFilters);
        props.dispatchFilters({ filters: selectedFilters });
    }, [isGlutenFree, isVegan, isVegetarian, isLactoseFree]);

    const { navigation } = props;
    useEffect(() => {
        navigation.setParams({ save: saveFilters });
    }, [saveFilters]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
            <CustomSwitch
                label={"Gluten-Free"}
                onChange={value => setIsGlutenFree(value)}
                state={isGlutenFree}
            />
            <CustomSwitch
                label={"Lactose-Free"}
                onChange={value => setIsLactoseFree(value)}
                state={isLactoseFree}
            />
            <CustomSwitch
                label={"Vegan"}
                onChange={value => setIsVegan(value)}
                state={isVegan}
            />
            <CustomSwitch
                label={"Vegetarian"}
                onChange={value => setIsVegetarian(value)}
                state={isVegetarian}
            />
        </View>
    );
};

FIlterCategoryScreen.navigationOptions = navData => {
    return {
        headerTitle: "Filter Meals",
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
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Save"
                    iconName="ios-save"
                    onPress={navData.navigation.getParam("save")}
                />
            </HeaderButtons>
        ),
    };
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
    },
    title: {
        fontFamily: "open-sans-bold",
        fontSize: 22,
        margin: 20,
        textAlign: "center",
    },
    switchContainer: {
        flexDirection: "row",
        width: "80%",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
    },
});

const mapDispatchToProps = dispatch => ({
    dispatchFilters: (...payload) =>
        dispatch(actionFunction(FILTER_MEALS, ...payload)),
});
export default connect(null, mapDispatchToProps)(FIlterCategoryScreen);
