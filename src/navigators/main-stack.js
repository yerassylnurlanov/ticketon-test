import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SCREEN_HOME_MAIN_STACK } from "./screen-constants";
import { HomeStackNavigator } from "./home-stack";

const MainStack = createStackNavigator();

const mainStackOptions = {
    headerShown:false,
    cardOverlayEnabled:false,
    animationEnabled:false
}

export const MainStackNavigator = ()=>(
    <MainStack.Navigator
        mode="modal"
        screenOptions={mainStackOptions}
        initialRouteName={SCREEN_HOME_MAIN_STACK}
    >
        <MainStack.Screen
            name={SCREEN_HOME_MAIN_STACK}
            component={HomeStackNavigator}
        />

    </MainStack.Navigator>
)