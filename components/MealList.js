import React, { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import MealCard from "./MealCard";

const MealList = props => {
    const favMeals = useSelector(state => state.meals.favoriteMeals);

    const renderMealItem = itemData => {
        const isFav = favMeals.some(meal => meal.id === itemData.item.id);
        return (
            <MealCard
                title={itemData.item.title}
                complexity={itemData.item.complexity}
                affordability={itemData.item.affordability}
                time={itemData.item.duration}
                image={itemData.item.imageUrl}
                onSelectMeal={() => {
                    props.navigation.navigate("MealDetail", {
                        mealId: itemData.item.id,
                        mealIngredients: itemData.item.ingredients,
                        mealSteps: itemData.item.steps,
                        mealTitle: itemData.item.title,
                        isFav: isFav,
                    });
                }}
            />
        );
    };
    return (
        <View style={styles.screen}>
            <FlatList
                data={props.data}
                renderItem={renderMealItem}
                style={{ flex: 1 }}
            />
        </View>
    );
};

export default MealList;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});

// <View style={styles.mealCont}>
//     <ImageBackground
//         style={styles.image}
//         imageStyle={{ opacity: 0.4 }}
//         source={{ uri: itemData.item.imageUrl.toString() }}
//     >
//         <View style={styles.textCont}>
//             <Text style={styles.mealText}>
//                 {itemData.item.title}
//             </Text>
//         </View>
//     </ImageBackground>
// </View>
