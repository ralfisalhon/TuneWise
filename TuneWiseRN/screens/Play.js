import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
  FlatList,
  TextInput
} from "react-native";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
import BottomDrawer from "rn-bottom-drawer";
import { SafeAreaView } from "react-navigation";
var Sound = require("react-native-sound");

import { Header } from "../assets/components/Header";
import { Song } from "../assets/components/Song";
import { SearchResult } from "../assets/components/SearchResult";

const baseURI = "http://tunewise.herokuapp.com";

const token =
  "BQA7EWyLdgGs9nBWmI7kbCtlPqRIGUP_fa9532BqamkXoiScGDoLZHHooTz-Vyoy6yRvyUpTYhp2_A6QGGW_aYi_9dmv-08fOY2LDyCyCRHG5h3lWl1MFGeQhl3GOiE69jfLhBxqdp_tNl8rBEze9BvTUA6z2RQgBpAv8oyn2dAd7aXnJ7IxL06Nm-ICiLFcJDVN6UXPivD6glQ4tSkz6umsvQhzk-4gEvY94dARObjEy7xyAZhw_0cpVeZlRlpkmB_ymz-YOeYM2axfvHbNajt5QnSXw3Sd850uipE";

const HEADER_HEIGHT = 100;

export class PlayScreen extends React.Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  };

  constructor() {
    super();

    this.state = {
      topText: "guess the song",
      refresh: false,
      searchResults: [],
      songs: [],
      searchQuery: "",
      host: false,
      hostDecided: false,
      firstSong: true,
      id: null,
      roomCode: null
    };
  }

  startRound = async (code, song_uri, song_id, user_id) => {
    console.warn("start round");
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = e => {
      // console.warn(xhr.readyState);
      if (xhr.readyState !== 4) {
        return;
      }
      if (xhr.status == 200) {
        var data = xhr.responseText;
        // var obj = JSON.parse(data.replace(/\r?\n|\r/g, ""));
        // console.warn("Worked");
        // console.warn(xhr.responseText);
        const sound = new Sound(song_uri, null, error => {
          if (error) {
            // do something
            // console.warn("Song does not have a preview url");
          }
          // play when loaded
          sound.play();
        });
      } else {
        // console.warn(xhr.responseText, xhr.status);
      }
    };

    xhr.open("POST", baseURI + "/startround");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(
      "code=" + code + "&song_uri=" + song_uri + "&song_id=" + song_id + "&user_id=" + user_id
    );
  };

  searchSongCheck(accessToken, query) {
    let that = this;
    this.setState({ searchQuery: query });
    setTimeout(function() {
      if (that.state.searchQuery == query) {
        that.searchSong(accessToken, query);
      }
    }, 250);
  }

  searchSong = async (accessToken, query) => {
    if (query.length == 0) this.setState({ searchResults: [] });
    if (query.length < 3) return;
    query = query.split(" ").join("+");
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = async e => {
      if (xhr.readyState !== 4) return;
      if (xhr.status == 200) {
        let data = xhr.responseText;
        let obj = JSON.parse(data);
        let temp = obj.tracks.items;

        // remove all songs without preview_url

        this.setState({ searchResults: temp });
        console.log("RALFIII");
        console.log(obj.tracks.items);
      } else if (xhr.status == 401) {
        alert("Your token expired");
      } else console.warn("Something went wrong on searchSong");
    };
    xhr.open("GET", "https://api.spotify.com/v1/search?type=track&limit=10&q=" + query);
    xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
  };

  addSong() {
    this.setState({ topText: "add a song" });
    globalAdding = true;
    if (!this.state.firstSong) {
      this.setState({ firstSong: true });
    }
  }

  componentDidMount() {}

  renderPlaylist = ({ item, index }) => {
    return <Song title={item.title} artist={item.artist} imageURI={item.imageURI} />;
  };

  addToYourQueue(name, artist, imageURI, item) {
    // console.warn(item);
    let songs = this.state.songs;
    songs.push({
      title: name,
      artist: artist,
      imageURI: imageURI
    });

    if (this.state.host) {
      globalSongPlaying = {
        name,
        artist,
        imageURI
      };
    }
    // console.warn(this.state.host, this.state.firstSong);
    if (this.state.host && this.state.firstSong) {
      this.startRound(this.state.roomCode, item.preview_url, item.id, this.state.id);
      this.setState({ firstSong: false });
    }
    console.log(songs);
    this.setState({ songs }, () =>
      this.setState({
        refresh: !this.state.refresh,
        topText: "guess the song",
        searchQuery: "",
        searchResults: []
      })
    );
    globalAdding = false;
  }

  renderSearchResults = ({ item, index }) => {
    return (
      <SearchResult
        item={item}
        name={item.name}
        artist={item.artists[0].name}
        callback={(name, artist, image) => this.addToYourQueue(name, artist, image, item)}
        imageURI={
          item.album.images && item.album.images.length > 2
            ? item.album.images[1].url
            : "https://placehold.it/64"
        }
      ></SearchResult>
    );
  };

  renderDrawer = () => {
    return (
      <View style={styles.contentContainer}>
        <View style={{ position: "absolute", top: -54, right: 5, zIndex: 2 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => this.addSong()}>
            <Image
              style={{ height: 96, width: 96, marginHorizontal: 8, marginTop: 12 }}
              resizeMode={"stretch"}
              source={require("../assets/images/addSong.png")}
            />
          </TouchableOpacity>
        </View>
        <Image
          style={{ height: 10, width: 42, marginHorizontal: 8, marginTop: 12 }}
          resizeMode={"stretch"}
          source={require("../assets/images/lineGray.png")}
        />
        {this.state.songs && this.state.songs.length > 0 ? (
          <FlatList
            scrollEnabled={false}
            extraData={this.state.refresh}
            ref={ref => {
              this.flatListRef3 = ref;
            }}
            showsVerticalScrollIndicator={false}
            data={this.state.songs}
            renderItem={this.renderPlaylist}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View style={{ paddingHorizontal: 20, justifyContent: "space-between", flex: 1 }}>
            <View style={{ height: 100, justifyContent: "center" }}>
              <Text style={[styles.text, { color: "#010d58", fontSize: 16 }]}>
                Queue songs by pressing the + button
              </Text>
            </View>
            <View style={{ height: 100, justifyContent: "center" }}>
              <Text style={[styles.text, { color: "#010d58", fontSize: 12 }]}>
                I already told you what to do {">.<"}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  renderYourSong() {
    if (!globalSongPlaying) return null;
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.text}>it's your song!</Text>
        </View>
        <Image
          style={{
            height: windowWidth - 60,
            width: windowWidth - 60,
            borderRadius: 25
          }}
          resizeMode={"contain"}
          source={{
            uri: globalSongPlaying.imageURI
          }}
        />
        <View style={{ margin: 10 }}>
          <Text
            style={{ color: "white", fontFamily: "Courier", textAlign: "center", fontSize: 24 }}
          >
            {globalSongPlaying.name}
          </Text>
          <Text
            style={{
              color: "white",
              fontFamily: "Courier New",
              textAlign: "center",
              fontSize: 18
            }}
          >
            {globalSongPlaying.artist}
          </Text>
        </View>
      </View>
    );
  }

  backToGuessing() {
    globalAdding = false;
    this.setState({ topText: "guess the song", searchResults: [], searchQuery: "" });
  }

  renderGuess() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#ecf0f1",
          borderRadius: 25,
          alignItems: "center",
          padding: 20
        }}
      >
        <Text style={[styles.text, { color: "#010d58", fontSize: 20 }]}>{this.state.topText}</Text>
        <View style={styles.input}>
          <TextInput
            placeholder={"search spotify"}
            value={this.state.searchQuery}
            style={{
              flex: 1,
              color: "#ecf0f1",
              fontFamily: "Courier",
              fontSize: 24
            }}
            autoCapitalize={"none"}
            autoCompleteType={"off"}
            autoCorrect={false}
            maxLength={20}
            placeholderTextColor={"#bdc3c7"}
            onChangeText={text => this.searchSongCheck(this.state.accessToken, text)}
          />
        </View>
        {this.state.topText == "add a song" ? (
          <TouchableOpacity onPress={() => this.backToGuessing()} style={{ marginTop: 5 }}>
            <Text style={[styles.text, { color: "black", fontSize: 14 }]}>
              {"<<"} back to guessing {">>"}
            </Text>
          </TouchableOpacity>
        ) : null}
        <View style={{ height: 10 }}></View>
        <FlatList
          extraData={this.state.refresh}
          ref={ref => {
            this.flatListRef3 = ref;
          }}
          showsVerticalScrollIndicator={false}
          data={this.state.searchResults}
          renderItem={this.renderSearchResults}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }

  setHost(host, id, roomCode, accessToken) {
    let that = this;
    setTimeout(function() {
      that.setState({ host, hostDecided: true, id, roomCode, accessToken });
    }, 250);

    globalRoomCode = roomCode;
    globalUserID = id;
  }

  render() {
    const { navigate } = this.props.navigation;
    const { accessToken, sessionName, host, id, roomCode } = this.props.navigation.state.params;
    const { hostDecided } = this.state;

    if (!hostDecided) this.setHost(host, id, roomCode, accessToken);

    return (
      <SafeAreaView style={styles.container}>
        <Header
          title={roomCode}
          navigate={navigate}
          navigation={this.props.navigation}
          playScreen={true}
          back={true}
        ></Header>
        <View style={{ flex: 0.85, justifyContent: "center", marginBottom: 96 }}>
          {/* HERE FOR DEMO SHOWCASE */}
          <View style={styles.card}>
            {!this.state.firstSong && this.state.host ? this.renderYourSong() : this.renderGuess()}
          </View>
        </View>
        <BottomDrawer
          startUp={false}
          containerHeight={windowHeight * 0.7}
          downDisplay={windowHeight * 0.7 - 128}
        >
          {this.renderDrawer()}
        </BottomDrawer>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#010d58",
    alignItems: "center"
  },
  contentContainer: {
    flex: 1,
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row"
  },
  text: {
    color: "white",
    fontFamily: "Courier",
    textAlign: "center",
    fontSize: 24
  },
  card: {
    width: windowWidth - 40,
    height: windowWidth,
    borderRadius: 25
  },
  input: {
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: "white",
    paddingHorizontal: 20,
    height: 60,
    width: windowWidth * 0.8,
    backgroundColor: "#010d58"
  }
});
