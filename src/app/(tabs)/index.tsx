import React, { useEffect } from "react";

import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Link, Redirect } from "expo-router";
import DeviceMotionViewiOS, {
  DeviceMotionViewAndroid,
} from "@src/components/ui/DeviceMotionView";

import { useUser } from "@state/useUser";

import SessionControl from "@src/components/sessions/SessionControl";
import Stack from "@src/components/ui/Stack";
import { SafeAreaView } from "react-native-safe-area-context";
import Center from "@src/components/ui/Center";
import TrackingModeIcon from "@src/components/homepage/TrackingModeIcon";

import LottieView from "lottie-react-native";
import { useRef } from "react";
import Icon from "@src/components/ui/Icon";

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
            {userName != null ? <Text>{userName.split(" ")[0]}</Text> : null}
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
            justifyContent="space-evenly"
            w={"100%"}
            p={18}
          >
            <Stack flexDirection="row" border={0} justifyContent="space-evenly">
              <Center p={5}>
                <Icon name={"colorLabelIcon-star"} />
              </Center>

              <Stack
                flexDirection="column"
                border={0}
                justifyContent="space-evenly"
              >
                <Text>Posture Score</Text>
                <Text>{userHP} / 100</Text>
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
                <Icon name={"colorLabelIcon-lightening"} />
                <Text>{userXP} XP</Text>
              </Stack>
              <Stack
                flexDirection="row"
                gap={10}
                border={0}
                justifyContent="start"
              >
                <Icon name={"colorLabelIcon-streak"} />
                <Text>{userStreak} Day Streak</Text>
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
