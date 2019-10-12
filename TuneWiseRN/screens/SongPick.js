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

export class SongPickScreen extends React.Component {
  static navigationOptions = {
    header: null
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
      <View style={styles.container}>
        <View style={styles.temp}>
          <Text style={human.subheadWhite}>SongPickScreen</Text>
        </View>
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
  },
  temp: {
    backgroundColor: "blue"
  }
});
