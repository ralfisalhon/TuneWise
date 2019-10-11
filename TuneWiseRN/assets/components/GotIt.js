import React, { Component } from "react";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import { human } from "react-native-typography";

const { width: windowWidth } = Dimensions.get("window");
const isSmallDevice = windowWidth < 350 ? true : false;

class GotIt extends Component {
  static defaultProps = {};

  render() {
    const { onPress } = this.props;

    return (
      <View style={styles.privacyContainer}>
        <TouchableOpacity
          style={{ marginHorizontal: 5 }}
          onPress={() => alert("Link to Privacy Policy")}
        >
          <Text style={[human.caption2, { color: "lightgray", opacity: 0.75 }]}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.75} onPress={onPress} style={styles.gotItButton}>
          <View style={{ flexDirection: "row", paddingHorizontal: 4 }}>
            <Text style={human.headlineWhite}>Got it</Text>
            <View style={{ flex: 1, marginVertical: 2, marginRight: -4 }}>
              <Image
                style={{ height: undefined, width: undefined, flex: 1 }}
                resizeMode={"contain"}
                source={require("../images/thumbsUp.png")}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  privacyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 12,
    marginTop: 3
  },
  gotItButton: {
    width: 90,
    backgroundColor: "#108ced",
    padding: 5,
    borderRadius: 5,
    alignItems: "center"
  }
});

export { GotIt };
