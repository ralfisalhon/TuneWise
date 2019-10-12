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
  SafeAreaView,
  Switch
} from "react-native";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
import { human } from "react-native-typography";

import { Header } from "../assets/components/Header";

export class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      value: false
    };
  }
  buttonFunc(value) {
    this.setState({ value });
  }

  componentDidMount() {}

  render() {
    const { navigate } = this.props.navigation;

    return (
      <SafeAreaView style={styles.container}>
        <Header
          title={"settings"}
          navigate={navigate}
          navigation={this.props.navigation}
          back={true}
          hideSettings={true}
        ></Header>

        <View style={styles.container}>
          <View style={styles.menu}>
            <View style={styles.menuItem}>
              <Text style={styles.buttonText}> 30-Second Mode</Text>
              <Switch
                ios_backgroundColor={"gray"}
                style={styles.test}
                onValueChange={value => this.buttonFunc(value)}
                value={this.state.value}
              />
            </View>

            <TouchableOpacity style={styles.butt} onPress={() => Alert.alert("log out of spotify")}>
              <Text style={styles.buttonText}>Logout of Spotify</Text>
            </TouchableOpacity>

            <View style={styles.credits}>
              <Text style={styles.creditText}>
                {"\n"}
                Credits:
                {"\n"}
              </Text>
              <Text style={styles.text}>
                Ralfi Salhon -- Front End{"\n"}
                Mohsin Rizvi -- Back End{"\n"}
                Nihal Pai -- UI/UX {"\n"}
                San Akdag -- PM{"\n"}
              </Text>
            </View>
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
    justifyContent: "center",
    alignItems: "center"
  },
  credits: {
    alignItems: "center"
  },
  menu: {
    width: windowWidth,
    flex: 1,
    flexDirection: "column",
    margin: 15,
    backgroundColor: "#010d58"
  },
  test: {
    justifyContent: "center",
    margin: 10,
    paddingVertical: 5
  },
  butt: {
    color: "white",
    borderRadius: 10,
    margin: 15,
    borderWidth: 2,
    paddingLeft: 10,
    borderColor: "white",
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  menuItem: {
    width: windowWidth - 30,
    height: 50,
    borderWidth: 2,
    paddingLeft: 10,
    borderColor: "white",
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "center",
    margin: 15
  },
  header: {
    width: windowWidth,
    height: 50,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    color: "white"
  },
  creditText: {
    color: "white",
    fontSize: 20
  },
  buttonText: {
    fontSize: 20,
    color: "white"
  },
  text: {
    color: "white",
    fontSize: 20
  }
});
