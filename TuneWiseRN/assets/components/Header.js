import React, { Component } from "react";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import { human } from "react-native-typography";

const { width: windowWidth } = Dimensions.get("window");

import { LinedText } from "./LinedText.js";

class Header extends Component {
  static defaultProps = {
    back: false
  };

  threeLinesPressed() {
    alert("pressed 3 lines");
  }

  gearPressed() {
    alert("pressed gear");
  }

  render() {
    const { title, back } = this.props;

    return (
      <View style={styles.header}>
        <TouchableOpacity
          style={{ width: 24, height: 24 }}
          onPress={() => this.threeLinesPressed()}
        >
          <Image
            style={{ height: undefined, width: undefined, flex: 1 }}
            resizeMode={"contain"}
            source={back ? require("../images/backArrow.png") : require("../images/gear.png")}
          />
        </TouchableOpacity>
        <LinedText text={title}></LinedText>
        <TouchableOpacity style={{ width: 24, height: 24 }} onPress={() => this.gearPressed()}>
          <Image
            style={{ height: undefined, width: undefined, flex: 1 }}
            resizeMode={"contain"}
            source={require("../images/gear.png")}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 8,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "gray",
    shadowOpacity: 0.1
  },
  header: {
    width: windowWidth,
    height: 50,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    paddingHorizontal: 25,
    marginTop: 20
  }
});

export { Header };
