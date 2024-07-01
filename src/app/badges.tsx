import React from "react";
import Stack from "@src/components/ui/Stack";
import { Text } from "@src/components/ui/typography";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { globalStyles } from "@src/styles/globalStyles";
import Icon from "@src/components/ui/Icon";
import Spacer from "@src/components/ui/Spacer";
import { router } from "expo-router";

const back = () => {
  router.back();
};

const Badges = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollViewContent}
    >
      <View style={styles.background} />
      <View style={styles.innerContainer}>
        <Spacer height={64} />
        <Stack flexDirection="row" alignItems="center">
          <Pressable onPress={back} style={styles.icon}>
            <Icon name="arrow-left" />
          </Pressable>
          <Stack flex={1} alignItems="center">
            <Text level="title_2" style={styles.title}>
              Badges
            </Text>
          </Stack>
        </Stack>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyles.colors.primary[200],
    position: "relative",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  innerContainer: {
    padding: 16,
  },
  background: {
    backgroundColor: globalStyles.colors.surface,
    position: "absolute",
    top: 135,
    height: "100%",
    width: "100%",
    borderRadius: 20,
  },

  icon: {
    position: "absolute",
    backgroundColor: globalStyles.colors.neutral[50],
    borderRadius: 100,
    padding: 8,
  },

  title: {
    color: globalStyles.colors.neutral[800],
  },
});
export default Badges;
