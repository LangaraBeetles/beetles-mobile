import {
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SessionStatesType } from "@src/interfaces/session.types";
import Timer from "@src/components/ui/Timer";
import Button from "@src/components/ui/Button";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBackdrop from "@src/components/ui/CustomBackdrop";
import { useRouter } from "expo-router";

const SessionControl = () => {
  const [sessionState, setSessionState] =
    useState<SessionStatesType["SessionStatesEnum"]>("STOP");
  const [timerState, setTimerState] =
    useState<SessionStatesType["TimerStatesEnum"]>("STOPPED");

  const [timeInSeconds, setTimeInSeconds] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);

  const router = useRouter();

  // ref for BottomSheetModal
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    setSessionState("INIT");
    setTimeout(() => {
      bottomSheetModalRef.current?.present();
    }, 100); // Small delay to ensure state update and ref readiness
  }, []);

  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const onStartSession = (timeInHours: number, timeInMinutes: number) => {
    setSessionState("START");
    setTimerState("RUNNING");
    // TODO: stop real time tracking
    setTimeInSeconds(timeInHours * 3600 + timeInMinutes * 60);
    // TODO: function to check posture every second
    // if posture is okay ➝ save it to the local state and show the image animation
    // if posture is bad ➝ save it to the local state and show the image animation
    handleDismissModalPress();
  };

  // const onCancelSession = () => {
  //   setSessionState("CANCEL");
  //   setTimerState("STOPPED");
  //   setTimeInSeconds(-1);
  //   handleDismissModalPress();
  //   // TODO: start real time tracking
  //   // TODO: discard session data
  // };

  const onStopSession = () => {
    setSessionState("PAUSE");
    setTimerState("PAUSED");
    setModalVisible(true);
  };

  const onPauseSession = () => {
    setSessionState((prevState) => (prevState === "START" ? "PAUSE" : "START"));
    setTimerState((prevState) =>
      prevState === "RUNNING" ? "PAUSED" : "RUNNING",
    );
  };

  const handleContinue = () => {
    setModalVisible(false);
    setSessionState("START");
    setTimerState("RUNNING");
  };

  const handleEndSession = () => {
    setModalVisible(false);
    setSessionState("STOP");
    setTimerState("STOPPED");
    // TODO: save session data
    // TODO: Show session summary
    router.push("/session-summary");
    // Reset the timer
    setTimeInSeconds(-1);
    // TODO: start real time tracking
  };

  const SetTimer = ({
    onStartSession,
  }: {
    onStartSession: (timeInHours: number, timeInMinutes: number) => void;
  }) => {
    const [timeInHours, setTimeInHours] = useState(0);
    const [timeInMinutes, setTimeInMinutes] = useState(0);

    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={CustomBackdrop}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          {/* TODO: create number input component */}
          <View style={styles.bottomSheetContainer}>
            <Text>Hours:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setTimeInHours(Number(text))}
              value={timeInHours.toString()}
              placeholder="Hours"
              keyboardType="numeric"
            />
            <Text>Minutes:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setTimeInMinutes(Number(text))}
              value={timeInMinutes.toString()}
              placeholder="Minutes"
              keyboardType="numeric"
            />
            <Button
              title="Start Session"
              onPress={() => onStartSession(timeInHours, timeInMinutes)}
              variant="primary"
            />
          </View>
        </TouchableWithoutFeedback>
      </BottomSheetModal>
    );
  };

  useEffect(() => {
    if (sessionState === "START" && timeInSeconds === -1) {
      onStopSession();
    } else if (sessionState === "START" && timeInSeconds > 0) {
      const timer = setInterval(() => {
        setTimeInSeconds((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeInSeconds, sessionState]);

  return (
    <View>
      {timerState === "STOPPED" && (
        <Button
          title="Start a session"
          onPress={handlePresentModalPress}
          variant="secondary"
          trailingIcon="play"
        />
      )}

      {sessionState === "INIT" && <SetTimer onStartSession={onStartSession} />}

      {(sessionState === "START" || sessionState === "PAUSE") && (
        <Timer
          timeInSeconds={timeInSeconds}
          handlePause={onPauseSession}
          handleStop={onStopSession}
          isPaused={timerState === "PAUSED"}
        />
      )}

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text>Are you sure you want to end the session?</Text>
            <Button
              title="Keep Going"
              onPress={handleContinue}
              variant="primary"
            />
            <Button
              title="End Session"
              onPress={handleEndSession}
              variant="primary"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    padding: 20,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  bottomSheetContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});

export default SessionControl;
