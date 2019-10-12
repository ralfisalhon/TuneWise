import React, { Component } from "react";
import { View, StyleSheet, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import { human } from "react-native-typography";

const { width: windowWidth } = Dimensions.get("window");

class SearchResult extends Component {
  static defaultProps = {};

  render() {
    const { name, artist, imageURI } = this.props;

    return (
      <TouchableOpacity
        onPress={() => alert(name)}
        style={{ flexDirection: "row", marginVertical: 5, width: windowWidth * 0.75 }}
      >
        <Image
          style={{ height: 64, width: 64, borderRadius: 10 }}
          resizeMode={"stretch"}
          source={{ uri: imageURI }}
        />
        <View style={{ justifyContent: "center", marginHorizontal: 8 }}>
          <Text>{name}</Text>
          <Text>{artist}</Text>
        </View>
      </TouchableOpacity>
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

export { SearchResult };