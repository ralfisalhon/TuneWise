import { createStackNavigator, createAppContainer } from "react-navigation";
var { MainScreen } = require("./screens/MainScreen.js");
var { ListenScreen } = require("./screens/Listen.js");
var { SongPickScreen } = require("./screens/SongPick.js");
var { CodeScreen } = require("./screens/CodeScreen.js");

const MainNavigator = createStackNavigator({
  Home: { screen: MainScreen },
  Listen: { screen: ListenScreen },
  SongPick: { screen: SongPickScreen },
  CodeScreen: { screen: CodeScreen }
});

const App = createAppContainer(MainNavigator);

export default App;
