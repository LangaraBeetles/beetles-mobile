import HeadTrackingProvider from "@src/components/providers/HeadTrackingProvider.ios";
import TrackingModeProvider from "@src/components/providers/TrackingModeProvider";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import PushNotificationsProvider from "@src/components/providers/PushNotificationsProvider";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import HPSystem from "@src/components/scoring/HPSystem";
import XPSystem from "@src/components/scoring/XPSystem";
import LevelSystem from "@src/components/scoring/LevelSystem";
import PostureDataProvider from "@src/components/providers/PostureDataProvider";

const queryClient = new QueryClient();

const RootLayout = () => {
  const [fontsLoaded, fontError] = useFonts({
    NunitoBlack: require("../../assets/fonts/NunitoBlack.ttf"),
    NunitoExtraBold: require("../../assets/fonts/NunitoExtraBold.ttf"),
    NunitoBold: require("../../assets/fonts/NunitoBold.ttf"),
    NunitoSemiBold: require("../../assets/fonts/NunitoSemiBold.ttf"),
    NunitoMedium: require("../../assets/fonts/NunitoMedium.ttf"),
    NunitoRegular: require("../../assets/fonts/NunitoRegular.ttf"),
    NunitoLight: require("../../assets/fonts/NunitoLight.ttf"),
    NunitoExtraLight: require("../../assets/fonts/NunitoExtraLight.ttf"),
    NunitoBlackItalic: require("../../assets/fonts/NunitoBlackItalic.ttf"),
    NunitoExtraBoldItalic: require("../../assets/fonts/NunitoExtraBoldItalic.ttf"),
    NunitoBoldItalic: require("../../assets/fonts/NunitoBoldItalic.ttf"),
    NunitoSemiBoldItalic: require("../../assets/fonts/NunitoSemiBoldItalic.ttf"),
    NunitoMediumItalic: require("../../assets/fonts/NunitoMediumItalic.ttf"),
    NunitoItalic: require("../../assets/fonts/NunitoItalic.ttf"),
    NunitoLightItalic: require("../../assets/fonts/NunitoLightItalic.ttf"),
    NunitoExtraLightItalic: require("../../assets/fonts/NunitoExtraLightItalic.ttf"),
  });

  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PushNotificationsProvider>
        <TrackingModeProvider>
          <HeadTrackingProvider>
            <HPSystem />
            <XPSystem />
            <LevelSystem />
            <GestureHandlerRootView>
              <BottomSheetModalProvider>
                <PostureDataProvider>
                  <Stack>
                    <Stack.Screen
                      name="(tabs)"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="setup"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="challengeDetailsScreen"
                      options={{
                        headerShown: true,
                        title: "Challenge progress",
                        headerBackTitle: "Back",
                      }}
                    />
                    <Stack.Screen
                      name="pastChallengesScreen"
                      options={{
                        headerShown: true,
                        title: "Past Challenges",
                        headerBackTitle: "Back",
                      }}
                    />

                    <Stack.Screen
                      name="auth"
                      options={{ headerShown: false }}
                    />

                    <Stack.Screen
                      name="session-summary"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="notifications"
                      options={{ headerShown: false }}
                    />

                    <Stack.Screen
                      name="badges"
                      options={{ headerShown: false }}
                    />
                  </Stack>
                </PostureDataProvider>
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </HeadTrackingProvider>
        </TrackingModeProvider>
      </PushNotificationsProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
