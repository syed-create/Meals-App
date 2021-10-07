import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import DefaultText from "./DefaultText";

const MealCard = props => {
    return (
        <View style={styles.mealCont}>
            <TouchableOpacity
                onPress={props.onSelectMeal}
                style={styles.container}
            >
                <View style={styles.imgCont}>
                    <ImageBackground
                        source={{ uri: props.image }}
                        style={styles.bgImg}
                    >
                        <View style={styles.mealTitleCont}>
                            <Text style={styles.mealTitleText}>
                                {props.title}
                            </Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.mealDetail}>
                    <DefaultText>{props.time}</DefaultText>
                    <DefaultText>
                        {props.affordability.toUpperCase()}
                    </DefaultText>
                    <DefaultText>{props.complexity.toUpperCase()}</DefaultText>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default MealCard;

const styles = StyleSheet.create({
    mealCont: {
        height: 200,
        margin: 10,
        borderRadius: 10,
        overflow: "hidden",
    },
    container: {
        flex: 1,
        backgroundColor: "#F4F4F4F4",
        justifyContent: "space-between",
        borderColor:"#ccc",
        borderWidth:1,
        borderRadius:10,
    },
    imgCont: {
        height: "85%",
    },
    bgImg: {
        height: "100%",
        width: "100%",
    },
    mealTitleCont: {
        justifyContent: "flex-end",
        flex: 1,
    },
    mealTitleText: {
        fontSize: 22,
        fontFamily: "open-sans-bold",
        color: "white",
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: 10,
        textAlign: "center",
    },
    mealDetail: {
        height: "15%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    bold: {
        fontFamily: "open-sans",
    },
});
