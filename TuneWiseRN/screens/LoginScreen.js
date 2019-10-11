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

export class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {}

  isAtBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height;
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>TuneWise</Text>
        </View>
        <View style={styles.card}></View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c2c2c",
    alignItems: "center"
  },
  text: {
    color: "white",
    fontFamily: "Avenir Next",
    fontSize: 20
  },
  card: {
    height: 400,
    marginTop: 25,
    width: windowWidth * 0.9,
    backgroundColor: "white",
    borderRadius: 20
  }
});
