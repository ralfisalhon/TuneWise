import React, { Component } from "react";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import { human } from "react-native-typography";

const { width: windowWidth } = Dimensions.get("window");
const isSmallDevice = windowWidth < 350 ? true : false;

class SpotifyButton extends Component {
  static defaultProps = {};

  render() {
    const { onPress } = this.props;

    return (
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity style={styles.spotifyButton} activeOpacity={0.75} onPress={onPress}>
          <Image
            style={styles.spotifyIcon}
            source={require("../images/Spotify_Icon_RGB_White.png")}
          />
          <View style={{ width: 5 }} />
          <Text style={[human.calloutWhite, styles.connectText]}>CONNECT WITH SPOTIFY</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spotifyButton: {
    paddingVertical: 12,
    width: windowWidth - 100,
    backgroundColor: "#1db954",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  spotifyIcon: {
    height: 24,
    width: 24
  },
  connectText: {
    fontSize: isSmallDevice ? 14 : 16
  }
});

export { SpotifyButton };
