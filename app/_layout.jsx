import { Stack, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import GlobalProvider from "../context/GlobalProvider";
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
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
      </Stack>
    </GlobalProvider>
  );
};

export default RootLayout;

/* NOTES: 
    - GlobalProvider wraps our entire app. 
    - The {children} prop is a special react prop you can see in GlobalProvider.js that represents all of the components that are nested here within GlobalProvider so that we dont have to pass them as props manually 
    */
/* NOTES: Stack creates stack-based navigation where screens are placed on top of each other. 
      Stack.Screen defines each screen in the stack. If you want to hide the header for each screen you can do it here
      
      name="index" tells the router to use the index.jsx file as the default screen. We dont need / because its in root directory
    */
