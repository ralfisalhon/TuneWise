import { createStackNavigator, createAppContainer } from "react-navigation";
var { LandingScreen } = require("./screens/Landing.js");
var { ListenScreen } = require("./screens/Listen.js");
var { NameSessionScreen } = require("./screens/NameSession.js");
var { CodeScreen } = require("./screens/CodeScreen.js");
var { SettingsScreen } = require("./screens/Settings.js");

const MainNavigator = createStackNavigator({
  Landing: { screen: LandingScreen },
  Listen: { screen: ListenScreen },
  NameSession: { screen: NameSessionScreen },
  CodeScreen: { screen: CodeScreen },
  Settings: { screen: SettingsScreen }
});

const App = createAppContainer(MainNavigator);

export default App;
