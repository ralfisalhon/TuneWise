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
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Switch
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
      sessionName: null,
      multiPhone: false
    };
  }

  componentDidMount() {
    const { accessToken } = this.props.navigation.state.params;
    this.setState({ accessToken });
  }

  updateSessionName(sessionName) {
    this.setState({ sessionName });
  }

  toggleMultiPhone(multiPhone) {
    this.setState({ multiPhone });
  }

  checkInput(navigate, accessToken) {
    const { sessionName } = this.state;
    if (sessionName) {
      navigate("Play", { accessToken, sessionName });
    } else {
      Alert.alert("pls name ur session");
    }
  }

  render() {
    const { accessToken, sessionName } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <SafeAreaView style={styles.container}>
        <Header
          title={"name ur session"}
          navigate={navigate}
          navigation={this.props.navigation}
          back={true}
        />
        <KeyboardAvoidingView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          behavior="padding"
          enabled
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View style={styles.logo}>
                <Image
                  style={{ height: undefined, width: undefined, flex: 1 }}
                  resizeMode={"contain"}
                  source={require("../assets/images/logo.png")}
                />
              </View>
              <View style={styles.input}>
                <TextInput
                  placeholder={"session name"}
                  value={this.state.sessionName}
                  style={{
                    flex: 1,
                    color: "white",
                    fontFamily: "Courier",
                    fontSize: 24
                  }}
                  autoCapitalize={"none"}
                  autoCompleteType={"off"}
                  autoCorrect={false}
                  maxLength={20}
                  placeholderTextColor={"#bdc3c7"}
                  onChangeText={text => this.updateSessionName(text)}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <View style={{ height: windowHeight * 0.32 }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Switch
              ios_backgroundColor={"#ce47a5"}
              trackColor={"black"}
              thumbColor={"white"}
              style={styles.switch}
              onValueChange={value => this.toggleMultiPhone(value)}
              value={this.state.multiPhone}
            />
            <Text style={[styles.text, { color: "white", fontSize: 18, marginTop: 8 }]}>
              multi-phone session
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.button, styles.startGame]}
            onPress={() => this.checkInput(navigate, accessToken)}
          >
            <Text style={styles.text}>start game.</Text>
          </TouchableOpacity>
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
    height: windowHeight / 3.4,
    width: windowWidth - 40,
    borderRadius: 20
  },
  input: {
    marginTop: 40,
    marginBottom: 25,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: "white",
    paddingHorizontal: 20,
    height: 60,
    width: windowWidth * 0.8
  },
  button: {
    backgroundColor: "gray",
    paddingHorizontal: 25,
    paddingVertical: 18,
    borderRadius: 20
  },
  startGame: {
    backgroundColor: "white",
    marginTop: 20
  },
  text: {
    color: "#010d58",
    fontFamily: "Courier",
    fontSize: 22
  }
  // switch: {
  //   height: 40
  // }
});
