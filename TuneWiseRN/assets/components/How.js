import React, { Component } from "react";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import { human } from "react-native-typography";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const isSmallDevice = windowWidth < 350 ? true : false;
const isTallDevice = windowHeight < 700 ? false : true;

import { InfoCard } from "./InfoCard";
import { GotIt } from "./GotIt";

class How extends Component {
  static defaultProps = {};

  render() {
    const { onPressGotIt, scrollDistance } = this.props;

    return (
      <View style={[styles.howContainer, {height: scrollDistance}]}>
        <View style={{ height: isTallDevice ? 50 : 35 }} />
        <InfoCard
          title={"1) Connects to your Spotify* account"}
          description={"This let's Jamblr see what you like listening to"}
          asterisk={"Spotify Premium only, due to limitations set by Spotify"}
          isSmallDevice={isSmallDevice}
        />
        <InfoCard
          title={"2) Analyzes your music trends"}
          description={
            "Your track & artist preferences are used to paint a general picture of what you like"
          }
          isSmallDevice={isSmallDevice}
        />
        <InfoCard
          title={"3) Recommends you new songs"}
          description={"Only the best 30 seconds of a song is played."}
          isSmallDevice={isSmallDevice}
        />
        <InfoCard
          title={"4) Now, you Swipe!"}
          description={
            "Swipe left to dismiss, swipe right to like. Create awesome playlists in minutes"
          }
          isSmallDevice={isSmallDevice}
        />
        <GotIt onPress={onPressGotIt} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  howContainer: {
    width: windowWidth,
    alignContent: "center",
    overflow: "hidden"
  }
});

export { How };
