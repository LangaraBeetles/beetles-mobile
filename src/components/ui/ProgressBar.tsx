import { globalStyles } from "@src/styles/globalStyles";
import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

const ProgressBar = (props: any) => {
  const {
    currentValue,
    goal,
    content,
    backgroundColor,
    barColor,
    height,
    borderWidth,
    borderColor,
  } = props;
  const progress = (currentValue / goal) * 100;
  const animation = new Animated.Value(progress);
  const counter = useRef(new Animated.Value(0)).current;

  const width = counter.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  useEffect(() => {
    Animated.timing(counter, {
      toValue: animation,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, [currentValue]);

  return (
    <View>
      <View
        style={[
          styles.container,
          {
            backgroundColor: backgroundColor || "#FFF",
            height: height || 10,
            borderRadius: (height || 10) / 2,
            borderWidth: borderWidth || 0,
            borderColor: borderColor || globalStyles.colors.neutral[100],
          },
        ]}
      />

      <Animated.View
        style={[
          styles.bar,
          {
            width: width,
            backgroundColor: barColor || "#000",
            height: height || 10,
            borderRadius: (height || 10) / 2,
          },
        ]}
      />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    position: "relative",
  },
  bar: {
    marginVertical: 10,
    position: "absolute",
  },
});

export default ProgressBar;
