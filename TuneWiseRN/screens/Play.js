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
import { human } from "react-native-typography";
import BottomDrawer from "rn-bottom-drawer";

import { Header } from "../assets/components/Header";
import { SafeAreaView } from "react-navigation";

const HEADER_HEIGHT = 100;

export class PlayScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();

    this.state = {};
  }

  addSong() {
    alert("add song pressed");
  }

  componentDidMount() {}

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
        <View
          style={{
            marginTop: 12,
            width: windowWidth * 0.88,
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Image
            style={{ height: 72, width: 72 }}
            resizeMode={"stretch"}
            source={require("../assets/images/song0.png")}
          />
          <View style={{ marginHorizontal: 15 }}>
            <Text style={styles.songTitle}>obscure song 0</Text>
            <Text style={styles.songArtist}>by ashton & the ophids</Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { navigate } = this.props.navigation;
    const { accessToken, sessionName } = this.props.navigation.state.params;

    return (
      <SafeAreaView style={styles.container}>
        <Header
          title={sessionName}
          navigate={navigate}
          navigation={this.props.navigation}
          back={true}
        ></Header>
        <BottomDrawer
          startUp={false}
          containerHeight={windowHeight * 0.7}
          downDisplay={windowHeight * 0.5}
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
    paddingHorizontal: 5
  },
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
