import React from 'react';
import { createAppContainer, createSwitchNavigator  } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import { GlobalProvider } from './src/utils/GlobalState';

const switchNavigator = createSwitchNavigator({
  Home: HomeScreen,
  mainFlow: createStackNavigator(
    {
    Home: HomeScreen,
    }
  ),
});

const App = createAppContainer(switchNavigator);

export default () => {
return <GlobalProvider>
        <App /> 
      </GlobalProvider>
}
