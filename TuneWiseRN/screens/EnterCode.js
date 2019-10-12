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

export class EnterCodeScreen extends React.Component {
  static navigationOptions = {
    header: null
    // gesturesEnabled: false
  };

  constructor() {
    super();

    this.state = {
      accessToken: null,
      sessionCode: null
    };
  }

  componentDidMount() {
    // const { accessToken } = this.props.navigation.state.params;
    // this.setState({ accessToken });
  }

  updateSessionCode(sessionCode) {
    this.setState({ sessionCode });
  }

  toggleMultiPhone(multiPhone) {
    this.setState({ multiPhone });
  }

  checkInput(navigate, accessToken) {
    const { sessionCode } = this.state;

    if (sessionCode.length != 4) {
      Alert.alert("oops I need 4 numbers");
      return;
    }

    Alert.alert("let's check! you entered", this.state.sessionCode);
  }

  render() {
    const { accessToken } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <SafeAreaView style={styles.container}>
        <Header
          title={"enter ur code"}
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
                  keyboardType={"numeric"}
                  placeholder={"session code"}
                  value={this.state.sessionCode}
                  style={{
                    flex: 1,
                    color: "white",
                    fontFamily: "Courier",
                    fontSize: 24
                  }}
                  autoCapitalize={"none"}
                  autoCompleteType={"off"}
                  autoCorrect={false}
                  maxLength={4}
                  placeholderTextColor={"#bdc3c7"}
                  onChangeText={text => this.updateSessionCode(text)}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <View style={{ height: windowHeight * 0.28 }}>
          <TouchableOpacity
            style={[styles.button, styles.startGame]}
            onPress={() => this.checkInput(navigate, accessToken)}
          >
            <Text style={styles.text}>join in.</Text>
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
    marginTop: 25
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
