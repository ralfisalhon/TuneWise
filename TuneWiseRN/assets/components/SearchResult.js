import React, { Component } from "react";
import { View, StyleSheet, Text, Dimensions, Image, TouchableOpacity, Alert } from "react-native";
import { human } from "react-native-typography";

const { width: windowWidth } = Dimensions.get("window");

const baseURI = "http://tunewise.herokuapp.com";

class SearchResult extends Component {
  static defaultProps = {};

  handleSongClick(callback, name, artist, imageURI, item) {
    if (globalAdding) {
      callback(name, artist, imageURI);
    } else {
      this.guess(globalRoomCode, globalUserID, item.id);
    }
  }

  guess = async (code, user_id, guess_id) => {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = e => {
      // console.warn(xhr.readyState);
      if (xhr.readyState !== 4) {
        return;
      }
      if (xhr.status == 200) {
        var data = xhr.responseText;
        var obj = JSON.parse(data.replace(/\r?\n|\r/g, ""));

        let guessed = obj.guessed;
        let correct = obj.correct;

        if (correct) {
          Alert.alert("wow u got it");
        } else {
          Alert.alert("try again oops");
        }
      } else {
        // console.warn(xhr.responseText, xhr.status);
      }
    };

    xhr.open("POST", baseURI + "/guess");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("code=" + code + "&user_id=" + user_id + "&guess_id=" + guess_id);
  };

  render() {
    const { name, artist, imageURI, callback, item } = this.props;

    return (
      <TouchableOpacity
        onPress={() => this.handleSongClick(callback, name, artist, imageURI, item)}
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
