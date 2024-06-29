import React, { useEffect } from "react";

import { Image, Platform, Pressable, ScrollView, View } from "react-native";
import { Link, Redirect } from "expo-router";
import DeviceMotionViewiOS, {
  DeviceMotionViewAndroid,
} from "@src/components/ui/DeviceMotionView";

import { useUser } from "@state/useUser";

import SessionControl from "@src/components/sessions/SessionControl";
import Stack from "@src/components/ui/Stack";
import { SafeAreaView } from "react-native-safe-area-context";
import Center from "@src/components/ui/Center";
import Icon from "@src/components/ui/Icon";
import TrackingModeIcon from "@src/components/homepage/TrackingModeIcon";
import { Text } from "@src/components/ui/typography";

import LottieView from "lottie-react-native";
import { useRef } from "react";

const background = {
  not_reading: "white",
  good: "white",
  mid: "yellow",
  bad: "crimson",
};

const HomePage = () => {
  const isSetupComplete = useUser((state) => state.isSetupComplete);
  const userName = useUser((state) => state.user.name);
  const userLevel = useUser((state) => state.user.level);
  const userHP = useUser((state) => state.user.hp);
  const userXP = useUser((state) => state.user.xp);
  const userStreak = useUser((state) => state.user.dailyStreakCounter);
  const currentPosture = useUser((state) => state.currentPosture);
  const animation = useRef<any>(null);

  useEffect(() => {
    if (animation.current) {
      animation.current?.play?.(0, 0);

      if (currentPosture === "mid") {
        animation.current?.play?.(6, 6);
      }

      if (currentPosture === "bad") {
        animation.current?.play?.(15, 50);
      }
    }
  }, [currentPosture]);

  if (!isSetupComplete) {
    return <Redirect href="/setup/start" />;
  }

  return (
    <SafeAreaView
      style={{ backgroundColor: background[currentPosture], height: "100%" }}
    >
      <ScrollView>
        <Stack flexDirection="row" justifyContent="space-between" p={15} pb={0}>
          <Stack
            flexDirection="row"
            gap={18}
            border={1}
            borderRadius={50}
            p={10}
            alignItems="center"
          >
            {/*TODO: display avatar */}
            <Image source={require("../../../assets/img/avatar.png")} />
            {userName === null ? <Text>{userName}</Text> : null}
            <Text>Lv.{userLevel}</Text>
          </Stack>
          <Stack flexDirection="row" gap={18} border={0} p={5}>
            <TrackingModeIcon />

            <Center>
              <Link href="/notifications" asChild>
                <Pressable>
                  <Icon name={"notification-outline"} />
                </Pressable>
              </Link>
            </Center>
          </Stack>
        </Stack>

        <Center p={15} pb={0}>
          <Stack
            flexDirection="row"
            border={1}
            borderRadius={20}
            gap={10}
            w={"100%"}
            px={20}
            py={25}
            justifyContent="space-between"
          >
            <Stack
              flexDirection="row"
              gap={2}
              borderRight={1}
              borderColor={"#E7E5E4"}
              pr={20}
            >
              <Center pr={10}>
                <Icon name="star" />
              </Center>

              <Stack
                flexDirection="column"
                justifyContent="space-evenly"
                gap={7}
              >
                <Text level="caption_1">Posture Score</Text>
                <Stack flexDirection="row">
                  <Text level="title_2">{userHP} </Text>
                  <Stack pt={9}>
                    <Text level="caption_1">/ 100</Text>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <Stack
              flexDirection="column"
              border={0}
              justifyContent="space-evenly"
            >
              <Stack
                flexDirection="row"
                gap={10}
                border={0}
                justifyContent="start"
              >
                <Icon name="lightening" />
                <Stack flexDirection="row">
                  <Text level="footnote" weight="bold">
                    {userXP}{" "}
                  </Text>
                  <Text level="footnote">XP</Text>
                </Stack>
              </Stack>
              <Stack
                flexDirection="row"
                gap={10}
                border={0}
                justifyContent="start"
              >
                <Icon name="streak" />
                <Stack flexDirection="row">
                  <Text level="footnote" weight="bold">
                    {userStreak}{" "}
                  </Text>
                  <Text level="footnote">Day Streak</Text>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Center>
        <Center p={15}>
          {Platform.OS === "ios" && <DeviceMotionViewiOS />}
          {Platform.OS === "android" && <DeviceMotionViewAndroid />}
        </Center>
        <View style={{ width: "100%", height: 350 }}>
          <Center>
            {Platform.OS === "ios" ? (
              <LottieView
                autoPlay={false}
                ref={animation}
                progress={1}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                source={require("../../animations/alien.json")}
              />
            ) : (
              <Image source={require("../../../assets/img/mascot.png")} />
            )}
          </Center>
        </View>
        <Center>
          <SessionControl />
        </Center>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
