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
  FlatList
} from "react-native";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
import BottomDrawer from "rn-bottom-drawer";
import { SafeAreaView } from "react-navigation";

import { Header } from "../assets/components/Header";
import { Song } from "../assets/components/Song";

const HEADER_HEIGHT = 100;

export class PlayScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();

    this.state = {
      refresh: false,
      songs: [
        {
          title: "obscure song 0",
          artist: "ashton & the ophids",
          imageURI: "https://puu.sh/ErI6Z/c5d481e732.png"
        },
        {
          title: "obscure song 1",
          artist: "ashton & the ophids",
          imageURI: "https://puu.sh/ErIey/7a23d6457a.png"
        },
        {
          title: "obscure song 2",
          artist: "ashton & the ophids",
          imageURI: "https://puu.sh/ErI6Z/c5d481e732.png"
        },
        {
          title: "obscure song 3",
          artist: "ashton & the ophids",
          imageURI: "https://puu.sh/ErIey/7a23d6457a.png"
        },
        {
          title: "obscure song 4",
          artist: "ashton & the ophids",
          imageURI: "https://puu.sh/ErI6Z/c5d481e732.png"
        },
        {
          title: "obscure song 5",
          artist: "ashton & the ophids",
          imageURI: "https://puu.sh/ErIey/7a23d6457a.png"
        }
      ]
    };
  }

  addSong() {
    this.setState({ refresh: !this.state.refresh });
  }

  componentDidMount() {}

  renderPlaylist = ({ item, index }) => {
    return <Song title={item.title} artist={item.artist} imageURI={item.imageURI} />;
  };

  renderDrawer = () => {
    return (
      <View style={styles.contentContainer}>
        <View style={{ position: "absolute", top: -54, right: 5, zIndex: 2 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => this.addSong()}>
            <Image
              style={{ height: 96, width: 96, marginHorizontal: 8, marginTop: 12 }}
              resizeMode={"stretch"}
              source={require("../assets/images/addSong.png")}
            />
          </TouchableOpacity>
        </View>
        <Image
          style={{ height: 10, width: 42, marginHorizontal: 8, marginTop: 12 }}
          resizeMode={"stretch"}
          source={require("../assets/images/lineGray.png")}
        />
        <FlatList
          extraData={this.state.refresh}
          ref={ref => {
            this.flatListRef3 = ref;
          }}
          showsVerticalScrollIndicator={false}
          data={this.state.songs}
          renderItem={this.renderPlaylist}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  render() {
    const { navigate } = this.props.navigation;
    const { accessToken, sessionName } = this.props.navigation.state.params;

    return (
      <SafeAreaView style={styles.container}>
        <Header
          title={sessionName}
          navigate={navigate}
          navigation={this.props.navigation}
          back={true}
        ></Header>
        <View style={{ flex: 1, backgroundColor: "red" }}></View>
        <BottomDrawer
          startUp={false}
          containerHeight={windowHeight * 0.7}
          downDisplay={windowHeight * 0.7 - 128}
        >
          {this.renderDrawer()}
        </BottomDrawer>
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
  contentContainer: {
    flex: 1,
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row"
  },
  text: {
    paddingHorizontal: 5
  }
});
