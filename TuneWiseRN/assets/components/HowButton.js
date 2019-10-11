import React, { Component } from "react";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";
import { human } from "react-native-typography";

const { width: windowWidth } = Dimensions.get("window");
const isSmallDevice = windowWidth < 350 ? true : false;

class HowButton extends Component {
  static defaultProps = {};

  render() {
    const { onPress } = this.props;

    return (
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity style={styles.howButton} activeOpacity={0.75} onPress={onPress}>
          <Text style={[human.subheadWhite, styles.howText]}>How does Jamblr work?</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  howButton: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 100
  },
  howText: {
    color: "rgb(192, 192, 192)",
    fontSize: 14
  }
});

export { HowButton };
