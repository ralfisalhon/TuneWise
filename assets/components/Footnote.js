import React, { Component } from "react";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import { human } from "react-native-typography";

const { width: windowWidth } = Dimensions.get("window");
const isSmallDevice = windowWidth < 350 ? true : false;

class Footnote extends Component {
  static defaultProps = {};

  render() {
    const { text } = this.props;

    return (
      <View style={styles.container}>
        <Text style={[human.caption1White, styles.currentText]}>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { paddingTop: 5, paddingHorizontal: 10, alignItems: "center", width: 275 }
});

export { Footnote };
