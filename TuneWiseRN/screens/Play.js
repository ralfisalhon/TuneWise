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
  "BQDRxOEeLW4PV2g1Ahd7RdxtcgzhVfzgzZjBLm2SasIEIaE_A9Z-QpXuAwUx8RWVPapp1UpsHWSKtkk_Jy4eDJUXbvAninuG5hkHJ5yhfsKT4xYpPRQEeJFmbMfbChteH1Ovri4YtgcvXR_Q6J0P_j89VygLVrYbHx2VozT4kfI3Pyl0hAkBBrk5l2dZoU5Ok6Oj5wl3hQHPTDhunRq3ubPXau8MiZ23cZFyOxOGdMy6kaM21IkZoZx5A0pp3BHE3wXxDBEt8NY-zlWVFW9lWfHq6cIX9BsyVYST6YY";

const HEADER_HEIGHT = 100;

export class PlayScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();

    this.state = {
      refresh: false,
      searchResults: [],
      songs: [
        {
          title: "obscure song 0",
          artist: "ashton & the ophids",
          imageURI: "https://puu.sh/ErI6Z/c5d481e732.png"
        },
        {
          title: "obscure song 1",
          artist: "ashton & the ophids",
          imageURI: "https://puu.sh/ErIey/7a23d6457a.png"
        },
        {
          title: "obscure song 2",
          artist: "ashton & the ophids",
          imageURI: "https://puu.sh/ErI6Z/c5d481e732.png"
        },
        {
          title: "obscure song 3",
          artist: "ashton & the ophids",
          imageURI: "https://puu.sh/ErIey/7a23d6457a.png"
        },
        {
          title: "obscure song 4",
          artist: "ashton & the ophids",
          imageURI: "https://puu.sh/ErI6Z/c5d481e732.png"
        },
        {
          title: "obscure song 5",
          artist: "ashton & the ophids",
          imageURI: "https://puu.sh/ErIey/7a23d6457a.png"
        }
      ]
    };
  }

  searchSong = async (accessToken, query) => {
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
        this.refreshToken();
      } else console.warn("Something went wrong on searchSong");
    };
    xhr.open("GET", "https://api.spotify.com/v1/search?type=track&limit=10&q=" + query);
    xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
  };

  // searchSong(accessToken, query) {
  //   alert(query);
  // }

  addSong() {
    alert("unimplemented");
    this.setState({ refresh: !this.state.refresh });
  }

  componentDidMount() {}

  renderPlaylist = ({ item, index }) => {
    return <Song title={item.title} artist={item.artist} imageURI={item.imageURI} />;
  };

  renderSearchResults = ({ item, index }) => {
    return (
      <SearchResult
        name={item.name}
        artist={item.artists[0].name}
        imageURI={item.album.images[2].url}
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
        <FlatList
          extraData={this.state.refresh}
          ref={ref => {
            this.flatListRef3 = ref;
          }}
          showsVerticalScrollIndicator={false}
          data={this.state.songs}
          renderItem={this.renderPlaylist}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  renderYourSong() {
    return (
      <View>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.text}>it's your song!</Text>
        </View>
        <Image
          style={{
            height: windowWidth - 40,
            width: windowWidth - 40,
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

  renderGuess() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          borderRadius: 25,
          alignItems: "center",
          padding: 20
        }}
      >
        <Text style={[styles.text, { color: "#010d58", fontSize: 20 }]}>Guess this song!</Text>
        <View style={styles.input}>
          <TextInput
            placeholder={"session name"}
            value={this.state.sessionName}
            style={{
              flex: 1,
              color: "white",
              fontFamily: "Courier",
              fontSize: 24
            }}
            autoCapitalize={"none"}
            autoCompleteType={"off"}
            autoCorrect={false}
            maxLength={20}
            placeholderTextColor={"#bdc3c7"}
            onChangeText={text => this.searchSong(token, text)}
          />
        </View>
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
    marginBottom: 25,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: "white",
    paddingHorizontal: 20,
    height: 60,
    width: windowWidth * 0.8,
    backgroundColor: "#010d58"
  }
});
