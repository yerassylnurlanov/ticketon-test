import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen  from "../screens/home-screen";
import { SCREEN_HOME_MAIN_STACK,HOME_SCREEN } from "./screen-constants";

const MainStack = createStackNavigator();

const mainStackOptions = {
    headerShown:false,
    cardOverlayEnabled:false,
    animationEnabled:false
}

export const MainStackNavigator = () => (
    <MainStack.Navigator
        screenOptions={mainStackOptions}
        initialRouteName={SCREEN_HOME_MAIN_STACK}
    >
        <MainStack.Screen
            name={SCREEN_HOME_MAIN_STACK}
            component={HomeStackNavigator}
        />
    </MainStack.Navigator>
    
)

const HomeStack = createStackNavigator();

const homeStackOptions = {
    headerShown:false,
    cardOverlayEnabled:false,
    animationEnabled:false
}

const HomeStackNavigator = ()=>(
    <HomeStack.Navigator
        screenOptions={homeStackOptions}
        initialRouteName={HOME_SCREEN}
    >
        <HomeStack.Screen
            name={HOME_SCREEN}
            component={HomeScreen}
        />  
    </HomeStack.Navigator>
)