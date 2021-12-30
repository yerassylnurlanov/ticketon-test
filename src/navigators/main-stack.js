import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/home-screen/home-container";
import { SCREEN_HOME_MAIN_STACK,HOME_SCREEN } from "./screen-constants";
import { NavigationContainer } from "@react-navigation/native";

const MainStack = createStackNavigator();

const mainStackOptions = {
    headerShown:false,
    cardOverlayEnabled:false,
    animationEnabled:false
}

export const MainStackNavigator = ()=>(
    <NavigationContainer independent={true}>
        <MainStack.Navigator
            screenOptions={mainStackOptions}
            initialRouteName={SCREEN_HOME_MAIN_STACK}
        >
            <MainStack.Screen
                name={SCREEN_HOME_MAIN_STACK}
                component={HomeStackNavigator}
            />

        </MainStack.Navigator>
    </NavigationContainer>
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