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

export class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();

    this.state = {
    };
  }

  componentDidMount() {
    
  }

  isAtBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height;
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Hello World</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c2c2c",
    justifyContent: "center",
    alignItems: 'center',
  },
  text: {
    color: 'white'
  }
});
