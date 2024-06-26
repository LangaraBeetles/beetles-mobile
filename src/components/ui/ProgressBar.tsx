import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

const ProgressBar = (props: any) => {
  const { currentValue, goal, content } = props;
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
      <View style={styles.container}>
        <Animated.View style={[styles.bar, { width: width }]} />
      </View>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 10,
    backgroundColor: "#FFF",
    marginVertical: 10,
  },
  bar: {
    height: 10,
    backgroundColor: "#000",
  },
});

export default ProgressBar;
