import { StyleSheet, Text, View } from "react-native";
import { Slot, Stack, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";

//prevent splashscreen from autohiding
SplashScreen.preventAutoHideAsync();

//rnfes for boilerplate:
const RootLayout = () => {
  //with the useFonts hook you need to require the actual file the font is stored in
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  /* NOTES: useEffect allows us to perform actions (side-effects) while the screen is loading  */
  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  //ensures the app does not render any UI until the fonts are ready
  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    /* Stack creates stack-based navigation where screens are placed on top of each other. 
    Stack.Screen defines each screen in the stack.
    
    name="index" tells the router to use the index.jsx file as the default screen. We dont need / because its in root directory
    */
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
