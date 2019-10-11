import { createStackNavigator, createAppContainer } from "react-navigation";
var { LoginScreen } = require("./screens/LoginScreen.js");
var { HomeScreen } = require("./screens/HomeScreen.js");

const MainNavigator = createStackNavigator({
  Home: { screen: LoginScreen },
  Profile: { screen: HomeScreen }
});

const App = createAppContainer(MainNavigator);

export default App;
