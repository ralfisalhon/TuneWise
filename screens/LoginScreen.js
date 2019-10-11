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

const isSmallDevice = windowWidth < 350 ? true : false;
const isTallDevice = windowHeight < 700 ? false : true;
const scrollDistance = 440;

import { Welcome } from "../assets/components/Welcome";
import { SpotifyButton } from "../assets/components/SpotifyButton";
import { HowButton } from "../assets/components/HowButton";
import { How } from "../assets/components/How";

export class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();

    this.state = {
      canScroll: false
    };
  }

  componentDidMount() {
    let that = this;
    if (Platform.OS !== "ios") {
      setTimeout(() => that.refs._scrollView.scrollTo({ y: scrollDistance, animated: false }), 10);
    }
  }

  scrollUp() {
    this.refs._scrollView.scrollTo({
      y: 0,
      animated: true
    });
    this.setState({ canScroll: true });
  }
  scrollDown() {
    this.refs._scrollView.scrollTo({
      y: scrollDistance,
      animated: true
    });
    this.setState({ canScroll: false });
  }

  isAtBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height;
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref="_scrollView"
          bounces={true}
          scrollEnabled={this.state.canScroll}
          contentOffset={{ y: scrollDistance }}
          snapToInterval={scrollDistance}
          snapToAlignment={"start"}
          decelerationRate={"fast"}
          onScroll={({ nativeEvent }) => {
            if (this.isAtBottom(nativeEvent)) {
              this.setState({ canScroll: false });
            }
          }}
        >
          <How scrollDistance={scrollDistance} onPressGotIt={() => this.scrollDown()} />

          <View style={styles.contentContainer}>
            <ImageBackground
              imageStyle={styles.imageStyle}
              style={styles.imageContainer}
              source={require("../assets/images/HeadphonesGuy.png")}
              resizeMode="cover"
            >
              <View style={styles.inImageContent}>
                <Welcome />
                <View style={{ height: 15 }} />
                <SpotifyButton onPress={() => navigate("Profile")} />
                <View style={{ height: 5 }} />
                <HowButton onPress={() => this.scrollUp()} />
              </View>
            </ImageBackground>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2c2c2c",
    justifyContent: "center"
  },
  howContainer: {
    width: windowWidth,
    height: windowHeight,
    alignContent: "center",
    overflow: "hidden"
  },
  contentContainer: {
    height: windowHeight,
    width: windowWidth,
    padding: 25,
    paddingTop: 50
  },
  imageStyle: {
    opacity: 0.4,
    resizeMode: "contain"
  },
  imageContainer: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  inImageContent: {
    flex: 1,
    padding: 25,
    paddingBottom: 20
  }
});
