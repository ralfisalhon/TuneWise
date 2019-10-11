import React, { Component } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { human } from "react-native-typography";

const { width: windowWidth } = Dimensions.get("window");
const isSmallDevice = windowWidth < 350 ? true : false;

class Welcome extends Component {
  static defaultProps = {};

  render() {
    const {} = this.props;

    return (
      <View style={styles.textContainer}>
        <Text style={[human.largeTitleWhite, styles.title]}>Meet Jamblr,</Text>
        <Text style={[human.title3White, styles.subtitle]}>
          Your Music Discovery &{"\n"}Playlist Creation Assistant
        </Text>
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
  textContainer: {
    flex: 1,
    justifyContent: "flex-end"
  },
  title: {
    fontWeight: "700",
    letterSpacing: -0.5,
    fontSize: 28
  },
  subtitle: {
    textAlign: "left",
    fontSize: isSmallDevice ? 14 : 16,
    letterSpacing: 1.25
  }
});

export { Welcome };
