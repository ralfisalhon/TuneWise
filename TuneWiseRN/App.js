import { createStackNavigator, createAppContainer } from "react-navigation";
var { LandingScreen } = require("./screens/Landing.js");
var { NameSessionScreen } = require("./screens/NameSession.js");
var { SettingsScreen } = require("./screens/Settings.js");
var { PlayScreen } = require("./screens/Play.js");
var { InfoScreen } =require("./screens/Info.js");

global.globalAdding = false;

const MainNavigator = createStackNavigator({
  Landing: { screen: LandingScreen },
  NameSession: { screen: NameSessionScreen },
  Settings: { screen: SettingsScreen },
  Play: { screen: PlayScreen },
  Info: {screen: InfoScreen}
});

const App = createAppContainer(MainNavigator);

export default App;
