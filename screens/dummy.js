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

const isSmallDevice = windowWidth < 350 ? true : false;
const isTallDevice = windowHeight < 700 ? false : true;
const scrollDistance = 440;

import { Welcome } from "../assets/components/Welcome";

export class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {}

  render() {
    const {} = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={human.subheadWhite}>Hey</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c2c2c",
    justifyContent: "center",
    alignItems: "center"
  }
});
