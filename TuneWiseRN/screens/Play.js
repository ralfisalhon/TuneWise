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

import { Header } from "../assets/components/Header";
import { Song } from "../assets/components/Song";
import { SearchResult } from "../assets/components/SearchResult";

const token =
  "BQCnSMAuXZDBdLahSJxcYwYJvRp-ai2GT8maGJNZUU2j9G24EO-MG1IHO73Ndf9HfaY0-_4OOmU64UT0_oI3P-jjLHNxVy1zVELFqndJUkJl2DXWoXKKWUFxOViOdsJUmqD0xLIiZ2N-I9OqoNcgB4tm6aXWL4EtpWSrHg89A1OfXP8clz-OYKxa5_yKXPJUF8aMeOa1ZCuK6mg2WQApp1fQwYdALTQFLBspaQSeFQXeY-CeIluueO9A8nKSuPcHv7CBR1kPk0dGjtIpGSeofdVWvCATaTfJ55_rtf4";

const HEADER_HEIGHT = 100;

// {
//   title: "obscure song 0",
//   artist: "ashton & the ophids",
//   imageURI: "https://puu.sh/ErI6Z/c5d481e732.png"
// }

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
      searchQuery: ""
    };
  }

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
        this.setState({ searchResults: obj.tracks.items });
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
  }

  componentDidMount() {}

  renderPlaylist = ({ item, index }) => {
    return <Song title={item.title} artist={item.artist} imageURI={item.imageURI} />;
  };

  addToYourQueue(name, artist, imageURI) {
    let songs = this.state.songs;
    songs.push({
      title: name,
      artist: artist,
      imageURI: imageURI
    });
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
        name={item.name}
        artist={item.artists[0].name}
        callback={(name, artist, image) => this.addToYourQueue(name, artist, image)}
        imageURI={
          item.album.images && item.album.images.length > 2
            ? item.album.images[2].url
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
            uri: "http://images.genius.com/5122fb08e82ccd1c941055fc5f6e1203.640x640x1.jpg"
          }}
        />
        <View style={{ margin: 10 }}>
          <Text
            style={{ color: "white", fontFamily: "Courier", textAlign: "center", fontSize: 24 }}
          >
            Wait for the Moment
          </Text>
          <Text
            style={{
              color: "white",
              fontFamily: "Courier New",
              textAlign: "center",
              fontSize: 18
            }}
          >
            Vulfpeck
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
            onChangeText={text => this.searchSongCheck(token, text)}
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

  render() {
    const { navigate } = this.props.navigation;
    const { accessToken, sessionName } = this.props.navigation.state.params;

    return (
      <SafeAreaView style={styles.container}>
        <Header
          title={sessionName}
          navigate={navigate}
          navigation={this.props.navigation}
          playScreen={true}
          back={true}
        ></Header>
        <View style={{ flex: 0.85, justifyContent: "center", marginBottom: 96 }}>
          <View style={styles.card}>{false ? this.renderYourSong() : this.renderGuess()}</View>
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
