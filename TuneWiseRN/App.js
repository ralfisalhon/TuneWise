import { createStackNavigator, createAppContainer } from "react-navigation";
var { MainScreen } = require("./screens/MainScreen.js");
var { ListenScreen } = require("./screens/Listen.js");

const MainNavigator = createStackNavigator({
  Home: { screen: MainScreen },
  Listen: { screen: ListenScreen }
});

const App = createAppContainer(MainNavigator);

export default App;
