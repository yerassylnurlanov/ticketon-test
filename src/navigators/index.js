import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { MainStackNavigator } from "./main-stack";
import { navigationRef } from "./navigation";

export const Navigation = () => (
  <NavigationContainer theme={DefaultTheme} ref={navigationRef}>
    <MainStackNavigator/>
  </NavigationContainer>
)