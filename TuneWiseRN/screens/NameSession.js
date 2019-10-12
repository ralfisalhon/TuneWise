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
  Alert,
  TextInput
} from "react-native";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
import { human } from "react-native-typography";

import { LinedText } from "../assets/components/LinedText";
import { Header } from "../assets/components/Header";
import { SafeAreaView } from "react-navigation";
// import { TextInput } from "react-native-gesture-handler";

export class NameSessionScreen extends React.Component {
  static navigationOptions = {
    header: null
    // gesturesEnabled: false
  };

  constructor() {
    super();

    this.state = {
      accessToken: null,
      sessionName: null
    };
  }

  componentDidMount() {
    const { accessToken } = this.props.navigation.state.params;
    this.setState({ accessToken });
  }

  updateSessionName(sessionName) {
    this.setState({ sessionName });
  }

  render() {
    const { accessToken } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <SafeAreaView style={styles.container}>
        <Header
          title={"name ur session"}
          navigate={navigate}
          navigation={this.props.navigation}
          back={true}
        ></Header>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={styles.logo}>
            <Image
              style={{ height: undefined, width: undefined, flex: 1 }}
              resizeMode={"contain"}
              source={require("../assets/images/logo.png")}
            />
          </View>
          <View style={styles.input}>
            <TextInput
              placeholder={"name"}
              value={this.state.sessionName}
              style={{ flex: 1, color: "white", fontFamily: "Courier" }}
              autoCapitalize={"none"}
              autoCompleteType={"off"}
              autoCorrect={false}
              onChangeText={text => this.updateSessionName(text)}
            />
          </View>

          <View>
            <TouchableOpacity
              style={[styles.button, styles.startGame]}
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
    height: windowHeight / 3,
    width: windowWidth - 40,
    borderRadius: 20
  },
  input: {
    marginVertical: 25,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: "white",
    paddingHorizontal: 20,
    height: 50
  },
  button: {
    backgroundColor: "gray",
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 20,
    margin: 10
  },
  startGame: {
    backgroundColor: "white"
  }
});
