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
  Alert
} from "react-native";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
import { human, material } from "react-native-typography";
import { SafeAreaView } from "react-navigation";

import { LinedText } from "../assets/components/LinedText";
import { Header } from "../assets/components/Header";

import Spotify from "rn-spotify-sdk";

const spotifyOptions = {
  clientID: "0aeb9b1df687428fabdbbd115673d64c",
  redirectURL: "https://jamblr.herokuapp.com/",
  tokenSwapURL: "https://jamblr.herokuapp.com/swap",
  tokenRefreshURL: "https://jamblr.herokuapp.com/refresh",
  scopes: [
    // "user-read-private",
    // "playlist-read",
    "playlist-read-private",
    // "user-library-modify",
    // "user-library-read",
    // "playlist-modify-public",
    // "playlist-modify-private",
    "user-top-read"
    // "ugc-image-upload"
  ]
};

export class LandingScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();

    this.state = {
      accessToken: null,
      refreshToken: null
    };
  }

  componentDidMount() {
    this.initializeSpotify();
  }

  initializeSpotify() {
    let that = this;
    if (!Spotify.isInitialized()) {
      Spotify.initialize(spotifyOptions)
        .then(loggedIn => {
          that.setState({ spotifyInitialized: true });
        })
        .catch(error => {
          Alert.alert("Error!", error.message);
        });
    }
  }

  connectWithSpotify(navigate) {
    if (this.state.accessToken) {
      navigate("NameSession", { accessToken: this.state.accessToken });
      return;
    }
    Spotify.login()
      .then(loggedIn => {
        if (loggedIn) {
          const accessToken = Spotify.getSession().accessToken;
          const refreshToken = Spotify.getSession().refreshToken;
          // Save refreshToken to DefaultPreference
          // Alert.alert(accessToken, refreshToken);
          this.setState({ accessToken, refreshToken });
          navigate("NameSession", { accessToken });
        }
      })
      .catch(error => {
        Alert.alert("Error!", error.message);
      });
  }

  isAtBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height;
  };

  render() {
    const { navigate } = this.props.navigation;
    const { accessToken } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <Header title={"get ur bop on"}></Header>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={styles.logo}>
            <Image
              style={{ height: undefined, width: undefined, flex: 1 }}
              resizeMode={"contain"}
              source={require("../assets/images/logo.png")}
            />
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.button, styles.gameAsHost]}
              onPress={() => this.connectWithSpotify(navigate)}
            >
              <Text style={[styles.text, styles.gameAsHostText]}>create session.</Text>
            </TouchableOpacity>
            <View style={{ marginVertical: 20 }}>
              <LinedText text={"or"}></LinedText>
            </View>
            <TouchableOpacity
              style={[styles.button, styles.joinExisting]}
              onPress={() => navigate("CodeScreen", { accessToken })}
            >
              <Text style={styles.text}>join existing.</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  logo: {
    height: windowHeight / 2.75,
    width: windowWidth - 40,
    borderRadius: 20
  },
  text: {
    color: "white",
    fontFamily: "Courier",
    fontSize: 18
  },
  card: {
    height: 400,
    marginTop: 15,
    width: windowWidth * 0.9,
    backgroundColor: "white",
    borderRadius: 20,
    opacity: 0.5
  },

  button: {
    backgroundColor: "gray",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 20,
    margin: 10
  },
  gameAsHost: {
    backgroundColor: "white"
  },
  gameAsHostText: {
    color: "#010d58"
  },
  joinExisting: {
    backgroundColor: null,
    borderWidth: 1,
    borderColor: "white"
  },
  buttons: {
    marginTop: 60,
    alignItems: "center"
  }
});
