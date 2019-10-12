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

export class SettingsScreen extends React.Component {
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
        <Text style={human.subheadWhite}>Hey San!!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#010d58",
    justifyContent: "center",
    alignItems: "center"
  }
});
