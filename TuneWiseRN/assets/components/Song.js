import React, { Component } from "react";
import { View, StyleSheet, Text, Dimensions, Image } from "react-native";
import { human } from "react-native-typography";

const { width: windowWidth } = Dimensions.get("window");

class Song extends Component {
  static defaultProps = {};

  render() {
    const { title, artist, imageURI } = this.props;

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 12,
          width: windowWidth * 0.88
        }}
      >
        <Image
          style={{ height: 72, width: 72 }}
          resizeMode={"stretch"}
          source={{ uri: imageURI }}
        />
        <View style={{ marginHorizontal: 15 }}>
          <Text style={styles.songTitle}>{title}</Text>
          <Text style={styles.songArtist}>by {artist}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  songTitle: {
    fontFamily: "Courier",
    fontSize: 24
  },
  songArtist: {
    fontFamily: "Courier New",
    fontWeight: "200",
    fontSize: 14
  }
});

export { Song };
