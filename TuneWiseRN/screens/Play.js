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

  componentDidMount() {}

  renderDrawer = () => {
    return (
      <View style={styles.contentContainer}>
        <View style={{ position: "absolute", top: -54, right: 5, zIndex: 2 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => alert("HEY")}>
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
          containerHeight={windowHeight * 0.5}
          downDisplay={windowHeight * 0.32}
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
  }
});
