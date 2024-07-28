import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import React from "react";

/* NOTES: like in nextjs, creating a folder with parentheses its considered a route-group, where you can add special pages with a specific layout  */

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false, //headershown is a react-navigation object that contains the title of the screen, back buttons and other nav control
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      {/* NOTES: using StatusBar from expo-status-bar not react-native */}
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLayout;
