import React, { Component } from "react";
import { View, StyleSheet, Text, Dimensions, Image } from "react-native";
import { human } from "react-native-typography";

const { width: windowWidth } = Dimensions.get("window");

class LinedText extends Component {
  static defaultProps = {};

  render() {
    const { text } = this.props;

    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={{ height: 2, width: 36, marginHorizontal: 8 }}
          resizeMode={"stretch"}
          source={require("../images/line.png")}
        />
        <Text style={styles.text}>{text}</Text>
        <Image
          style={{ height: 2, width: 36, marginHorizontal: 8 }}
          resizeMode={"stretch"}
          source={require("../images/line.png")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontFamily: "Courier",
    fontSize: 16
  }
});

export { LinedText };
