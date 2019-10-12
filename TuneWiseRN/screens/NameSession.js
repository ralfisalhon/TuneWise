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

import { LinedText } from "../assets/components/LinedText";
import { Header } from "../assets/components/Header";
import { SafeAreaView } from "react-navigation";

export class NameSessionScreen extends React.Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  };

  constructor() {
    super();

    this.state = {
      accessToken: null
    };
  }

  componentDidMount() {
    const { accessToken } = this.props.navigation.state.params;
    this.setState({ accessToken });
  }

  render() {
    const { accessToken } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <Header title={"name ur session"} back={true}></Header>
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
  temp: {
    backgroundColor: "blue"
  }
});
