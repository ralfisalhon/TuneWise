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
  SafeAreaView
} from "react-native";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
import { human } from "react-native-typography";

const isSmallDevice = windowWidth < 350 ? true : false;
const isTallDevice = windowHeight < 700 ? false : true;
const scrollDistance = 440;

import { Profile } from "../assets/components/Profile";
import { Button } from "../assets/components/Button";
import { Footnote } from "../assets/components/Footnote";

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
      <View style={styles.darkContainer}>
        <SafeAreaView>
          <View style={styles.innerContainer}>
            <Profile
              discoveries={0}
              username={"Ralfi"}
              avatar={"https://puu.sh/DRCx0/bacdc113bc.jpg"}
            />
          </View>
          <View style={styles.lightContainer} />
        </SafeAreaView>
        <View style={[styles.lightContainer, styles.menuOptions]}>
          <View>
            <Button
              backgroundColor={"#108ced"}
              text={"Quick Start"}
              fontSize={isTallDevice ? 24 : 22}
            />
            <Footnote text={"Currently: Recent favorite artists & tracks"} />
            {/* Make a playlist based on: */}
            <Button backgroundColor={"#ff5722"} text={"Select an Occasion"} fontSize={22} />
            <Button backgroundColor={"#3f51b5"} text={"Pick Favorites"} fontSize={22} />
            <Button backgroundColor={"#009688"} text={"Automatic Options"} fontSize={22} />
            <Button backgroundColor={"#9e9e9e"} text={"Settings & Contact"} fontSize={22} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  innerContainer: {
    height: 100,
    backgroundColor: "#202020"
  },
  lightContainer: {
    flex: 1,
    backgroundColor: "#2c2c2c",
    alignItems: "flex-start"
  },
  darkContainer: {
    flex: 1,
    backgroundColor: "#202020"
  },
  menuOptions: {
    alignItems: "center"
  }
});
