import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform,
    TouchableNativeFeedback,
} from "react-native";
import Colors from "../constants/Colors";

const CategoryGridTitle = props => {
    let TileContainer = TouchableOpacity;
    if (Platform.OS === "android" && Platform.Version >= 21) {
        TileContainer = TouchableNativeFeedback;
    }
    return (
        <View style={styles.listItem}>
            <TileContainer onPress={props.onSelect}>
                <View
                    style={{
                        ...styles.tileCont,
                        ...{ backgroundColor: props.color },
                    }}
                >
                    <Text style={styles.title} numberOfLines={2}>
                        {props.title}
                    </Text>
                </View>
            </TileContainer>
        </View>
    );
};

export default CategoryGridTitle;

const styles = StyleSheet.create({
    listItem: {
        flex: 1,
        margin: 15,
        height: 150,
    },
    tileCont: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        borderRadius: 10,
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
        padding: 15,
    },
    title: {
        fontFamily: "open-sans-bold",
        fontSize: 22,
        textAlign: "right",
        color:'black'
    },
});
