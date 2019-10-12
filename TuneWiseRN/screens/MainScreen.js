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

export class MainScreen extends React.Component {
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
          <Text style={styles.text}>O</Text>
          <Text style={styles.text}>O</Text>
        </View>
        <View style={styles.logo}>
          <Image
            style={{ height: undefined, width: undefined, flex: 1 }}
            resizeMode={"contain"}
            source={require("../assets/images/512.png")}
          />
        </View>
        {/* <View style={styles.card}></View> */}
        <TouchableOpacity onPress={() => navigate("Listen")}>
          <Text style={styles.text}>TuneWise</Text>
        </TouchableOpacity>
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
  logo: {
    height: windowHeight / 3,
    width: windowHeight / 3,
    borderRadius: 20
  },
  title: {
    color: "white",
    fontFamily: "Avenir Next",
    fontSize: 24,
    fontWeight: "600"
  },
  text: {
    color: "white",
    fontFamily: "Avenir Next",
    fontSize: 18
  },
  card: {
    height: 400,
    marginTop: 15,
    width: windowWidth * 0.9,
    backgroundColor: "white",
    borderRadius: 20,
    opacity: 0.5
  },
  header: {
    width: windowWidth,
    height: 50,
    backgroundColor: "red",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    padding: 10
  }
});
