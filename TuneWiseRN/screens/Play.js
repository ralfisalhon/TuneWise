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

import { Header } from "../assets/components/Header";
import { SafeAreaView } from "react-navigation";

export class PlayScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {}

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
        <Text style={human.subheadWhite}>Hello</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#010d58",
    alignItems: "center"
  }
});
