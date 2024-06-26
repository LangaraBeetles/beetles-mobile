import { StyleSheet, Text, View } from "react-native";
import Button from "./Button";

const MINUTE_IN_SECONDS = 60;
const HOUR_IN_SECONDS = 60 * MINUTE_IN_SECONDS;

const TimerDisplay: React.FC<{ timeInSeconds: number }> = ({
  timeInSeconds,
}) => {
  const hours = Math.floor(timeInSeconds / HOUR_IN_SECONDS);
  const minutes = Math.floor(
    (timeInSeconds % HOUR_IN_SECONDS) / MINUTE_IN_SECONDS,
  );
  const seconds = timeInSeconds % MINUTE_IN_SECONDS;

  return (
    <Text style={styles.text}>
      {hours}:{minutes < 10 ? `0${minutes}` : minutes}:
      {seconds < 10 ? `0${seconds}` : seconds}
    </Text>
  );
};

const Timer: React.FC<{
  timeInSeconds: number;
  handlePause: () => void;
  handleStop: () => void;
  isPaused: boolean;
}> = ({ timeInSeconds, handleStop }) => {
  return (
    <View style={styles.container}>
      <TimerDisplay timeInSeconds={timeInSeconds} />
      <Button title="Stop tracking" onPress={handleStop} variant="primary" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 48,
  },
});

export default Timer;
