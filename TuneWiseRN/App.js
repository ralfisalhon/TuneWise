import { createStackNavigator, createAppContainer } from "react-navigation";
var { LandingScreen } = require("./screens/Landing.js");
var { NameSessionScreen } = require("./screens/NameSession.js");
var { SettingsScreen } = require("./screens/Settings.js");
var { PlayScreen } = require("./screens/Play.js");

const MainNavigator = createStackNavigator({
  Landing: { screen: LandingScreen },
  NameSession: { screen: NameSessionScreen },
  Settings: { screen: SettingsScreen },
  Play: { screen: PlayScreen }
});

const App = createAppContainer(MainNavigator);

export default App;
