import React, { Component } from "react";
import { View, StyleSheet, Text, Dimensions, Image } from "react-native";
import { human } from "react-native-typography";

const { width: windowWidth } = Dimensions.get("window");
const isSmallDevice = windowWidth < 350 ? true : false;

class Profile extends Component {
  static defaultProps = {};

  render() {
    const { avatar, username, discoveries } = this.props;

    return (
      <View style={styles.container}>
        <View style={{ width: 64, height: 64, borderRadius: 64, overflow: "hidden" }}>
          <Image
            source={{ uri: avatar }}
            style={{ flex: 1, width: undefined, height: undefined }}
          />
        </View>
        <View style={styles.userText}>
          <Text style={[human.title3White, styles.title]}>{username}</Text>
          <Text style={[human.subheadWhite]}>Total Discoveries: {discoveries}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: "row",
    backgroundColor: "#202020"
  },
  userText: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: "center"
  },
  title: {
    fontWeight: "800"
  }
});

export { Profile };
