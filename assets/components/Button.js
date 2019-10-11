import React, { Component } from "react";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import { human } from "react-native-typography";

const { width: windowWidth } = Dimensions.get("window");
const isSmallDevice = windowWidth < 350 ? true : false;

class Button extends Component {
  static defaultProps = {};

  render() {
    const { text, fontSize, backgroundColor, onPress } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={onPress}
          style={[styles.gotItButton, { backgroundColor }]}
        >
          <Text style={[human.title1White, { fontSize }]}>{text}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    marginTop: 20,
    width: 275
  },
  gotItButton: {
    borderRadius: 8,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export { Button };
