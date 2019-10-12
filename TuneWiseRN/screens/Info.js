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
  SafeAreaView,
  Alert
} from "react-native";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
import { human } from "react-native-typography";
import { Header } from "../assets/components/Header";

export class InfoScreen extends React.Component {
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
              title={"TuneWise"}
              navigate={navigate}
              navigation={this.props.navigation}
              back={true}
              hideSettings={true}
            ></Header>
    
            <ScrollView style={styles.container}>
              <View style={styles.menu}>
                  <Text style={[styles.text, {fontSize:24}]}>
                    {"\n"}
                    About
                    {"\n"}
                  </Text>
                  <Text style={styles.pText}>
                      TuneWise tests the collective music 
                      knowledge of you and your friends. Queue up songs 
                      to play. Get points for guessing the song correctly 
                      and choose the next one
                      
                  </Text>
                  <Text style={[styles.text, {fontSize:24}]}>
                    {"\n"}
                    How to Play
                    {"\n"}
                  </Text>
                  <Text style={styles.pText}>
                      One person should create a game by logging 
                      into their spotify premium account and creating
                      a session. 
                      Creating a session generates a 4-digit room
                      code. 
                      Other players can join the game by entering that code.
                      {"\n"}
                      {"\n"}
                      Once all players are in the game players can add songs
                      to their lists. 
                      If a user guesses a song correctly, the 
                      song at the top of their list is played for others to guess.

                      
                  </Text>
                  <Text style={styles.text}>
                    {"\n"}{"\n"}
                    credits:
                    {"\n"}
                  </Text>
                  <Text style={styles.text}>
                    ralfi salhon -- front end{"\n"}
                    mohsin rizvi -- back end{"\n"}
                    nihal pai -- ui/ux {"\n"}
                    san akdag -- pm{"\n"}
                  </Text>

                </View>
               
              </ScrollView>
          </SafeAreaView>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#010d58",
        //justifyContent: "center",
        //alignItems: "center"
      },

      menu: {
        width: windowWidth-30,
        flex: 1,
        flexDirection: "column",
        margin: 15,
        backgroundColor: "#010d58",
        alignItems: "center"
      },
      test: {
        justifyContent: "center",
        margin: 10,
        paddingVertical: 5
      },
      menuItem: {
        width: windowWidth - 30,
        height: 50,
        borderWidth: 1,
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
      text: {
        color: "white",
        fontSize: 20,
        fontFamily: "Courier New"
      },
      pText:{
          color:"white",
          fontSize:18,
          fontFamily:"Courier New",
          paddingHorizontal: 20,
          flexDirection:"column",
          alignItems: "center",
          justifyContent:"center",
          textAlign:"center"

      }
    });