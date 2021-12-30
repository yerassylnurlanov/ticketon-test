import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from '../screens/home-screen';
import { HOME_SCREEN } from "./screen-constants";

const HomeStack = createStackNavigator();

const homeStackOptions = {
    headerShown:false,
    cardOverlayEnabled:false,
    animationEnabled:false
}

export const HomeStackNavigator = ()=>(
    <HomeStack.Navigator
        mode="modal"
        screenOptions={homeStackOptions}
        initialRouteName={SCREEN_HOME_MAIN_STACK}
    >
        <HomeStack.Screen
            name={HOME_SCREEN}
            component={HomeScreen}
        />  
    </HomeStack.Navigator>
)