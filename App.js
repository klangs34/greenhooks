import React from 'react';
import { createAppContainer, createSwitchNavigator  } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import { GlobalProvider } from './src/utils/GlobalState';
import MemberScreen from './src/screens/MemberScreen';

const switchNavigator = createSwitchNavigator({
  Home: HomeScreen,
  mainFlow: createStackNavigator(
    {
    Home: HomeScreen,
    Member: MemberScreen
    }
  ),
});

const App = createAppContainer(switchNavigator);

export default () => {
return <GlobalProvider>
        <App /> 
      </GlobalProvider>
}
